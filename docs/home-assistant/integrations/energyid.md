---
title: EnergyID
description: 关于如何将 EnergyID 集成到 Home Assistant 以将传感器数据发送到 EnergyID 平台的说明。
ha_category:
  - Energy
ha_iot_class: Cloud Push
ha_domain: energyid
ha_integration_type: service
ha_config_flow: true
ha_codeowners:
  - '@JrtPec'
  - '@Molier'
ha_release: 2025.12
ha_quality_scale: silver
---
# EnergyID

**EnergyID** 集成将您的 Home Assistant 连接到 [EnergyID](https://www.energyid.eu/)——一个用于能源监控和优化的云平台。此集成上传您的 Home Assistant 传感器数据，并为太阳能、电池、能源消耗等提供高级分析和性能跟踪。

## 前提条件

1. [EnergyID](https://www.energyid.eu/) 上的活跃账户。

2. 从您的 EnergyID 门户生成的 **配置密钥** 和 **配置密钥密码**。这些凭据允许 Home Assistant 安全地连接到您的账户。

- 有关详细说明，请参阅 [EnergyID Home Assistant 官方文档](https://help.energyid.eu/en/apps/home-assistant/)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

在设置过程中，系统将提示您输入以下信息：

```yaml
Provisioning Key:
  description: 从您的 EnergyID 门户获取的配置密钥。

Provisioning Secret:
  description: 与您的密钥关联的配置密钥密码，从您的 EnergyID 门户获取。
```

### 初始设置步骤

1. 添加集成后，首先会要求您输入 **配置密钥** 和 **密钥密码**。
    <p class='img'><img src='/home-assistant/images/integrations/energyid/image-2.png' alt="Home Assistant 中 EnergyID 连接屏幕的截图，询问配置密钥和密钥密码。"/></p>
2. 如果这是您第一次连接此 Home Assistant 实例，您将被引导到 EnergyID 网站**认领**您的设备。此步骤将您的 Home Assistant 实例链接到您 EnergyID 账户中的特定记录（例如您的房子）。
3. 认领后，设置将自动完成。

## 管理传感器映射

初始设置后，您可以管理哪些 Home Assistant 传感器向 EnergyID 发送数据。

1. 前往 [**设置 > 设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 找到 EnergyID 集成并选择 **配置**。

从这里，您可以添加新的传感器映射。添加映射时，系统会要求您输入以下信息：

```yaml
Home Assistant sensor:
  description: 从您的 Home Assistant 实例中选择要发送数据的传感器实体。列表会自动筛选以建议合适的数值传感器。
```

<p class='img'><img src='/home-assistant/images/integrations/energyid/image-1.png' alt="Home Assistant 中 EnergyID 配置屏幕的截图，显示添加和管理传感器映射的选项。"/></p>

当您选择传感器时，其 `object_id`（实体 ID 中点号后面的部分）将用作 **EnergyID 指标键**。例如，映射 `sensor.total_active_power` 将以键 `total_active_power` 向 EnergyID 发送数据。

## 数据更新

EnergyID 集成使用带批处理的推送机制：

- 它侦听映射传感器的状态变化。
- 当传感器值发生变化时，新值和时间戳将排队。
- 排队的数据会自动批量发送到 EnergyID。上传间隔由从 EnergyID 收到的策略决定（通常每 60 秒）。

这比传统轮询更高效，因为它只在有新更新时发送数据。

## 用例

1. 将 Home Assistant 中的任何内容发送到 EnergyID 进行长期存储/绘图和详细分析。
2. 利用 EnergyID 的功能将您的能源使用情况与类似家庭的匿名数据进行比较，并生成详细报告。
3. 可以找到更多 [EnergyID 的优势](https://help.energyid.eu/en/using-energyid/getting-started-with-energyid/)和简要介绍。

## 故障排除

如果您在 EnergyID 集成方面遇到问题，请尝试以下常规故障排除步骤：

### 数据未出现在 EnergyID 中

1. 验证您 Home Assistant 中链接的实体确实在更新，而不是静止或过时的。并非所有实体都会频繁发出变化。
2. 确保您的实体在集成设置中正确映射。
3. 尝试重新加载 EnergyID 集成，甚至尝试重新加载未在 EnergyID 中更新数据的实体的集成
4. 务必检查 Home Assistant 日志是否有任何错误或问题，或为集成打开调试以接收有关其运行的更多信息。[**设置 > 系统 > 日志**](https://my.home-assistant.io/redirect/logs/)