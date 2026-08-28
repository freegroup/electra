#!/usr/bin/env node
//
// Backfill: move embedded preview images out of `data` and into `blobs`.
//
// Documents written before the preview moved to blobs carry the image as a
// base64 data URL in `data.image`. That inflates the bytes by about a third and
// puts them in the jsonb column that every read of the document touches — see
// Shapes-Rework.md §2.3.
//
// For every version that has `data.image`, this writes the decoded bytes as a
// blob under the key `preview` and removes `image` from `data`. Idempotent: a
// version that already has the blob is skipped, so it can be re-run after a
// partial pass.
//
// Usage:
//   node bin/backfill-previews.js            # report only, changes nothing
//   node bin/backfill-previews.js --apply    # actually write
//
// Run it while the services are up; it only touches versions that still carry
// an embedded image, and /thumb keeps falling back to `data.image` for anything
// not converted yet.

const { pool } = require("../server/persistence/pool")

const APPLY = process.argv.includes("--apply")
const PREVIEW_KEY = "preview"

// Parse a "data:image/png;base64,...." data URL into { contentType, buffer }.
// Same shape as the page servers use; kept local so this script has no
// dependency on them.
function decodeDataUrl(dataUrl) {
  if (typeof dataUrl !== "string") return null
  const m = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(dataUrl)
  if (!m) return null
  const contentType = m[1] || "application/octet-stream"
  const buffer = m[2]
    ? Buffer.from(m[3], "base64")
    : Buffer.from(decodeURIComponent(m[3]), "utf8")
  if (!buffer.length) return null
  return { contentType, buffer }
}

async function main() {
  const { rows } = await pool.query(
    `SELECT v.scope_id, v.doc_path, v.version, v.data->>'image' AS image
       FROM versions v
      WHERE v.data ? 'image'
      ORDER BY v.scope_id, v.doc_path, v.version`
  )

  console.log(`${rows.length} Versionen mit eingebettetem Bild`)
  if (!rows.length) return

  let converted = 0
  let skipped = 0
  let unreadable = 0
  let bytes = 0

  for (const row of rows) {
    const decoded = decodeDataUrl(row.image)
    if (!decoded) {
      // Not a usable data URL — leave the row alone and report it, rather than
      // dropping something we cannot reconstruct.
      unreadable++
      console.log(`  ? ${row.doc_path} v${row.version}: kein lesbares Data-URL`)
      continue
    }

    const has = await pool.query(
      `SELECT 1 FROM blobs
        WHERE scope_id = $1 AND doc_path = $2 AND version = $3 AND key = $4`,
      [row.scope_id, row.doc_path, row.version, PREVIEW_KEY]
    )
    if (has.rowCount > 0) {
      // Already has a blob; only the embedded copy is left over.
      skipped++
    }

    bytes += decoded.buffer.length
    converted++

    if (!APPLY) continue

    const client = await pool.connect()
    try {
      await client.query("BEGIN")
      if (has.rowCount === 0) {
        await client.query(
          `INSERT INTO blobs (scope_id, doc_path, version, key, content_type, size_bytes, data)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            row.scope_id,
            row.doc_path,
            row.version,
            PREVIEW_KEY,
            decoded.contentType,
            decoded.buffer.length,
            decoded.buffer,
          ]
        )
      }
      // Drop the embedded copy. The version row itself is not rewritten - only
      // one key is removed from its jsonb, so no new version is created and no
      // history is disturbed.
      await client.query(
        `UPDATE versions SET data = data - 'image'
          WHERE scope_id = $1 AND doc_path = $2 AND version = $3`,
        [row.scope_id, row.doc_path, row.version]
      )
      await client.query("COMMIT")
    } catch (err) {
      await client.query("ROLLBACK")
      throw err
    } finally {
      client.release()
    }
  }

  const mb = (bytes / 1024 / 1024).toFixed(1)
  console.log(
    `${converted} umgezogen (davon ${skipped} mit bereits vorhandenem Blob), ` +
    `${unreadable} unlesbar, ${mb} MB Bilddaten`
  )
  if (!APPLY) console.log("Nur ein Bericht - mit --apply wird geschrieben.")
}

main()
  .then(() => pool.end())
  .catch((err) => {
    console.error(err)
    pool.end()
    process.exit(1)
  })
