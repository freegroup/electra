var MARKER_OPEN = '[';
var MARKER_CLOSE = ']';
var ESCAPE_CHARACTER = '\\';
var TAG = 'span';

/*
 * Add delimiters for double occurrences of MARKER_SYMBOL.
 */
function tokenize(state, silent) {
    if (silent) {
        return false;
    }
    var start = state.pos;
    var max = state.posMax;
    var momChar = state.src.charAt(start);
    var nextChar = state.src.charAt(start + 1);

    // We are looking for two times the open symbol.
    if (momChar !== MARKER_OPEN || nextChar !== MARKER_OPEN) {
        return false;
    }

    // Find the end sequence
    var openTagCount = 1;
    var end = -1;
    var skipNext = false;
    for (var i = start + 1; i < max && end === -1; i++) {
        momChar = nextChar;
        nextChar = state.src.charAt(i + 1);
        if (skipNext) {
            skipNext = false;
            continue;
        }
        if (momChar === MARKER_CLOSE && nextChar === MARKER_CLOSE) {
            openTagCount -= 1;
            if (openTagCount == 0) {
                // Found the end!
                end = i;
            }
            // Skip second marker char, it is already counted.
            skipNext = true;
        }
        else if (momChar === MARKER_OPEN && nextChar === MARKER_OPEN) {
            openTagCount += 1;
            // Skip second marker char, it is already counted.
            skipNext = true;
        }
        else if (momChar === '\n') {
            // Found end of line before the end sequence. Thus, ignore our start sequence!
            return false;
        }
        else if (momChar === ESCAPE_CHARACTER) {
            skipNext = true;
        }
    }
    // Input ended before closing sequence.
    if (end === -1) {
        return false;
    }
    // start tag
    let startTag = state.push('kbd_open', TAG, 1);
    startTag.attrSet('class', 'cloze')
    // parse inner
    state.pos += 2;
    state.posMax = end;

    state.md.inline.tokenize(state);
    // delete the content of the last token. It is the content (solution) of the cloze
    //
    state.tokens.at(-1).content = "\u00A0".repeat(state.tokens.at(-1).content?.lenght ?? 10)
    state.pos = end + 2;
    state.posMax = max;
    // end tag
    state.push('kbd_close', TAG, -1);
    return true;
}
function kbdplugin(markdownit) {
    markdownit.inline.ruler.before('link', 'kbd', tokenize);
}
module.exports = kbdplugin;
