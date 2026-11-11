export interface FriendLink {
  name: string;
  description: string;
  /** 站点 LOGO 路径（相对 public 目录）；缺省时渲染名称首字符头像 */
  logo?: string;
  url: string;
}

export const friendLinks: FriendLink[] = [
  {
    name: 'Open Home Foundation',
    description: '守护智能家居的隐私、选择与可持续，支持 Home Assistant 等开源项目。',
    logo: '/friends/openhomefoundation-logo.svg',
    url: 'https://www.openhomefoundation.org/',
  },
  {
    name: '柴火创客空间',
    description: '连接创客与开源硬件的社区空间，助力创意落地。',
    logo: '/friends/chaihuo-logo.png',
    url: 'https://www.chaihuo.org/',
  },
  {
    name: 'Seeed Studio 矽递科技',
    description: '物联网硬件赋能者，为创客与工程师提供开源硬件与制造服务。',
    logo: '/friends/seeed-logo.png',
    url: 'https://www.seeedstudio.com/',
  },
  {
    name: 'Sensereo',
    description: 'Matter over Thread 智能烟感与家居安全方案商。',
    logo: '/friends/sensereo-logo.svg',
    url: 'https://sensereo.com/',
  },
  {
    name: 'Shelly 雪莉智能家居',
    description: 'DIY 智能继电器与传感器，提供中国本地化服务。',
    logo: '/friends/shelly-logo.png',
    url: 'https://www.shellyiot.cn/',
  },
  {
    name: 'SONOFF 易微联',
    description: '兼容 Wi-Fi、Zigbee 与 Matter 的智能家居设备。',
    logo: '/friends/sonoff-logo.png',
    url: 'https://sonoff.tech/',
  },
  {
    name: 'Silicon Labs 芯科科技',
    description: 'Zigbee、Thread 与 Matter 无线连接芯片方案商。',
    logo: '/friends/silabs-logo.png',
    url: 'https://cn.silabs.com/',
  },
  {
    name: 'Aqara 绿米',
    description: '无线全屋空间智能品牌，提供智能家居安防与照明方案。',
    logo: '/friends/aqara-logo.png',
    url: 'https://www.aqara.com/',
  },
  {
    name: 'Apollo Automation',
    description: '隐私优先的本地智能家居传感器，无云端、无订阅。',
    logo: '/friends/apollo-logo.png',
    url: 'https://www.apolloautomation.com/',
  },
  {
    name: 'M5Stack',
    description: '模块化物联网开发平台，赋能快速原型与产品落地。',
    logo: '/friends/m5stack-logo.svg',
    url: 'https://m5stack.com/zh-cn/',
  },
  {
    name: 'Yeelight 易来',
    description: '智能照明与全屋智能家居解决方案。',
    logo: '/friends/yeelight-logo.png',
    url: 'https://cn.yeelight.com/',
  },
  {
    name: 'Heffeix',
    description: '商业与家居智能化解决方案。',
    logo: '/friends/heffeix-logo.png',
    url: 'https://heffeix.com/',
  },
];
