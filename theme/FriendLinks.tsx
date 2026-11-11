import { createElement } from 'react';
import { friendLinks } from '../scripts/friend-links';

/** 取站点索引字母：优先取名称首字母，中文名回退到域名首字母 */
function letterOf(link: (typeof friendLinks)[number]) {
  const m = link.name.match(/[a-z]/i);
  if (m) return m[0].toUpperCase();
  const host = new URL(link.url).hostname.replace(/^www\./, '');
  return host.charAt(0).toUpperCase();
}

function FriendLinkCard(link: (typeof friendLinks)[number]) {
  const domain = new URL(link.url).hostname.replace(/^www\./, '');
  return createElement(
    'a',
    {
      key: link.url,
      className: 'friend-links__card',
      href: link.url,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    createElement(
      'span',
      { className: 'friend-links__logo' },
      link.logo
        ? createElement('img', { src: link.logo, alt: `${link.name} logo`, loading: 'lazy' })
        : createElement(
            'span',
            { className: 'friend-links__logo-fallback' },
            link.name.charAt(0).toUpperCase(),
          ),
    ),
    createElement(
      'span',
      { className: 'friend-links__body' },
      createElement('span', { className: 'friend-links__name' }, link.name),
      createElement('span', { className: 'friend-links__desc' }, link.description),
      createElement('span', { className: 'friend-links__domain' }, domain),
    ),
  );
}

interface FriendLinksProps {
  /** 只渲染指定字母分组的站点 */
  letter: string;
}

export default function FriendLinks({ letter }: FriendLinksProps) {
  const target = letter.toUpperCase();
  const links = friendLinks
    .filter((link) => letterOf(link) === target)
    .sort((a, b) => a.name.localeCompare(b.name));

  return createElement(
    'div',
    { className: 'friend-links' },
    links.map((link) => FriendLinkCard(link)),
  );
}
