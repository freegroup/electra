// Simple die-on-missing-env helper — same pattern as brains/gamification.
module.exports = function die(msg) {
  console.error(msg)
  process.exit(1)
}
