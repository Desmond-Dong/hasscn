import { useLocation, useSite } from '@rspress/core/runtime';
import {
  type LayoutProps,
  Layout as OriginalLayout,
} from '@rspress/core/theme-original';
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

export { Layout };
