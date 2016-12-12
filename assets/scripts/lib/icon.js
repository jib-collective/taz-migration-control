export function icon(name, classNames = '') {
  return `
    <svg class="icon ${classNames}">
      <use xlink:href="/dist/images/symbols.svg#${name}">
    </svg>
  `
};

