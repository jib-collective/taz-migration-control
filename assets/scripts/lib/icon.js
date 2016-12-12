export function icon(name, classNames = '') {
  return `
    <svg class="icon ${classNames}">
      <use xlink:href="/dist/images/symbols.svg#${name}">
    </svg>
  `
};

export function toggle($element, iconName) {
  let $use = $element;

  if ($element.is('svg')) {
    $use = $element.children('use');
  }

  if (!$use.is('use')) {
    return;
  }

  const oldPath = $use.attr('xlink:href');
  const oldBasePath = oldPath.split('#');

  $use.attr('xlink:href', `${oldBasePath[0]}#${iconName}`);
  return $use;
};
