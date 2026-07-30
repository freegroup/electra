// thumbUrl — builds a thumbnail URL from app config + document UUID.
// Used wherever a document thumbnail must be constructed client-side (e.g.
// the Review pane, which receives uuid directly from the review queue).
// Draft/Files panes get thumbnailUrl pre-built from the server (toItem()).

export function thumbUrl(conf, uuid) {
  const base = conf && conf.database && conf.database.base
  if (!base || !uuid) return ""
  return `${base}/thumb?uuid=${encodeURIComponent(uuid)}`
}

export default thumbUrl
