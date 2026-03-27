---
title: OpenRGB
description: 'OpenRGB 集成用于接入运行 OpenRGB(https://openrgb.org/) 的计算机上的 RGB 灯光设备。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Light
ha_release: 2025.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@felipecrs'
ha_domain: openrgb
ha_platforms:
  - light
  - select
ha_integration_type: hub
ha_quality_scale: silver
---
# OpenRGB

**OpenRGB** 集成用于接入运行 [OpenRGB](https://openrgb.org/) 的计算机上的 RGB 灯光设备。

OpenRGB 为控制不同厂商的各种 RGB 灯光硬件提供了统一界面。

## 前提条件

要使用此集成，您需要在计算机上安装 **OpenRGB** 应用，并运行其 SDK Server。

要启用 OpenRGB SDK server：

1. 在 OpenRGB 应用中，前往 **SDK Server** 选项卡。
2. 选择 **Start Server**。
3. 如有需要，可前往 **Settings** 选项卡并勾选 **Start at Login**、**Start Minimized** 和 **Start Server**，以便更方便地使用。

**注意**：如果您在 OpenRGB 的 **Windows 安装程序**中选择了 **Install System Service**，那么 SDK server 很可能已经在运行。您可以在 Windows 的 **Services** 应用中查看 **OpenRGB** 服务来确认这一点。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Name:
  description: 该集成条目的名称，例如运行 OpenRGB SDK server 的计算机名称（比如 `My Gaming PC`）。
Host:
  description: 运行 OpenRGB SDK server 的计算机主机名或 IP 地址（例如 `192.168.1.100`）。
Port:
  description: OpenRGB SDK server 运行所使用的端口号（默认为 `6742`）。
```

## 支持的设备

此集成支持所有与 OpenRGB 兼容的 RGB 设备。请参阅 [OpenRGB 支持设备列表](https://openrgb.org/devices.html)。

## 支持的功能

OpenRGB 集成提供以下实体：

### 灯光

对于连接到 OpenRGB 的每个 RGB 设备，集成都会创建一个灯光实体，用于将该设备上的所有 LED 作为一个整体进行控制。

### 选择实体

对于每个 OpenRGB 服务器设备，都会创建一个选择实体，用于选择在 OpenRGB 应用中配置的配置文件。

## 数据更新

**OpenRGB** 集成会**每 15 秒**从 OpenRGB SDK server polls 数据。

## 重新配置

如果您需要更新 OpenRGB SDK server 的连接详情，可以重新配置此集成：

1. 前往 **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)**。
2. 选择 **OpenRGB**。打开三点菜单 `[mdi:dots-vertical]`，然后选择 **Reconfigure**。
3. 根据需要更新主机名/IP 地址和端口号。
4. 选择 **Submit**。

此集成随后会使用新设置重新连接到 OpenRGB SDK server。

## 已知限制

- Home Assistant 中显示的灯光状态不一定总能反映设备的真实状态。大多数 RGB 设备不会将状态回报给 OpenRGB，因此它只能根据最后一次发送的命令来推断状态。如果其他应用也在控制这些设备，那么 OpenRGB（以及 Home Assistant）报告的状态可能会过时。
- 直接在 OpenRGB 应用中进行的更改，可能不会立即反映到 Home Assistant 中（因为此集成每 15 秒轮询一次更新）。
- OpenRGB 的某些功能，如按区域和按 LED 控制，目前尚不支持通过 Home Assistant 使用。
- 配置文件选择实体无法用来判断当前激活的是哪个配置文件，因为 OpenRGB SDK server [目前](https://gitlab.com/CalcProgrammer1/OpenRGB/-/issues/5178)并不提供这项信息。

## 故障排除

### 连接错误

如果遇到连接错误：

- 确认 OpenRGB 应用中的 **OpenRGB SDK server** 正在运行。
- 确认 OpenRGB 应用中 **SDK Server** > **Server Host** 被设置为 `0.0.0.0`。
- 确认运行 OpenRGB SDK server 的计算机 IP 地址与 OpenRGB 集成中配置的 **Host** 一致。
- 确认 **SDK Server** > **Server Port** 与 OpenRGB 集成中配置的端口一致。
- 检查是否存在会阻止 Home Assistant 连接 OpenRGB SDK server 的防火墙规则。

### 设备未显示

如果您的 RGB 设备没有出现在 Home Assistant 中：

- 请先确认这些设备已在 OpenRGB 应用中被识别并正常工作。

### 灯光效果无法使用

如果灯光效果无法使用：

- 请先确认该效果或模式可以在 OpenRGB 应用中正常应用。

## 删除集成

此集成遵循标准的集成删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
