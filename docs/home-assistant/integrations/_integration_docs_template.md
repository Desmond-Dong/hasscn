---
title: My integration
description: 集成文档的示例文档结构和文本块。
ha_release: 2025.3
ha_iot_class: Local Push
ha_codeowners:
  - '@home-assistant/core'
ha_domain: my_integration
ha_integration_type: hub
related:
  - url: https://developers.home-assistant.io/docs/documenting/standards
    title: Documentation standard
  - url: https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/
    title: Integration Quality Scale - Rules
  - docs: /docs/glossary/
    title: Glossary
  - docs: /docs/tools/quick-search/#my-links
    title: My link
---

<!--- 集成文档模板提供了文档结构以及各部分的示例内容。示例内容仅供参考，可能不适用于您的集成，或至少需要进行调整。 -->

<!--- 请将此模板与开发者文档一起使用，参见 [文档标准](https://developers.home-assistant.io/docs/documenting/standards) 和 [集成质量等级](https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/) 的文档规则。 -->

**My integration** 集成用于与 [MyCompany](https://www.mycompany.com) 的设备进行整合。MyCompany 生产各种智能家居电器和设备，以其 MyProduct 而闻名。
使用场景：当您将其与其他设备结合使用时，可以实现 x 功能。

## 支持的设备

以下设备已知受此集成支持：

- 设备 1
- 设备 2
- 所有运行 MyOS 的电器

## 不支持的设备

以下设备不受此集成支持：

- 设备 3
- 2010 年之前制造的电器

## 前提条件

1. 打开应用商店并安装 **MyProduct** 应用程序。
2. 创建一个账户。
3. 在应用程序中添加一个设备。
4. 打开应用程序，进入 **设置** 页面。
5. 选择 **开放 API**。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

<!--- 下一节是关于记录配置变量的。详情请参阅 [配置变量的文档标准](/home-assistant/docs/documenting/standards#configuration-variables)。 -->

<!--- 如果您的集成通过配置流程使用： -->

```yaml
Host:
    description: "网桥的 IP 地址。您可以在路由器中或集成应用程序的 **网桥设置** > **本地 API** 下找到它。"
Local access token:
    description: "网桥的本地访问令牌。您可以在集成应用程序的 **网桥设置** > **本地 API** 下找到它。"
```

<!--- 如果集成通过 `configuration.yaml` 中的 YAML 设置： -->

```yaml
Host:
    description: "网桥的 IP 地址。您可以在路由器中或集成应用程序的 **网桥设置** > **本地 API** 下找到它。"
    required: false
    type: string
Local access token:
    description: "网桥的本地访问令牌。您可以在集成应用程序的 **网桥设置** > **本地 API** 下找到它。"
    required: false
    type: string
```

## 配置选项

该集成提供以下配置选项：

```yaml
Country code:
  description: 您可以指定要在摄像头中显示的国家/地区的国家代码（NL 或 BE）。
Timeframe:
  description: 降水预报传感器的预测时间范围（分钟），最小值为 5，最大值为 120。
```

## 支持的功能

**My integration** 集成提供以下实体。

### 按钮

- **开始反冲洗**
  - **描述**：启动机器上的反冲洗过程。激活后有 15 秒的时间转动拨杆。
  - **适用机型**：所有

### 数字

- **剂量**
  - **描述**：每个按键的剂量（以刻度为单位）
  - **适用机型**：GS3 AV、Linea Mini。
  - **备注**：GS3 有多个此实体，每个物理按键（1-4）一个，且这些实体默认为禁用状态。

### 传感器

- **当前咖啡温度**
  - **描述**：咖啡锅炉的当前温度。
  - **适用机型**：所有
  - **备注**：当机器达到温度时，由于测量点不同，该值会比 `咖啡目标温度` 高约 3 度。

- **当前蒸汽温度**
  - **描述**：蒸汽锅炉的当前温度。
  - **适用机型**：Linea Micra、GS3 AV、GS3 MP。
  - **备注**：-

### 选择器

- **预浸/预注模式**
  - **描述**：是否使用预浸、预注或都不使用。
  - **选项**：禁用、预浸、预注
  - **适用机型**：Linea Micra、Linea Mini、GS3 AV

- **蒸汽等级**
  - **描述**：蒸汽锅炉应运行的等级。
  - **选项**：1、2、3
  - **适用机型**：Linea Micra

### 更新

- **网关固件**
  - **描述**：网关的固件状态。
  - **适用机型**：所有

## 动作

该集成提供以下动作。

### 动作：获取日程

`my_integration.get_schedule` 动作允许您从集成获取日程安排。

- **数据属性**：`config_entry_id`
  - **描述**：要获取日程的配置条目 ID。
  - **可选**：否

## 示例

### 夜间关闭 LED

设备上的状态 LED 可能相当亮。
为了解决这个问题，您可以使用此蓝图轻松实现日落时自动关闭 LED。

链接到 [蓝图交换](https://community.home-assistant.io/c/53) 上的蓝图

## 数据更新

**My integration** 集成默认每 5 分钟从设备轮询数据。
较新的设备（运行 MyOS 的设备）可以推送数据。
在这种情况下，集成启动时会启用数据推送。如果启用数据推送失败，集成将使用数据轮询。

## 已知限制

该集成不提供重启功能，但可以通过制造商的应用程序完成。

## 故障排除

### 无法设置设备

#### 症状："无法访问此设备"

尝试设置集成时，表单显示消息"无法访问此设备"。

#### 描述

这意味着设备上的设置不正确，因为设备需要启用本地通信。

#### 解决方案

要解决此问题，请尝试以下步骤：

1. 确保设备已通电（LED 灯亮起）。
2. 确保设备已连接到互联网：
   - 确保制造商的应用程序可以看到该设备。
3. 确保设备已启用本地通信：
   - 检查设备的设置。
   - 查阅设备的手册。
...

### 我看不到我的设备

确保设备可以通过制造商的应用程序看到和控制。
如果不行，请检查设备的电源和网络连接。

### 设备一天后变为不可用

确保您已关闭设备的省电模式。

## 移除集成

此集成遵循标准的集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

删除集成后，请前往制造商的应用程序，并从那里移除 Home Assistant 集成。