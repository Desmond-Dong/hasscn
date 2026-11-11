import { createElement } from 'react';
import { friendLinks } from '../scripts/friend-links';

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

export default function FriendLinks() {
  return createElement(
    'div',
    { className: 'friend-links' },
    friendLinks.map((link) => FriendLinkCard(link)),
  );
}
