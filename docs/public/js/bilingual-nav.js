// 双语导航脚本
(function() {
  // 定义双语导航配置
  const navConfig = {
    'zh-CN': [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '汉化专区',
        items: [
          {
            text: '官方网页汉化',
            link: 'https://ha-doc.hasscn.top',
          },
          {
            text: '移动App汉化',
            link: '/companion/',
          },
          {
            text: 'Node Red 网页汉化',
            link: 'https://nodered.hasscn.top/',
          },
          {
            text: 'Home Assistant 开发者文档',
            link: '/developers/',
          },
          {
            text: 'HASS Agent 汉化手册',
            link: '/hass-agent/',
          },
          {
            text: 'ESPHome 准备开始',
            link: '/esphome/',
          },
          {
            text: '其它汉化资源',
            link: 'https://gitee.com/ha-china/Translated/',
          },
        ],
      },
      {
        text: '下载专区',
        link: '/download',
      },
      {
        text: '快速问答',
        link: '/QandA',
      },
      {
        text: '测评专区',
        link: '/evaluation/index',
      },
      {
        text: '支持我',
        link: '/sponsor',
      },
      {
        text: '关于',
        items: [
          {
            text: '关于本站',
            link: '/about',
          },
          {
            text: '搜索引擎',
            link: '/no-baidu',
          },
          {
            text: '重要事件',
            link: '/MajorEvents',
          },
          {
            text: '服务器状态(China Only)',
            link: 'https://status.hasscn.top/status/1',
          },
        ],
      },
      {
        text: 'English',
        link: '/en/',
      },
    ],
    'en-US': [
      {
        text: 'Home',
        link: '/en/',
      },
      {
        text: 'Localization',
        items: [
          {
            text: 'Official Web Localization',
            link: 'https://ha-doc.hasscn.top',
          },
          {
            text: 'Mobile App Localization',
            link: '/companion/',
          },
          {
            text: 'Node Red Web Localization',
            link: 'https://nodered.hasscn.top/',
          },
          {
            text: 'Home Assistant Developer Docs',
            link: '/developers/',
          },
          {
            text: 'HASS Agent Localization',
            link: '/hass-agent/',
          },
          {
            text: 'ESPHome Getting Started',
            link: '/esphome/',
          },
          {
            text: 'Other Resources',
            link: 'https://gitee.com/ha-china/Translated/',
          },
        ],
      },
      {
        text: 'Downloads',
        link: '/en/download',
      },
      {
        text: 'Q&A',
        link: '/en/QandA',
      },
      {
        text: 'Reviews',
        link: '/en/evaluation/index',
      },
      {
        text: 'Sponsor',
        link: '/en/sponsor',
      },
      {
        text: 'About',
        items: [
          {
            text: 'About Site',
            link: '/en/about',
          },
          {
            text: 'Search Engine',
            link: '/en/no-baidu',
          },
          {
            text: 'Major Events',
            link: '/en/MajorEvents',
          },
          {
            text: 'Server Status(China Only)',
            link: 'https://status.hasscn.top/status/1',
          },
        ],
      },
      {
        text: '中文',
        link: '/',
      },
    ],
  };

  // 判断当前页面语言
  function getCurrentLanguage() {
    const path = window.location.pathname;
    return path.startsWith('/en/') ? 'en-US' : 'zh-CN';
  }

  // 生成导航HTML
  function generateNavItems(navItems) {
    return navItems.map(item => {
      if (item.items && item.items.length > 0) {
        // 有子菜单的项目
        const subItems = item.items.map(subItem =>
          `<li><a href="${subItem.link}">${subItem.text}</a></li>`
        ).join('');

        return `
          <li class="navbar-dropdown">
            <span>${item.text}</span>
            <ul class="navbar-dropdown-menu">
              ${subItems}
            </ul>
          </li>
        `;
      } else {
        // 普通链接
        return `<li><a href="${item.link}">${item.text}</a></li>`;
      }
    }).join('');
  }

  // 更新导航菜单
  function updateNavigation() {
    const currentLang = getCurrentLanguage();
    const navItems = navConfig[currentLang];

    // 查找导航菜单容器
    const navContainer = document.querySelector('.navbar-nav') ||
                       document.querySelector('nav ul') ||
                       document.querySelector('.navigation ul');

    if (navContainer && navItems) {
      navContainer.innerHTML = generateNavItems(navItems);
    }
  }

  // 页面加载完成后执行
  function initBilingualNav() {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateNavigation);
    } else {
      updateNavigation();
    }

    // 监听路由变化（适用于SPA）
    let currentPath = window.location.pathname;
    setInterval(() => {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        updateNavigation();
      }
    }, 100);
  }

  // 启动双语导航
  initBilingualNav();
})();