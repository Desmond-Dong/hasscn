---
title: Hegel Amplifier
description: 关于将 Hegel 功放集成到 Home Assistant 的说明。
ha_category:
  - Media player
ha_release: 2026.3
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@boazca'
ha_domain: hegel
ha_platforms:
  - media_player
ha_ssdp: true
ha_quality_scale: silver
ha_integration_type: device
---

**Hegel** 集成允许您从 Home Assistant 控制 [Hegel Music Systems](https://www.hegel.com/) 功放。它使用 Hegel 的官方 IP 控制协议通过 TCP 进行通信，并支持实时推送更新以提供响应式体验。

此集成提供对 Hegel 功放的完全控制，包括电源管理、音量控制、输入选择和静音功能，当通过前面板或遥控器进行更改时都能获得即时反馈。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: 您的 Hegel 功放的主机名或 IP 地址。
Model:
  description: 您的特定 Hegel 功放型号，用于正确的输入映射。
```

## 前提条件

- 您的 Hegel 功放必须连接到与 Home Assistant 相同的网络。
- 功放必须支持 IP 控制（型号 H95、H120、H190、H190V、H390、H590 和 Röst）。
- TCP 端口 50001 必须在 Home Assistant 和功放之间可访问。
- UPnP/SSDP 应在您的网络上启用以便自动发现。

## 支持的型号

以下 Hegel 功放已确认可与此集成一起使用：

- **Röst**
- **H95**
- **H120**
- **H190**
- **H190V**
- **H390**
- **H590**

其他支持 IP 控制的 Hegel 型号也可能工作。如果您的型号未列出但支持网络控制，请尝试该集成并通过 Home Assistant 社区论坛报告兼容性。

## 功能

### 实时控制

集成提供与功放的即时双向通信：

- **电源控制**：打开或关闭功放
- **音量控制**：设置精确的音量级别（0-100%），具有微调能力
- **静音切换**：快速静音和取消静音
- **音源选择**：根据您的特定型号切换可用输入
- **实时状态更新**：通过前面板、遥控器或其他来源进行的更改会立即显示在 Home Assistant 中

### 连接可靠性

集成具有强大的连接管理功能：

- **自动发现**：通过 SSDP/UPnP 在网络上查找兼容的功放
- **连接恢复**：如果网络连接暂时丢失会自动重新连接
- **指数退避**：智能重试逻辑防止在故障期间网络垃圾请求
- **连接验证**：在设置期间测试连接性以防止配置问题

### 特定型号功能

每个 Hegel 型号都有自动映射的特定输入配置：

- **H95**：Analog 1、Analog 2、Coaxial、Optical 1-3、USB、Network
- **H190**：Balanced、Analog 1-2、Coaxial、Optical 1-3、USB、Network
- **H190V**：XLR、Analog 1-2、Coaxial、Optical 1-3、USB、Network、Phono
- **H390**：XLR、Analog 1-2、BNC、Coaxial、Optical 1-3、USB、Network
- **H590**：XLR 1-2、Analog 1-2、BNC、Coaxial、Optical 1-3、USB、Network
- **Röst**：Balanced、Analog 1-2、Coaxial、Optical 1-3、USB、Network

## 使用集成

### 自动化示例

**随电视开启功放：**
```yaml
automation:
  - alias: "Turn on Hegel with TV"
    trigger:
      platform: state
      entity_id: media_player.tv
      to: "on"
    action:
      - action: media_player.turn_on
        target:
          entity_id: media_player.hegel_amplifier
      - action: media_player.select_source
        target:
          entity_id: media_player.hegel_amplifier
        data:
          source: "Optical 1"
```

**根据不同音源自调整音量：**
```yaml
automation:
  - alias: "Adjust Hegel volume by source"
    trigger:
      platform: state
      entity_id: media_player.hegel_amplifier
      attribute: source
    action:
      choose:
        - conditions:
            - condition: state
              entity_id: media_player.hegel_amplifier
              attribute: source
              state: "Network"
          sequence:
            - action: media_player.volume_set
              target:
                entity_id: media_player.hegel_amplifier
              data:
                volume_level: 0.6
        - conditions:
            - condition: state
              entity_id: media_player.hegel_amplifier
              attribute: source
              state: "Phono"
          sequence:
            - action: media_player.volume_set
              target:
                entity_id: media_player.hegel_amplifier
              data:
                volume_level: 0.4
```

**深夜安静模式：**
```yaml
automation:
  - alias: "Hegel quiet mode at night"
    trigger:
      platform: time
      at: "22:00:00"
    condition:
      condition: state
      entity_id: media_player.hegel_amplifier
      state: "on"
    action:
      - action: media_player.volume_set
        target:
          entity_id: media_player.hegel_amplifier
        data:
          volume_level: 0.3
```

## 网络配置

### 防火墙要求

确保以下网络访问可用：

- **TCP 端口 50001**：Home Assistant → Hegel 功放（用于控制命令）
- **UDP 端口 1900**：用于 SSDP 发现（可选，用于自动设置）
- **多播流量**：用于 UPnP 发现（可选）

### 静态 IP 建议

为了获得最佳可靠性，请为您的 Hegel 功放配置静态 IP 地址或 DHCP 保留，以防止 IP 地址更改时出现连接问题。

## 故障排除

### 设置问题

**集成在自动发现期间找不到功放：**

1. 验证功放已开机并连接到网络
2. 检查路由器上是否启用了 UPnP/SSDP
3. 确保 Home Assistant 和功放位于同一网段
4. 尝试使用功放的 IP 地址进行手动设置

**设置期间出现"无法连接到功放"错误：**

1. 验证 IP 地址正确
2. 测试连接：`telnet <amplifier_ip> 50001` 应该能连接
3. 检查路由器和 Home Assistant 主机上的防火墙设置
4. 确保功放型号支持 IP 控制
5. 尝试重启功放

### 连接问题

**集成频繁丢失连接：**

1. 检查 Home Assistant 和功放之间的网络稳定性
2. 验证功放具有静态 IP 或 DHCP 保留
3. 检查路由器日志中的连接断开
4. 考虑网络基础设施问题（Wi-Fi 范围、交换机问题）

**对手动更改的响应延迟：**

1. 集成使用推送更新 - 延迟表明连接问题
2. 检查调试日志中的连接问题
3. 验证设备之间的网络延迟

### 控制问题

**输入名称错误或缺少输入：**

1. 确保您在设置期间选择了正确的 Hegel 型号
2. 不同型号有不同的可用输入
3. 您可以重新配置集成以更改型号
4. 可以在 Home Assistant 的设备设置中自定义实体名称

**音量或静音命令不起作用：**

1. 验证功放已开机
2. 检查固件问题 - 尝试通过前面板手动控制
3. 某些型号可能设置了最大音量限制

### 调试日志

启用调试日志以诊断连接和控制问题：

```yaml
logger:
  logs:
    homeassistant.components.hegel: debug
```

调试日志显示：
- 连接尝试和状态
- 命令传输（TX）和响应（RX）
- 推送通知处理
- 重连尝试和时机
- 错误条件和恢复

**关键日志消息：**
- `Opening connection to <ip>:50001` - 正常连接建立
- `Connected to Hegel at <ip>:50001` - 成功连接
- `TX: <command>` - 发送到功放的命令
- `RX (push): <response>` - 来自功放的实时更新
- `Connection attempt failed: <error> — retrying in X.Xs` - 临时连接丢失并自动重试