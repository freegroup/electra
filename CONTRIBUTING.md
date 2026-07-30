# Contributing to Electra.Academy

Contributions are welcome - bug reports, fixes, translations, teaching
material, documentation.

## Pull requests require a signed CLA

Pull requests from outside contributors are welcome, but they need a signed
**[Contributor License Agreement](./CLA.md)** before they can be merged.

Signing takes one comment. When you open a pull request, a bot posts the
instructions; you reply with the sentence quoted in [`CLA.md`](./CLA.md). Your
signature is recorded in `signatures/version1/cla.json` in this repository - no
external service is involved - and it covers all your future contributions.

### Why

Two reasons, and it is worth being straight about both:

1. **The license may change.** Without a CLA, changing the project's license
   later would require the agreement of every single contributor. One person who
   has moved on, changed their email or simply says no would block it forever.
   The CLA settles that consent up front.
2. **Dual licensing pays for the free version.** Electra.Academy is AGPL for
   everyone plus a commercial license for parties who cannot accept copyleft
   (see [`COMMERCIAL-LICENSE.md`](./COMMERCIAL-LICENSE.md)). That second license
   only works while the rights to the whole work rest with one party.

### What it does not do

You stay the author of your contribution. You keep a non-exclusive right to use
your own code anywhere else, your moral rights are untouched, and your
contribution stays available to everyone under the AGPL - that part cannot be
revoked. The details are in [`CLA.md`](./CLA.md) §4.

If you would rather not sign, that is fine: **issues, bug reports and
reproduction cases need no CLA** and are genuinely useful on their own.

## Sign-off (separate from the CLA)

Please also sign off your commits:

```
git commit -s -m "your message"
```

This appends a `Signed-off-by:` line, certifying under the
[Developer Certificate of Origin](https://developercertificate.org/) that you
wrote the code or have the right to submit it.

Note that the DCO and the CLA are **not** the same thing and neither replaces
the other. The DCO certifies where the code came from; the CLA grants the rights
needed to relicense it. We use both.

## Third-party code

Do not add third-party code to the tree without recording it in
[`THIRD-PARTY-NOTICES.md`](./THIRD-PARTY-NOTICES.md) with its version,
license and copyright holder. Prefer an npm dependency over a vendored copy.

Note that **NonCommercial licenses (CC BY-NC and similar) cannot be accepted**.
They are not open source under the OSI definition, are incompatible with the
AGPL, and would disqualify the project from public-sector software
directories - the very channels through which schools find it.

## Practical notes

- Keep the style of the surrounding code; the project does not use a formatter.
- Frontend changes need a rebuild of the affected app: `npm run build` in
  `author`, `designer`, `gallery`, `home`, `legal` or `simulator`. The generated
  bundles under `public/js/webpack/` are gitignored, so do not commit them.
  (`home/public/js/webpack/bundle.js` is tracked for historical reasons, from
  before the ignore rule existed. Do not take it as the pattern.)
- User-facing text belongs in `common/public/i18n/<app>/{de,en}.json`, never
  hardcoded in a template.
