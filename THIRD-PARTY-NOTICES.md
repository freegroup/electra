# Third-Party Notices

Electra.Academy as a whole is licensed under AGPL-3.0-or-later (see
[`LICENSE`](./LICENSE)). This file lists the third-party components that are
**checked into this repository** and remain under their own licenses. Their
terms are unaffected by the licensing of this project.

Dependencies installed via npm are not listed here; their licenses ship with
the packages in `node_modules/` and are declared in the respective
`package-lock.json`.

## License compatibility

All components below are under permissive licenses (MIT, BSD, Apache-2.0) or
are dual-licensed including a permissive option. Each of these is one-way
compatible with AGPL-3.0: the combined work may be distributed under the AGPL,
while the individual components keep their original terms. No component
imposes a restriction that conflicts with the AGPL.

## Components

| Component | Version | License | Copyright | Location |
|---|---|---|---|---|
| jQuery | 1.12.4 | MIT | jQuery Foundation and contributors | `common/public/js/jquery/jquery.js` |
| jQuery UI | 1.8.23 | MIT or GPL (dual) | jQuery Foundation and contributors (see AUTHORS.txt) | `common/public/js/jquery/jquery-ui.js` |
| Bootstrap | 3.3.7 | MIT | 2011-2016 Twitter, Inc. | `common/public/js/bootstrap/` |
| bootstrap-multiselect | - | Apache-2.0 | 2012-2015 David Stutz | `common/public/js/bootstrap-multiselect/` |
| bootstrap-slider | 2.0.0 | Apache-2.0 | 2012 Stefan Petre | `common/public/js/bootstrap-slider/` |
| Bootstrap TouchSpin | 4.2.5 | Apache-2.0 | István Ujj-Mészáros | `common/public/js/bootstrap-touchspin/` |
| KaTeX (CSS + fonts) | - | MIT | KaTeX contributors | `common/public/css/katex.min.css`, `common/public/css/katex/` |
| markdown-it-asciimath | 1.0.0 | MIT | 2016 quertt | `common/public/js/markdown-it-asciimath.js` (modified, see file header) |
| Lucide (icon paths) | - | ISC | 2022 Lucide Contributors | `common/public/js/icons.js`, `common/public/js/workspace/scopeTile.js` (SVG path data only) |
| Notify.js | - | MIT | 2015 the Notify.js authors | `common/public/js/notify/` |
| Socket.IO client | - | MIT | Automattic and contributors | served at runtime via `/socket.io/socket.io.js` |

## Own components

The following are **not** third-party and are covered by this project's AGPL
license:

- `common/public/js/draw2d.js` - draw2d, authored by Andreas Herz. This file is
  a webpack bundle and embeds its own third-party dependencies (JavaScript
  Debug by Ben Alman, jQuery contextMenu by Rodney Rehm and others). Those
  bundled notices are preserved verbatim in the accompanying
  `common/public/js/draw2d.js.LICENSE.txt`.
- `common/public/js/toast.js` - project code.

## Corrections

If a component is listed incorrectly, is missing, or an attribution is wrong,
please open an issue. Attribution errors are treated as bugs.
