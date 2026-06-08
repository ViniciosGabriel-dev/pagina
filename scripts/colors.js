/**
 * ANSI Color codes for terminal output
 */

module.exports = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  strikethrough: '\x1b[9m',

  // Foreground colors
  black: (text) => `\x1b[30m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  magenta: (text) => `\x1b[35m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  white: (text) => `\x1b[37m${text}\x1b[0m`,

  // Bold colors
  boldRed: (text) => `\x1b[1;31m${text}\x1b[0m`,
  boldGreen: (text) => `\x1b[1;32m${text}\x1b[0m`,
  boldYellow: (text) => `\x1b[1;33m${text}\x1b[0m`,
  boldBlue: (text) => `\x1b[1;34m${text}\x1b[0m`,
  boldMagenta: (text) => `\x1b[1;35m${text}\x1b[0m`,
  boldCyan: (text) => `\x1b[1;36m${text}\x1b[0m`,
  boldWhite: (text) => `\x1b[1;37m${text}\x1b[0m`,

  // Other
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
  dim: (text) => `\x1b[2m${text}\x1b[0m`,
};
