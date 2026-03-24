import { visit } from 'unist-util-visit';

export default function mdiIconPlugin() {
  return (tree: unknown) => {
    visit(tree, 'inlineCode', (node: { type: string; value: string }) => {
      const mdiMatch = node.value.match(/^\[mdi:([a-z0-9-]+)\]$/i);
      if (!mdiMatch) {
        return;
      }

      const iconName = mdiMatch[1];
      node.type = 'html';
      node.value = `<iconify-icon inline icon="mdi:${iconName}" title="${iconName.replace(/-/g, ' ')}"></iconify-icon>`;
    });
  };
}
