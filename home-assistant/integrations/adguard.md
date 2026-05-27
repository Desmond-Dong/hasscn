# AdGuard Home

**AdGuard Home** integration 允许您在 Home Assistant 中控制和监控您的 [AdGuard Home](https://adguard.com/adguard-home/overview.html) 实例。

AdGuard Home 是一款用于阻止广告和跟踪的网络级软件。它提供 DNS 级别的保护，自动覆盖所有家庭设备，无需客户端软件。当您使用 AdGuard Home 作为 DNS 服务器时，它会为网络上的所有设备阻止广告、跟踪器和恶意域名。

## 前提条件

在设置 AdGuard Home 集成之前，请确保您已：

1. AdGuard Home 已安装并在您的网络上运行
2. AdGuard Home 实例的 IP 地址或主机名
3. AdGuard Home 的管理员访问权限

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: "AdGuard Home 实例的 IP 地址或主机名。例如：`192.168.1.100` 或 `adguard.local`。"
Port:
  description: "AdGuard Home 运行的端口。Web 界面默认为 `3000`。"
Username:
  description: "您的 AdGuard Home 管理员用户名。"
Password:
  description: "您的 AdGuard Home 管理员密码。"
Verify SSL certificate:
  description: "通过 HTTPS 连接时启用 SSL 证书验证。"
```

## 支持的功能

### 传感器

此集成提供以下来自 AdGuard Home 信息的传感器：

* DNS 查询数量。
* 已阻止的 DNS 查询数量。
* 已阻止的 DNS 查询比率（%）。
* 被安全浏览阻止的请求数量。
* 强制安全搜索的数量。
* 被家长控制阻止的请求数量。
* 已加载的活动过滤规则总数。
* AdGuard DNS 服务器的平均响应时间（毫秒）。

### 开关

集成提供开关来控制 AdGuard Home 功能：

* **AdGuard 保护**：控制所有 AdGuard 功能的主开关
* **过滤**：使用阻止列表启用 DNS 过滤
* **安全浏览**：阻止已知的钓鱼和恶意软件网站
* **家长控制**：阻止成人内容
* **安全搜索**：在搜索引擎上强制安全搜索
* **查询日志**：记录 DNS 查询以用于统计

这些开关支持强大的自动化。例如，您可以在上课时间自动启用家长控制，或在特定时间段禁用广告拦截。

**AdGuard 保护**开关作为主控制。关闭时，它会绕过所有 AdGuard 功能，无论各个开关状态如何。

:::important
关闭 **查询日志** 会停止所有传感器更新。AdGuard 需要查询日志才能提供统计数据。

:::

### 更新

集成提供 update 实体来检查和安装 AdGuard Home 软件更新。

:::note
对于基于 Docker 安装的 AdGuard Home，没有 AdGuard Home 软件的更新实体。如果您在 Home Assistant Operating System 上安装了 [AdGuard Home app for Home Assistant](https://github.com/hassio-addons/addon-adguard-home)（以前称为 AdGuard Home 插件），Home Assistant 会为 AdGuard Home app for Home Assistant 提供更新实体。

:::

## 动作

集成提供 actions 来管理 AdGuard Home 中的过滤订阅。在自动化中使用这些动作，根据时间、存在或其他条件动态控制内容过滤。

例如，您可以创建以下自动化：

* 在工作时间阻止社交媒体
* 当访客连接到您的网络时启用严格过滤
* 为特定下载临时禁用过滤

### 动作：添加 URL

`adguard.add_url` 动作用于向 AdGuard Home 添加新的过滤订阅。

| 数据属性 | 可选 | 描述                                   |
| -------------- | -------- | --------------------------------------------- |
| `name`         | 否       | 过滤订阅的名称           |
| `url`          | 否       | 包含阻止规则的过滤列表 URL |

### 动作：移除 URL

`adguard.remove_url` 动作用于从 AdGuard Home 移除过滤订阅。

| 数据属性 | 可选 | 描述                           |
| -------------- | -------- | ------------------------------------- |
| `url`          | 否       | 要移除的过滤订阅 URL |

### 动作：启用 URL

`adguard.enable_url` 动作用于启用之前禁用的过滤订阅。

| 数据属性 | 可选 | 描述                           |
| -------------- | -------- | ------------------------------------- |
| `url`          | 否       | 要启用的过滤订阅 URL |

### 动作：禁用 URL

`adguard.disable_url` 动用于临时禁用过滤订阅而不删除它。

| 数据属性 | 可选 | 描述                            |
| -------------- | -------- | -------------------------------------- |
| `url`          | 否       | 要禁用的过滤订阅 URL |

### 动作：刷新

`adguard.refresh` 动作用于刷新所有过滤订阅以获取最新的阻止规则。

| 数据属性 | 可选 | 描述                                     |
| -------------- | -------- | ----------------------------------------------- |
| `force`        | 是      | 强制更新（绕过 AdGuard Home 限制） |

默认情况下，`force` 为 `false`。AdGuard Home 通常会限制过滤更新以减少服务器负载。请谨慎使用强制更新。

## 示例

### 在工作时间阻止社交媒体

此自动化在工作时间阻止社交媒体网站：

```yaml
automation:
  - alias: "工作时间阻止社交媒体"
    triggers:
      - trigger: time
        at: "09:00:00"
    actions:
      - action: adguard.add_url
        data:
          name: "社交媒体阻止列表"
          url: "https://raw.githubusercontent.com/example/social-media-blocklist/main/list.txt"
      - action: adguard.refresh

  - alias: "下班后解除社交媒体阻止"
    triggers:
      - trigger: time
        at: "17:00:00"
    actions:
      - action: adguard.remove_url
        data:
          url: "https://raw.githubusercontent.com/example/social-media-blocklist/main/list.txt"
```

### 访客到达时启用严格过滤

当访客连接到您的网络时自动启用所有保护功能：

```yaml
automation:
  - alias: "为访客启用严格过滤"
    triggers:
      - trigger: state
        entity_id: group.guest_devices
        from: "not_home"
        to: "home"
    actions:
      - action: switch.turn_on
        target:
          entity_id:
            - switch.adguard_parental_control
            - switch.adguard_safe_browsing
            - switch.adguard_safe_search
```

### 监控 DNS 性能

如果 DNS 响应时间超过阈值则发送通知：

```yaml
automation:
  - alias: "DNS 缓慢警报"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.adguard_average_processing_speed
        above: 50
    actions:
      - action: notify.mobile_app
        data:
          title: "DNS 性能警报"
          message: "AdGuard DNS 响应时间为 {{ states('sensor.adguard_average_processing_speed') }}ms"
```

## 数据更新

AdGuard Home 集成每 10 秒轮询一次更新，以提供近乎实时的统计数据并确保开关状态保持同步。

## 故障排除

### 集成连接失败

#### 症状："无法连接到 AdGuard Home"

设置集成时，您收到连接错误。

##### 解决方法

1. 验证 AdGuard Home 正在运行：

   * 访问 `http://YOUR_IP:3000` 的 AdGuard Home Web 界面。
   * 检查服务器上的服务状态。

2. 检查网络连接：

   * 确保 Home Assistant 可以访问 AdGuard Home 实例。
   * 验证没有防火墙规则阻止端口 3000。

3. 确认凭据：
   * 通过 AdGuard Home Web 界面测试登录。
   * 确保您使用的是管理员凭据。

### 传感器显示不可用

如果传感器显示为不可用：

1. 检查 **查询日志** 开关是否已启用。
2. 验证 AdGuard Home 正在处理 DNS 查询。
3. 确保至少有一台设备使用 AdGuard Home 作为 DNS 服务器。

### 动作失败并显示"未找到过滤 URL"

当尝试启用、禁用或移除不存在的过滤 URL 时会出现此错误。使用 AdGuard Home Web 界面在 **Filters** > **DNS blocklists** 下验证确切的 URL。

## 移除集成

此集成遵循标准集成移除流程。移除后，您的 AdGuard Home 实例将继续以其当前配置运行。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
