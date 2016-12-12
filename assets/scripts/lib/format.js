export function nl2br(str) {
  return str.replace(/(?:\r\n|\r|\n)/gm, '<br />');
};
