const colors = [
  0xfcba03,
  0xfc7703,
  0xfc2803,
  0x9000de,
  0x00aede,
  0x00ded3,
  0x00de64,
  0x00de0f,
  0xde0073,
  0xde00da,
  0x7b70e0,
  0xab0041,
  0xe07800,
  0xc42f21,
  0xcc5e97,
  0x0af2cb,
  0xdd91e6,
  0xe892df,
  0xff00e6,
  0xeeff00,
];

/**
 * @function
 * it just for fun
 * select and return a random color
 */
export const pickRandomColor = () =>
  colors[Math.round(Math.random() * (colors.length - 1))];
