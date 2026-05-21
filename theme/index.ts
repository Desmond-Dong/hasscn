import { useLang, useLocation, useSite } from '@rspress/core/runtime';
import {
  HomeLayout as OriginalHomeLayout,
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

function HomeLayout() {
  return createElement(OriginalHomeLayout, {
    afterFeatures: createElement(
      'section',
      { className: 'home-sponsors' },
      createElement(
        'div',
        { className: 'home-sponsors__inner' },
        createElement('p', { className: 'home-sponsors__eyebrow' }, 'Sponsor'),
        createElement('h2', { className: 'home-sponsors__title' }, '赞助商信息'),
        createElement(
          'p',
          { className: 'home-sponsors__intro' },
          '感谢以下赞助商的支持。',
        ),
        createElement(
          'a',
          {
            className: 'home-sponsors__card',
            href: 'https://www.coolkit.cn/',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          createElement('span', { className: 'home-sponsors__badge' }, '服务器赞助'),
          createElement('h3', { className: 'home-sponsors__name' }, '深圳酷宅科技有限公司'),
          createElement(
            'p',
            { className: 'home-sponsors__desc' },
            '为 Home Assistant OS 极速版 与 OTA 服务 提供服务器长期支持。',
          ),
          createElement('span', { className: 'home-sponsors__link' }, '访问官网'),
        ),
      ),
    ),
  });
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

export { HomeLayout, Layout, Search };
