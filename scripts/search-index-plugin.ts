import type { PageIndexInfo, RspressPlugin } from '@rspress/core';

const excludedPrefixes = [
  '/home-assistant/blog/',
  '/home-assistant/changelogs/',
  '/developers/blog/',
  '/guide/',
];

const excludedRoutes = new Set([
  '/403',
  '/404',
  '/deprecated',
  '/no-baidu',
]);

function shouldKeepPage(page: PageIndexInfo) {
  const routePath = page.routePath.endsWith('/')
    ? page.routePath.slice(0, -1)
    : page.routePath;

  if (excludedRoutes.has(routePath)) {
    return false;
  }

  return !excludedPrefixes.some((prefix) => page.routePath.startsWith(prefix));
}

export function searchIndexPlugin(): RspressPlugin {
  return {
    name: 'search-index-plugin',
    modifySearchIndexData: (pages) => {
      const keptPages = pages.filter(shouldKeepPage);

      pages.splice(0, pages.length, ...keptPages);
    },
  };
}
