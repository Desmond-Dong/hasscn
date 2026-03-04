---
title: 功能概览
id: 'core'
---

Home Assistant Companion 应用提供了一种便捷的方式来查看和控制您的 Home Assistant 实例，但它还通过允许您的设备作为数据源来扩展实例的功能。Home Assistant Companion 应用添加了大量 [传感器](sensors.md)（如电池和网络状态等）、创建一个 `device_tracker` 实体以允许从设备发送 [位置](location.md) 更新，并提供 [操作快捷方式](actions.md) 来触发脚本或自动化。

目前并非所有功能都支持 Android，但最终大多数功能都会得到支持。查找 <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 标志以查看当前支持的功能。

## 功能对比：

<table className="core-table">
  <thead>
    <tr>
      <th><strong>集成</strong></th>
      <th><img alt="Android" src="/companion-assets/android.svg" /> 完整版</th>
      <th><img alt="Android" src="/companion-assets/android.svg" /> 精简版</th>
      <th><img alt="iOS" src="/companion-assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/companion-assets/macOS.svg" /></th>
      </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/companion/core/actions">操作</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/android-device-controls">Android 设备控制</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/android-quick-settings">Android 快速设置</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/android-shortcuts">Android 快捷方式</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/android-webview">Android WebView</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/android-widgets">Android 小部件</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/app-events">应用事件</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/haptics">触觉反馈</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/siri-shortcuts">Siri 快捷指令</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/sharing">分享</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/theming">主题</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/url-handler">URL 处理器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/universal-links">通用链接</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/integrations/x-callback-url">X-Callback-URL</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>位置更新</strong></th>
      <th><img alt="Android" src="/companion-assets/android.svg" /> 完整版</th>
      <th><img alt="Android" src="/companion-assets/android.svg" /> 精简版</th>
      <th><img alt="iOS" src="/companion-assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/companion-assets/macOS.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/companion/core/location#overview">应用打开</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/location#overview">应用刷新</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/location#overview">后台</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/location#location-tracking-in-home-assistant-zones">进入/离开区域</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/location#ibeacons">iBeacon</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/location#sending-an-intent">Intent</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/commands#request-location-updates">通知</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/location#location-tracking-when-outside-a-home-assistant-zone">显著位置变化</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/location#overview">URL 处理器</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/location#overview">X-Callback-URL</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>通知</strong></th>
      <th><img alt="Android" src="/companion-assets/android.svg" /> 完整版</th>
      <th><img alt="Android" src="/companion-assets/android.svg" /> 精简版</th>
      <th><img alt="iOS" src="/companion-assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/companion-assets/macOS.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/companion/notifications/actionable">可操作通知</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#alert-once">仅提醒一次</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#badge">角标</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#notification-channels">频道</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/cleared">已清除</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#notification-color">颜色</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/commands">命令</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/critical">关键警报</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/dynamic-content">动态附件</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#grouping">分组</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#notification-message-html-formatting">HTML 格式化</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#notification-icon">图标</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/attachments">图片</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#notification-channel-importance">重要性</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#notification-led-color">LED 颜色</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/local">本地推送</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic">消息</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#opening-a-url">打开 URL</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#persistent-notification">持久通知</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#presentation-options">呈现选项</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#clearing">可替换通知</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/commands#request-location-updates">请求位置更新</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/sounds">声音</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#notification-status-bar-icon">状态栏图标</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#sticky-notification">粘性</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#subtitle--subject">主题 / 副标题</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#text-to-speech-notifications">文字转语音</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#notification-timeout">超时</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic">标题</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/basic#notification-vibration-pattern">振动模式</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/notifications/attachments">视频</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>传感器</strong></th>
      <th><img alt="Android" src="/companion-assets/android.svg" /> 完整版</th>
      <th><img alt="Android" src="/companion-assets/android.svg" /> 精简版</th>
      <th><img alt="iOS" src="/companion-assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/companion-assets/macOS.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/companion/core/sensors#active-sensor">活动传感器</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors">活动摄像头</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors">活动麦克风</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#activity-sensors">活动传感器</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#android-auto-sensor">Android Auto 传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#android-os-sensors">Android OS 传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#app-data-sensors">应用数据传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#app-importance-sensor">应用重要性传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#app-memory-sensor">应用内存传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#app-usage-sensors">应用使用传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#audio-sensors">音频传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#pedometer-sensors">平均活动步速</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#battery-sensors">电池电量</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#battery-sensors">电池状态</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#bluetooth-sensors">蓝牙传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#connection-type-sensor">BSSID</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors">摄像头使用中</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#connection-type-sensor">连接类型</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#current-time-zone-sensor">当前时区</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#current-version-sensor">当前版本</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors">显示器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#pedometer-sensors">距离</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#do-not-disturb-sensor">勿扰模式</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#doze-sensor">休眠模式</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#dynamic-color-sensor">动态颜色</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#pedometer-sensors">上楼层数</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#pedometer-sensors">下楼层数</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#frontmost-app-sensor">最前应用</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#geocoded-location-sensor">地理编码位置</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#health-connect-sensors">Health Connect</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#high-accuracy-mode">高精度模式</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#high-accuracy-update-interval">高精度更新间隔</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#interactive-sensor">交互状态</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#keyguard-sensors">锁屏传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#last-reboot-sensor">最后重启</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#last-update-trigger-sensor">最后更新触发器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#last-used-app-sensor">最后使用应用</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#light-sensor">光线</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors">麦克风使用中</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#mobile-data-sensors">移动数据传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#notification-sensors">通知传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#phone-sensors">电话传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#power-save-sensor">省电模式</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#pressure-sensor">压力</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors">主显示器 ID 和名称</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#proximity-sensor">距离</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#public-ip-sensor">公网 IP</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#next-alarm-sensor">下次闹钟</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#cellular-provider-sensor">SIM 卡 1</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#cellular-provider-sensor">SIM 卡 2</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors">SSID</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#pedometer-sensors">步数</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#storage-sensor">存储</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#traffic-stats-sensor">流量统计</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/companion/core/sensors#work-profile-sensor">工作配置文件</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>