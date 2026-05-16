import { useLang, useLocation, useSite } from '@rspress/core/runtime';
import {
  type LayoutProps,
  Layout as OriginalLayout,
} from '@rspress/core/theme-original';
import {
  Search as PluginAlgoliaSearch,
  ZH_LOCALES,
} from '@rspress/plugin-algolia/runtime';
import { createElement } from 'react';
import {
  developersNav,
  globalNav,
  homeAssistantNav,
} from '../scripts/nav-config';

// 导出所有核心主题组件
export * from '@rspress/core/theme-original';
export { LlmsViewOptions } from './LlmsViewOptions';

function resolveNavByPathname(pathname: string) {
  if (pathname.startsWith('/home-assistant')) {
    return homeAssistantNav;
  }

  if (pathname.startsWith('/developers')) {
    return developersNav;
  }

  return globalNav;
}

function Layout(props: LayoutProps) {
  const { pathname } = useLocation();
  const { site } = useSite();

  site.themeConfig = {
    ...site.themeConfig,
    nav: resolveNavByPathname(pathname),
  };

  return createElement(OriginalLayout, props);
}

function Search() {
  const lang = useLang();

  return createElement(PluginAlgoliaSearch, {
    docSearchProps: {
      appId: '3QBOJD1WV0',
      apiKey: 'a63be28a9d0f1a58da227f2d97a08073',
      indexName: 'hasscn.top',
      searchParameters: {
        facetFilters: [`lang:${lang}`],
      },
    },
    locales: ZH_LOCALES,
  });
}

export { Layout, Search };
