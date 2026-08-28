// Puppeteer configuration for the sheets service.
//
// Puppeteer 19 caches its downloaded Chromium under $HOME/.cache/puppeteer by
// default. That couples the browser location to whichever user's $HOME ran the
// install — a classic "works for me / not on the server" trap when npm install
// (as user `electra`) and the running process use different homes.
//
// Pin the cache to a fixed directory INSIDE this service so the browser always
// lives at the same path for every user/process. `npx puppeteer browsers
// install chrome` (run in this dir, e.g. from the Ansible deploy) fills it.
const { join } = require("path")

module.exports = {
  cacheDirectory: join(__dirname, ".puppeteer-cache"),
}
