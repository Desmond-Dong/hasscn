import * as fs from 'node:fs';
import * as path from 'node:path';
import type { RspressPlugin } from '@rspress/core';

const DEFAULT_EXCLUDED_PREFIXES = [
  '/music-assistant/',
  '/developers/',
  '/companion/',
];

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

function normalizePrefix(prefix: string): string {
  if (!prefix.startsWith('/')) {
    return `/${prefix.replace(/^\/+/, '')}`;
  }
  return prefix;
}

function getRouteValue(value: unknown): string | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const record = value as Record<string, unknown>;
  const routeCandidate =
    record.path ?? record.routePath ?? record.link ?? record.url ?? null;

  return typeof routeCandidate === 'string' ? routeCandidate : null;
}

function shouldExcludeRoute(route: string, excludedPrefixes: string[]): boolean {
  return excludedPrefixes.some((prefix) => route.startsWith(prefix));
}

function filterJsonTree(
  value: JsonValue,
  excludedPrefixes: string[],
): { value: JsonValue; removed: number } {
  if (Array.isArray(value)) {
    let removed = 0;
    const nextItems: JsonValue[] = [];

    for (const item of value) {
      const route = getRouteValue(item);
      if (route && shouldExcludeRoute(route, excludedPrefixes)) {
        removed += 1;
        continue;
      }

      const filtered = filterJsonTree(item, excludedPrefixes);
      removed += filtered.removed;
      nextItems.push(filtered.value);
    }

    return { value: nextItems, removed };
  }

  if (value && typeof value === 'object') {
    let removed = 0;
    const nextObject: Record<string, JsonValue> = {};

    for (const [key, child] of Object.entries(value)) {
      const filtered = filterJsonTree(child as JsonValue, excludedPrefixes);
      removed += filtered.removed;
      nextObject[key] = filtered.value;
    }

    return { value: nextObject, removed };
  }

  return { value, removed: 0 };
}

export function searchIndexFilterPlugin(
  excludedPrefixes = DEFAULT_EXCLUDED_PREFIXES,
): RspressPlugin {
  const normalizedPrefixes = excludedPrefixes.map(normalizePrefix);

  return {
    name: 'search-index-filter-plugin',
    afterBuild: async (config) => {
      const outDir = config.outDir || path.join(process.cwd(), 'doc_build');
      const staticDir = path.join(outDir, 'static');

      if (!fs.existsSync(staticDir)) {
        console.log(
          `- Skip search index filtering, static directory not found: ${staticDir}`,
        );
        return;
      }

      const searchIndexFiles = fs
        .readdirSync(staticDir)
        .filter((file) => /^search_index\..*\.json$/.test(file));

      if (searchIndexFiles.length === 0) {
        console.log('- Skip search index filtering, no search index files found');
        return;
      }

      for (const fileName of searchIndexFiles) {
        const filePath = path.join(staticDir, fileName);

        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const parsed = JSON.parse(content) as JsonValue;
          const filtered = filterJsonTree(parsed, normalizedPrefixes);

          fs.writeFileSync(
            filePath,
            `${JSON.stringify(filtered.value)}\n`,
            'utf-8',
          );

          console.log(
            `✓ Filtered search index: ${fileName} (removed ${filtered.removed} entries)`,
          );
        } catch (error) {
          console.error(`- Failed to filter search index: ${fileName}`, error);
          throw error;
        }
      }
    },
  };
}
