# ntfy

**ntfy** 集成允许您通过 [ntfy.sh](https://ntfy.sh/) 或其他 ntfy 服务发布推送通知。

## 关于 ntfy

**ntfy** 是一个简单的基于 HTTP 的发布-订阅通知服务，允许您向手机或桌面发送通知。官方 [ntfy](https://ntfy.sh/) 服务还提供其他功能，例如通过电子邮件或电话使用文本转语音朗读消息的通知。由于 ntfy 是 100% 开源的，因此您可以选择使用替代的公共 ntfy 服务，甚至托管您自己的实例。

## 如何使用此集成

ntfy 集成可用于通过 [ntfy](https://ntfy.sh/) 服务器发送和接收消息。例如，从 Home Assistant 向您的手机发送通知，或从脚本向 Home Assistant 发送消息。

## 前提条件

1. **Service URL**

要设置 **ntfy** 集成，您需要要使用的 ntfy 服务的 URL。

* 使用“https://ntfy.sh”作为官方 ntfy 服务。
  * 提供替代公共 ntfy 服务或您的自托管实例的 URL（例如“https://your-ntfy-instance.com”）。

2. **身份验证（可选）**

根据服务器是否配置为支持访问控制，某些主题可能受到读/写保护，以便只有具有正确凭据的用户才能订阅或发布它们。

**ntfy** 集成使用 **访问令牌** 身份验证来访问受保护的主题。当您提供 ntfy 用户名和密码时，Home Assistant 会自动生成并使用访问令牌进行身份验证。

3. **添加主题**

   要为通知设置主题，请选择 **`[mdi:plus]` 添加主题**，如果系统提示，请选择您之前配置的 ntfy 服务。

您现在可以选择以下选项之一：

* 选择 **输入主题** 以添加新主题。通过从 ntfy 应用程序或 ntfy 服务网站检索来使用**现有主题名称**。只需将主题名称复制并粘贴到配置中即可。
  * 选择 **生成主题名称** 以允许集成自动生成 **随机主题名称**。

对要添加的每个主题重复这些步骤。

:::note
主题可能不受密码保护，因此请选择一个不易猜到的名称。如果您要发送敏感信息，请考虑保留该主题并限制对其的访问。

:::

## 配置

要将 **ntfy** 服务添加到您的 Home Assistant 实例，请使用此 My 按钮：

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=ntfy)

<details>
<summary>手动配置步骤</summary>

* 打开您的 Home Assistant 实例。
* 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
* 在右下角，选择 [**添加集成**](https://my.home-assistant.io/redirect/config_flow_start/?domain=ntfy)。
* 在列表中选择 **ntfy**。
* 按照屏幕上的说明完成设置。

</details>

## 配置参数

### 服务参数

```yaml
"Service URL":
    description: "Address of the ntfy service. Defaults to `https://ntfy.sh`."
"Username (optional)":
    description: "Username required to authenticate with protected ntfy topics."
"Password (optional)":
    description: "Password corresponding to the provided username for authentication."
```

### 主题参数

```yaml
"Topic":
    description: "Name of the topic."
"Display name (optional)":
    description: "An alternative name to display instead of the topic name. This helps identify topics with complex or hard-to-read names more easily."
```

## 通知器

**ntfy** 集成会为每个已配置的主题添加一个设备，并关联一个 notify 实体。要发布通知，您可以使用 `notify.send_message` 动作。要开始使用通知，请参阅[自动化入门页面](/home-assistant/getting-started/automation/index.md)。

<details>
<summary>配置示例</summary>

```yaml
action: notify.send_message
data:
  message: "Reminder: Have you considered frogs?"
  entity_id: notify.mytopic
```

</details>

## 事件

系统会为每个已配置的主题创建一个事件实体。这些实体会订阅各自的主题，并实时接收来自 **ntfy** 服务的通知。每个事件实体都会通过其属性公开通知的完整内容，包括链接、附件、标签和其他元数据。

You can use event entities in automations. For example, to trigger actions in Home Assistant, or to forward notifications to other devices for further processing or alerting.

<details>
<summary>配置示例</summary>

```yaml
triggers:
  - trigger: numeric_state
    entity_id:
      - event.mytopic
    attribute: priority
    above: 4
actions:
  - action: notify.mobile_app_your_device
    data:
      message: "Received new ntfy notification"
```

</details>

## 更新

对于自托管的 **ntfy** 实例，Home Assistant 会创建一个更新实体，该实体显示何时有新版本的 **ntfy** 可供下载。如需执行更新，请参阅官方[文档](https://docs.ntfy.sh/)。

### 前提条件

* **ntfy** 版本 2.17.0 或更高版本
* 在实例上配置具有**管理员**权限的用户

## 操作

### 发布通知

对于更多可自定义的通知，请使用“ntfy.publish”操作而不是“notify.send\_message”。通过“ntfy.publish”，您可以充分利用 **ntfy** 服务的功能。其中包括设置优先级、添加链接、附件、标签和表情符号。

#### 参数

* `title`：通知消息的标题。
* `message`：您的通知消息。
* `markdown`：为消息正文启用 Markdown 格式。有关语法详细信息，请参阅 Markdown 指南：<https://www.markdownguide.org/basic-syntax/>。
* `tags`：向通知添加标签或表情符号。表情符号（使用“微笑”等短代码）将出现在通知标题或消息中。其他标签将显示在通知内容下方。
* “优先级”：所有消息都有优先级，它定义了手机通知您的紧急程度，具体取决于配置的振动模式、通知声音以及通知抽屉或弹出窗口中的可见性。
* `click`：单击通知时打开的 URL。
* `delay`：设置消息传递的延迟。最短延迟为 10 秒，最长延迟为 3 天。
* `attach`：通过 URL 附加图像或其他文件。
* `attach_file`：通过从本地文件或相机媒体源上传来附加图像或其他文件。选择相机时，当前快照将被上传并附加到通知中。
* `文件名`：指定附件的自定义文件名，包括文件扩展名（例如，attachment.jpg）。如果未提供，将使用本地文件的原始文件名。
* `email`：指定将通知转发到的地址，例如`mail@example.com`。
* “呼叫”：拨打电话号码并使用文本转语音大声朗读消息。需要 ntfy Pro 和事先的电话号码验证。
* `icon`：包括将出现在通知文本旁边的图标。仅支持 JPEG 和 PNG 图像。
* `action`：通知下方最多可以添加三个**操作按钮**。 **Ntfy** 支持以下类型：[**打开网站/应用程序**](#open-a-website-or-app)、[**发送 HTTP 请求**](#send-http-request)、[**发送 Android 广播**](#send-android-broadcast) 和 [**复制到剪贴板**](#copy-to-clipboard)。
* `sequence_id`：输入消息或序列 ID 以更新现有通知，或指定序列 ID 以供稍后更新、清除（标记为已读并关闭）或删除通知时参考。请参阅[**更新+删除通知**](https://docs.ntfy.sh/publish/#updating-deleting-notifications)

<details>
<summary>配置示例</summary>

```yaml
action: ntfy.publish
data:
  title: "Server Alert"
  message: "CPU usage exceeded 90%."
  priority: "5"
  click: "https://homeassistant.local"
  tags:
    - rotating_light
  actions:
    - action: http
      label: 🚪 Close door
      url: https://api.mygarage.lan/
      headers:
        - Authorization: Bearer zAzsx1sk..
      body: "{\"action\": \"close\"}"
      method: PUT
    - action: broadcast
      label: 📸 Take picture
      extras:
        - cmd: pic
        - camera: front
    - action: copy
      label: 📋️ Copy code
      value: "123456"
target:
  entity_id: notify.mytopic
```

</details>

:::note
所有参数都是可选的。如果“message”留空，通知将使用默认文本：“triggered”。如果未指定“priority”，则将使用默认优先级 (3)。

:::
:::tip
查看[表情符号参考](https://docs.ntfy.sh/emojis/) 以获取受支持的表情符号短代码的完整列表。

:::

#### 操作按钮参数

根据所选类型，支持以下必需和可选参数：

##### 打开网站或应用

| 参数 | 必填 | 描述 |
| :-------- | :------: | :---------- |
| `action` | ✔️ | 选择 `view`，在点按按钮时打开网站或应用。 |
| `label` | ✔️ | 通知中操作按钮的标签。 |
| `url` | ✔️ | 点按操作时要打开的 URL。 |
| `clear` | | 点按操作按钮后清除通知。 |

##### 发送 HTTP 请求

| 参数 | 必填 | 描述 |
| :-------- | :------: | :---------- |
| `action` | ✔️ | 选择 `http`，在点按按钮时发送 HTTP 请求。 |
| `label` | ✔️ | 通知中操作按钮的标签。 |
| `url` | ✔️ | 将发送 HTTP 请求的 URL。 |
| `method` | | 请求使用的 HTTP 方法，默认为 `POST`。 |
| `headers` | | 请求中传递的 HTTP 标头（键值对）。 |
| `body` | | 要在 HTTP 请求正文中发送的负载。 |
| `clear` | | 点按操作按钮后清除通知。 |

##### 发送 Android 广播

| 参数 | 必填 | 描述 |
| :-------- | :------: | :---------- |
| `action` | ✔️ | 选择 `broadcast`，在点按按钮时发送 Android 广播意图。 |
| `label` | ✔️ | 通知中操作按钮的标签。 |
| `intent` | | Android 意图名称，默认为 `io.heckel.ntfy.USER_ACTION`。 |
| `extras` | | Android 意图附加参数（键值对）。 |
| `clear` | | 点按操作按钮后清除通知。 |

##### 复制到剪贴板

| 参数 | 必填 | 描述 |
| :-------- | :------: | :---------- |
| `action` | ✔️ | 选择 `copy`，在点按按钮时将指定值复制到剪贴板。 |
| `label` | ✔️ | 通知中操作按钮的标签。 |
| `value` | ✔️ | 要复制到剪贴板的值。 |
| `clear` | | 点按操作按钮后清除通知。 |

### 标记通知为已读

`ntfy.clear` 操作通过将其标记为已读来忽略以前从 ntfy 主题发送的消息。

#### 参数

* `sequence_id`：要消除的通知的消息 ID 或序列 ID。

<details>
<summary>配置示例</summary>

```yaml
action: ntfy.clear
target:
  entity_id: notify.mytopic
data:
  sequence_id: my-download-123
```

</details>

### 删除通知

`ntfy.delete` 操作从 ntfy 主题中删除一条消息。

#### 参数

* `sequence_id`：要删除的通知的消息 ID 或序列 ID。

<details>
<summary>配置示例</summary>

```yaml
action: ntfy.delete
target:
  entity_id: notify.mytopic
data:
  sequence_id: my-download-123
```

</details>

## 传感器

**ntfy** 集成添加了代表服务的设备，以及显示您的使用统计数据和当前帐户限制的各种传感器。

### 📊 消息统计

* **发布的消息**：今天发送的消息总数。
* **剩余消息数**：达到每日限制之前仍可发送的消息数。
* **消息使用限制**：帐户每天允许的最大消息数。
* **消息过期时间**：已发布消息在自动删除之前缓存的时间。

### ✉️ 邮件统计

* **发送的电子邮件**：今天发送的电子邮件通知数量。
* **剩余电子邮件**：今天仍可以发送的电子邮件通知数量。
* **电子邮件使用限制**：帐户上电子邮件通知的每日限制。

### 📞 电话统计

* **拨打的电话**：今天拨打的电话提醒总数。
* **剩余电话数量**：今天仍可拨打的电话提醒数量。
* **电话使用限制**：帐户每天允许的最大电话提醒次数。

### 🔒 保留主题

* **保留主题**：当前分配给帐户的保留主题数量。
* **剩余保留主题**：仍可保留的主题数量。
* **保留主题限制**：帐户允许的保留主题的最大数量。

### 📎 附件统计

* **附件存储**：文件附件当前使用的存储空间量。
* **剩余附件存储空间**：可用于附件的剩余存储容量。
* **附件存储限制**：为附件分配的总存储配额。
* **附件有效期**：附件在自动删除之前会保留该期限。
* **附件文件大小限制**：单个附件文件允许的最大大小。
* **附件带宽限制**：上传和下载附件的每日带宽上限。

### ⭐ 账户

* **订阅等级**：当前分配给 ntfy 帐户的订阅计划。

## 数据更新

该集成每 15 分钟从 **ntfy.sh** （或您自己的 ntfy 实例）检索数据以更新使用统计传感器。

## 已知限制

**ntfy** 施加各种速率和使用限制。官方的 [ntfy.sh](https://ntfy.sh/) 服务最多允许**60 条消息突发**，**每 5 秒一条消息的补充率**（即 5 分钟内充满 60 条消息容量）。

额外的使用限制取决于您的帐户级别。要查看您当前的限制，请转至[**帐户 → 使用情况**](https://ntfy.sh/account)。

使用其他 **ntfy** 服务时，限制可能会有所不同。如果您使用的是自托管实例，则可以配置更高的限制或完全禁用它们。

## 故障排除

**ntfy** 集成依赖于活动的互联网连接来与 ntfy 服务进行通信。如果遇到问题，请验证您的网络连接是否稳定并且 ntfy 服务是否可访问。此外，ntfy 服务本身可能会遇到停机（无论是意外停机还是由于计划维护）。

无论如何，在报告问题时，请启用[调试日志记录](/home-assistant/docs/configuration/troubleshooting/index.md#debug-logs-and-diagnostics)，重新启动集成，一旦问题再次出现，请再次停止调试日志记录（*将自动开始下载调试日志文件*）。此外，如果可能的话，还请下载[诊断](/home-assistant/integrations/diagnostics.md) 数据。如果您已收集调试日志和诊断数据，请向他们提供问题报告。

## 删除集成

可以通过以下步骤删除此集成：

### 从 Home Assistant 中移除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，然后选择该集成卡片。
2. 在设备列表中，选择您要删除的集成实例。
3. 在该条目旁边，选择三点菜单 `[mdi:dots-vertical]`，然后选择 **删除**。
