---
title: Enigma2 (OpenWebif)
description: 'Enigma2 集成允许您控制安装了 OpenWebif 插件、运行 Enigma2(https://github.com/oe-alliance/oe-alliance-enigma2) 的基于 Linux 的机顶盒。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Media player
ha_release: '0.90'
ha_iot_class: Local Polling
ha_codeowners:
  - '@autinerd'
ha_domain: enigma2
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: device
---
# Enigma2 (OpenWebif)

**Enigma2** 集成允许您控制安装了 OpenWebif 插件、运行 [Enigma2](https://github.com/oe-alliance/oe-alliance-enigma2) 的基于 Linux 的机顶盒。

[OpenWebif](https://github.com/E2OpenPlugins/e2openplugin-OpenWebif) 是基于 Enigma2 机顶盒的开源 Web 界面。

### 前提条件

您的设备需要安装 OpenWebif 插件。在大多数设备上默认安装，如果没有，可以通过 Enigma2 发行版中的插件菜单安装。

请注意，不支持 OpenWebif 设置"HTTPS 需要客户端证书"。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
    description: "您的设备的 IP 地址或主机名。"
Port:
    description: "运行的 OpenWebif 服务的端口号（默认：80）。"
Username:
    description: "如果启用了 HTTP(S) 身份验证，则为用户名。"
Password:
    description: "如果启用了 HTTP(S) 身份验证，则为密码。"
Uses an SSL certificate:
    description: "是否启用了 HTTPS。"
Verify SSL certificate:
    description: "是否应验证 SSL 证书。"
```

## 配置选项

集成提供以下配置选项：

```yaml
Turn off to deep standby:
    description: "关闭设备时将其关机（称为深度待机）。**重要**：当设备处于*深度待机*状态时，无法再访问它！开启设备只能通过以下方法之一：局域网唤醒、设备上的电源按钮或遥控器。"
Bouquet to use as media source:
    description: "设置用于源列表的节目包。"
```

## 实体

目前，暴露以下实体：

### 媒体播放器

支持以下操作：

- 播放/暂停
- 频道上下（使用媒体播放器控件中的上一曲/下一曲按钮）
- 音量控制
- 通过源列表切换频道

源列表的节目包可以通过配置选项进行配置。

## 数据更新

此集成默认每 15 秒从设备获取数据。

## 故障排除

### 设置时出现 403.6 IP 地址拒绝错误

#### 描述

OpenWebif 默认有保护，只有同一子网中的设备才能连接到设备。

#### 解决方案

有两种可能的解决方案来解决此问题：

- 启用 HTTP(S) 身份验证（出于安全考虑推荐）
- 启用 OpenWebif 设置"启用 VPN 访问"

:::note
如果您选择在没有身份验证的情况下启用 VPN 访问，请确保您的网络得到适当保护，因为 OpenWebif 不是为面向公共互联网而设计的。

:::
## 移除集成

此集成遵循标准的集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.