import fs from 'node:fs';
import path from 'node:path';
import type { SidebarGroup } from '@rspress/core';

type SidebarItem = NonNullable<SidebarGroup['items']>[number];

type MetaItem =
  | string
  | {
      type?: 'file' | 'dir' | 'custom-link';
      name?: string;
      label?: string;
      link?: string;
      collapsible?: boolean;
      collapsed?: boolean;
    };

const docsRoot = path.join(__dirname, '..', 'docs', 'home-assistant');
const routePrefix = '/home-assistant';

function readJson(filePath: string): MetaItem[] | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as MetaItem[];
}

function pathToRoute(filePath: string): string {
  const normalized = filePath.split(path.sep).join('/');
  if (normalized === '/' || normalized === '') {
    return `${routePrefix}/index`;
  }
  return `${routePrefix}${normalized.endsWith('/') ? `${normalized.slice(0, -1)}/index` : normalized}`;
}

function routeToRelative(route: string): string {
  return route.replace(routePrefix, '') || '/';
}

function titleFromFile(filePath: string): string | null {
  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const titleMatch = frontmatterMatch[1].match(
      /(?:^|\n)title:\s*["']?(.+?)["']?(?:\n|$)/,
    );
    if (titleMatch) {
      return titleMatch[1].trim();
    }
  }

  const h1Match = content.match(/^#\s+(.+)$/m);
  return h1Match ? h1Match[1].trim() : null;
}

function resolveFilePath(dirPath: string, name: string): string | null {
  const mdPath = path.join(dirPath, `${name}.md`);
  const mdxPath = path.join(dirPath, `${name}.mdx`);
  if (fs.existsSync(mdPath)) {
    return mdPath;
  }
  if (fs.existsSync(mdxPath)) {
    return mdxPath;
  }
  return null;
}

function createItemFromLink(label: string | undefined, link: string) {
  const route = pathToRoute(link);
  const normalizedLink = link.endsWith('/') ? `${link}index` : link;
  const relativeRoute = routeToRelative(route);
  const relativePath = normalizedLink.replace(/^\//, '');
  const dirPath = path.join(docsRoot, path.dirname(relativePath));
  const fileName = path.basename(relativePath);
  const filePath = resolveFilePath(dirPath, fileName);

  return {
    text: label || titleFromFile(filePath || '') || fileName,
    link: route,
  };
}

function buildItems(metaPath: string): SidebarItem[] {
  const dirPath = path.dirname(metaPath);
  const meta = readJson(metaPath) || [];

  return meta
    .map((item) => {
      if (typeof item === 'string') {
        const filePath = resolveFilePath(dirPath, item);
        const dirRelative = path
          .relative(docsRoot, dirPath)
          .split(path.sep)
          .join('/');
        const route = `${routePrefix}${dirRelative ? `/${dirRelative}` : ''}/${item}`;
        return {
          text: titleFromFile(filePath || '') || item,
          link: route,
        };
      }

      if (item.type === 'dir' && item.name) {
        const subMetaPath = path.join(dirPath, item.name, '_meta.json');
        return {
          text: item.label || item.name,
          collapsible: item.collapsible !== false,
          collapsed: item.collapsed ?? true,
          items: buildItems(subMetaPath),
        };
      }

      if (item.type === 'file' && item.name) {
        const filePath = resolveFilePath(dirPath, item.name);
        const dirRelative = path
          .relative(docsRoot, dirPath)
          .split(path.sep)
          .join('/');
        const route = `${routePrefix}${dirRelative ? `/${dirRelative}` : ''}/${item.name}`;
        return {
          text: item.label || titleFromFile(filePath || '') || item.name,
          link: route,
        };
      }

      if (item.link) {
        return createItemFromLink(item.label, item.link);
      }

      return null;
    })
    .filter(Boolean) as SidebarItem[];
}

function collectSidebarMappings(
  dirPath: string,
  routePath = routePrefix,
): Record<string, SidebarGroup[]> {
  const sidebar: Record<string, SidebarGroup[]> = {};
  const metaPath = path.join(dirPath, '_meta.json');

  if (fs.existsSync(metaPath)) {
    const indexTitle = titleFromFile(resolveFilePath(dirPath, 'index') || '');
    const groupTitle =
      routePath === routePrefix
        ? 'Home Assistant'
        : indexTitle || path.basename(dirPath);
    sidebar[`${routePath}/`] = [
      {
        text: groupTitle,
        items: buildItems(metaPath),
      },
    ];
  }

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const subDir = path.join(dirPath, entry.name);
    const subRoute = `${routePath}/${entry.name}`;
    Object.assign(sidebar, collectSidebarMappings(subDir, subRoute));
  }

  return sidebar;
}

export const homeAssistantSidebar = fs.existsSync(docsRoot)
  ? collectSidebarMappings(docsRoot)
  : {};
