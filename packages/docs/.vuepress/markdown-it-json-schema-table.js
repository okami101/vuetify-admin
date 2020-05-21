module.exports = (md) => {
  md.block.ruler.before('paragraph', 'schema', (state, startLine, endLine, silent) => {
    var marker, cnt, ch, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

      marker = state.src.charCodeAt(pos++);

      // Check hr marker
      if (marker !== 0x2A/* * */ &&
          marker !== 0x2D/* - */ &&
          marker !== 0x5F/* _ */ &&
          marker !== 0x21/* ! */) {
        return false;
      }

      // markers can be mixed with spaces, but there should be at least 3 of them

      cnt = 1;
      while (pos < max) {
        ch = state.src.charCodeAt(pos++);
        if (ch !== marker) { return false; }
        if (ch === marker) { cnt++; }
      }

      if (cnt < 3) { return false; }

      if (silent) { return true; }

      state.line = startLine + 1;

      token        = state.push('hr', 'hr', 0);
      token.map    = [ startLine, state.line ];
      token.markup = Array(cnt + 1).join(String.fromCharCode(marker));

      return true;
  }, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
};
