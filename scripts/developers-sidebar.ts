import fs from 'node:fs';
import path from 'node:path';
import type { SidebarGroup } from '@rspress/core';

type SidebarItem = NonNullable<SidebarGroup['items']>[number];

type MetaItem =
  | string
  | {
      type?: 'file' | 'dir' | 'divider' | 'section-header' | 'label';
      name?: string;
      label?: string;
      collapsible?: boolean;
      collapsed?: boolean;
    };

const docsRoot = path.join(__dirname, '..', 'docs', 'developers');
const routePrefix = '/developers';

function readJson(filePath: string): MetaItem[] | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as MetaItem[];
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

function routeForItem(dirPath: string, name: string): string {
  const dirRelative = path
    .relative(docsRoot, dirPath)
    .split(path.sep)
    .join('/');
  return `${routePrefix}${dirRelative ? `/${dirRelative}` : ''}/${name}`;
}

function buildItems(metaPath: string): SidebarItem[] {
  const dirPath = path.dirname(metaPath);
  const meta = readJson(metaPath) || [];

  return meta
    .map((item) => {
      if (typeof item === 'string') {
        const filePath = resolveFilePath(dirPath, item);
        return {
          text: titleFromFile(filePath || '') || item,
          link: routeForItem(dirPath, item),
        };
      }

      if (item.type === 'divider') {
        return { dividerType: 'dashed' } as SidebarItem;
      }

      if (item.type === 'section-header' && item.label) {
        return { sectionHeaderText: item.label } as SidebarItem;
      }

      if (item.type === 'dir' && item.name) {
        const subMetaPath = path.join(dirPath, item.name, '_meta.json');
        const subItems = buildItems(subMetaPath);
        if (subItems.length === 0) {
          // 目录无 _meta.json 时按文件系统自动展开
          const subDir = path.join(dirPath, item.name);
          const autoItems: SidebarItem[] = [];
          for (const entry of fs.readdirSync(subDir, { withFileTypes: true })) {
            if (entry.isDirectory()) {
              const nested = buildItems(path.join(subDir, entry.name, '_meta.json'));
              if (nested.length > 0) {
                autoItems.push({
                  text: entry.name,
                  collapsible: true,
                  collapsed: true,
                  items: nested,
                });
              }
              continue;
            }
            if (!/\.(md|mdx)$/.test(entry.name)) {
              continue;
            }
            const name = entry.name.replace(/\.(md|mdx)$/, '');
            if (name === 'index') {
              continue;
            }
            autoItems.push({
              text:
                titleFromFile(path.join(subDir, entry.name)) || name,
              link: routeForItem(subDir, name),
            });
          }
          if (autoItems.length === 0) {
            return null;
          }
          return {
            text: item.label || item.name,
            collapsible: item.collapsible !== false,
            collapsed: item.collapsed ?? true,
            items: autoItems,
          };
        }
        return {
          text: item.label || item.name,
          collapsible: item.collapsible !== false,
          collapsed: item.collapsed ?? true,
          items: subItems,
        };
      }

      if (item.type === 'file' && item.name) {
        const filePath = resolveFilePath(dirPath, item.name);
        return {
          text: item.label || titleFromFile(filePath || '') || item.name,
          link: routeForItem(dirPath, item.name),
        };
      }

      return null;
    })
    .filter(Boolean) as SidebarItem[];
}

export const developersSidebar: SidebarGroup[] = fs.existsSync(
  path.join(docsRoot, '_meta.json'),
)
  ? [
      {
        text: '开发者文档',
        items: buildItems(path.join(docsRoot, '_meta.json')),
      },
    ]
  : [];
