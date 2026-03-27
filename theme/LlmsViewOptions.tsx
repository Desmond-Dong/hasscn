import {
  LlmsViewOptions as OriginalLlmsViewOptions,
  type LlmsViewOptionsProps,
} from '@rspress/core/theme-original';
import { createElement } from 'react';

const defaultOptions: NonNullable<LlmsViewOptionsProps['options']> = [
  'markdownLink',
  'chatgpt',
  'claude',
  {
    title: 'DeepSeek',
    href: 'https://chat.deepseek.com/',
    icon: createElement('span', null, 'D'),
  },
  {
    title: 'Kimi',
    href: 'https://kimi.moonshot.cn/',
    icon: createElement('span', null, 'K'),
  },
  {
    title: '豆包',
    href: 'https://www.doubao.com/chat/',
    icon: createElement('span', null, '豆'),
  },
  {
    title: '通义千问',
    href: 'https://tongyi.aliyun.com/qianwen/',
    icon: createElement('span', null, '通'),
  },
  {
    title: '文心一言',
    href: 'https://yiyan.baidu.com/',
    icon: createElement('span', null, '文'),
  },
  {
    title: '腾讯元宝',
    href: 'https://yuanbao.tencent.com/',
    icon: createElement('span', null, '元'),
  },
  {
    title: '讯飞星火',
    href: 'https://xinghuo.xfyun.cn/',
    icon: createElement('span', null, '星'),
  },
  {
    title: '智谱清言',
    href: 'https://chatglm.cn/',
    icon: createElement('span', null, '智'),
  },
];

function LlmsViewOptions(props: LlmsViewOptionsProps) {
  return createElement(OriginalLlmsViewOptions, {
    ...props,
    options: props.options ?? defaultOptions,
  });
}

export { LlmsViewOptions };
