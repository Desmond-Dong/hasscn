---
title: Google Assistant
description: Google Assistant 集成设置
ha_category:
  - Voice
featured: true
ha_release: 0.56
ha_iot_class: Cloud Push
ha_codeowners:
  - '@home-assistant/cloud'
ha_domain: google_assistant
ha_integration_type: system
ha_platforms:
  - button
  - diagnostics
---

**Google Assistant** 集成允许您通过手机、平板或 Google Home 设备上的 Google Assistant 控制 Home Assistant 设备。

如果您想向 Google Assistant 发送命令来控制 Google Assistant 支持但 Home Assistant 不支持的设备，或者向 Google Assistant 扬声器和显示器广播消息而不中断音乐/视频播放，请查看 [Google Assistant SDK](/home-assistant/integrations/google_assistant_sdk) 集成。

## 通过 Home Assistant Cloud 自动设置

使用 [Home Assistant Cloud](/home-assistant/cloud/)，您只需简单点击几下即可将 Home Assistant 实例连接到 Google Assistant。使用 Home Assistant Cloud，您无需处理动态 DNS、SSL 证书或在路由器上开放端口。只需通过用户界面登录，即可与云端建立安全连接。Home Assistant Cloud 在 30 天免费试用后需要付费订阅。

对于 Home Assistant Cloud 用户，可以在[此处](https://www.nabucasa.com/config/google_assistant/)找到文档。

## 手动设置（如果您没有 Home Assistant Cloud）

由于 Google 要求设置 Assistant App 的方式，Google Assistant 集成（没有 Home Assistant Cloud）比大多数集成需要更多的设置。

### 前提条件

要使用 Google Assistant，您的 Home Assistant 配置必须[可通过主机名和 SSL 证书从外部访问](/home-assistant/docs/configuration/remote/)。

- 如果您尚未配置，应在继续之前进行配置。
- 如果您进行 DNS 更改来实现这一点，请确保已允许最多 48 小时让 DNS 更改传播，否则 Google 可能无法访问您的服务器。
- 一旦您确认可以从家庭网络外部访问 Home Assistant，您就可以设置 Google 集成：

### Google Cloud Platform 配置

1. 在 [Google Developer Console](https://console.home.google.com/projects) 中创建一个新项目。
    1. 选择 **Create a Project**
    2. 在 **Get started** 页面，选择 **Create project**。
       - 为您的项目命名并选择 **Create project**。
    3. 保存您的项目 ID（位于主项目名称下方）以备后用。
    4. 选择 **Add a Cloud-to-Cloud integration**。
    5. 在右下角，选择 **Next: Develop**，然后选择 **Next: Setup**。
    6. 选择所有适用的设备类型（您可以选择全部）。
    7. 创建一个 144 x 144 像素的应用图标并上传。
    8. 在 **Account Linking** 下，在 **OAuth Client ID** 字段中输入 `https://oauth-redirect.googleusercontent.com/r/[YOUR_PROJECT_ID]`。
    9. 将 `[YOUR_PROJECT_ID]` 替换为您上面的项目 ID。
    10. 填写详细信息：
        - 在 **Client Secret** 字段中，添加任意字符串（不含特殊字符）。Home Assistant 不需要此字段。
        - 在 **Authorization URL** 字段中，输入 `https://[yourdomain:port]/auth/authorize`。
        - 在 **Token URL** 字段中，输入 `https://[yourdomain:port]/auth/token`。
        - 在 **Cloud fulfillment URL** 字段中，输入 `https://[yourdomain:port]/api/google_assistant`。
        - 目前，跳过 **Local fulfillment** 和 **App Flip**。
        - 在 **Scope(s)** 下，输入 `email`。选择 **Add scope** 并输入 `name`。
        - 保持复选框 **Have Google transmit Client ID and secret via HTTP basic auth header** 未选中/清除。
        - 选择 **Save**。
          - **结果**：您将看到项目已保存，状态为 **Draft**。
          - 您不需要进行测试。

2. 在项目左侧菜单中，选择 **Analytics** 链接。
   - 选择左上角的汉堡 `[mdi:hamburger-menu]` 菜单并选择 **APIs and Services**。
3. 启用设备同步（[详见下文](#utilize-device-sync)）。
    1. 在左侧菜单中，选择 **Credentials**。
    2. 在 **Credentials** 视图中，选择 **Create credentials**，然后选择 **Service account**。
        1. **Service account name**：为您的账户指定一个自定义名称。
        2. 选择 **Create and Continue**。
        3. 在 **Select a role** 下，选择 **Service Accounts** > **Service Account Token Creator**。
        4. 选择 **Continue**，然后选择 **Done**。
    3. 在 **Service Accounts** 下，现在应该有一个名为 [步骤 3.2.1 的名称]@[项目名称].iam.gserviceaccount.com 的账户。
    4. 选择该服务账户的铅笔按钮。
    5. 转到 **Keys** 并选择 **Add key**。
    6. 创建 JSON 格式的私钥。
    7. 这将开始下载 JSON 文件。
        1. 将文件重命名为 `SERVICE_ACCOUNT.json`。
        2. 在 Home Assistant 中，将此文件添加到您的配置文件夹。这与您的 "`configuration.yaml`" 所在的文件夹相同。
    8. 在 Google Cloud 导航栏中，选择 **放大镜** 图标，搜索 **Homegraph API**，然后选择它。
    9. 启用 HomeGraph API。

4. 将 `google_assistant` 集成配置添加到您的 "`configuration.yaml`" 文件中，并按照下面的[配置指南](#yaml-configuration)重启 Home Assistant。
5. 在 Google Home 应用中添加服务（注意应用版本可能略有不同）。
    1. 打开 Google Home 应用。
    2. 选择底部的设备选项卡，并选择右下角的 `+ Add` 按钮。
    3. 在 **Choose a device** 屏幕中，选择 **Works with Google Home**。您应该会在 **Add new** 下看到列出的 `[test] <Action Name>`。选择它应该会将您带到浏览器登录您的 Home Assistant 实例，然后重定向回一个屏幕，您可以在其中为设备设置房间和昵称（如果您愿意）。

:::important
如果您已将 Home Assistant 添加到手机的主屏幕，您必须先将其从主屏幕移除。否则，此 HTML5 应用将显示而不是浏览器。使用它将阻止 Home Assistant 重定向回 Google Home 应用。

:::
### 允许其他用户

如果您想允许其他家庭成员控制设备：

1. 在 [Google Developer Console](https://console.home.google.com/projects) 中打开您创建的项目。
2. 在页面顶部选择 **Members**。这将重定向到 Google Cloud Platform IAM 权限页面。
3. 在页面中间选择 **Grant access**。
    1. 输入您想添加的用户的电子邮件地址。
    2. 选择 **Select a role** 并选择 **Project** > **Viewer**。
    3. 选择 **Save**。
    4. 复制项目链接（`https://console.home.google.com/projects/YOUR_PROJECT_ID`）并与新用户分享。
4. 让新用户使用自己的 Google 账户打开链接，同意 **Terms of Service** 弹窗。
5. 让新用户转到其 **Google Assistant** 应用，将 `[test] your app name` 添加到其账户。

### 使用设备同步

您现在可以支持向 Google 服务器主动报告状态（配置选项 `report_state`）并将 Home Assistant 设备与 Google Home 应用同步（`google_assistant.request_sync` 服务）。

尝试说 "OK Google, sync my devices" - Google Home 应用应该会导入您公开的 Home Assistant 设备，并提示您将它们分配到房间。

### 启用本地执行

Google Assistant 设备可以在本地向 Home Assistant 发送命令，从而更快地响应。

您的 Home Assistant 实例需要与您正在对话的 Google Assistant 设备连接到同一网络，以便可以通过 mDNS 发现（UDP 广播）发现它。

您的 Google Assistant 设备仍将通过互联网进行通信以：

- 获取凭据以建立本地连接。
- 发送涉及[安全设备](#secure-devices)的命令。
- 如果本地执行失败，发送命令。

:::important
[HTTP 集成](/home-assistant/integrations/http) 必须**不**配置为使用带有 [`ssl_certificate` 选项](/home-assistant/integrations/http/#ssl_certificate) 的 SSL 证书。

这是因为 Google Assistant 设备将直接连接到您的 Home Assistant 实例的 IP，如果遇到无效的 SSL 证书则会失败。

对于安全的远程访问，请使用反向代理，如 [NGINX SSL](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_nginx_proxy) 应用（以前称为 NGINX SSL 插件），而不是将外部流量直接定向到 Home Assistant。

:::
1. 在 [Google Developer Console](https://console.home.google.com/projects) 中打开您创建的项目。
2. 展开左侧的 **Cloud-to-cloud** 菜单并选择 **Develop**，然后选择您的集成旁边的 **Edit**。
3. 向下滚动并启用 **Local fulfillment**
4. 上传 JavaScript 文件
   1. 从[此处](https://github.com/NabuCasa/home-assistant-google-assistant-local-sdk/releases/latest)下载 `app.js`
   2. 选择 **Upload your JavaScript targeting Node** 并上传步骤 4.1 中的 `app.js`。
   3. 选择 **Upload your JavaScript targeting Chrome (browser)** 并上传步骤 4.1 中相同的 `app.js`。
5. 勾选 **Support local queries**。
6. 添加设备扫描配置：
   1. 如果没有配置，选择 **+ Add scan configuration**。
   2. 对于 Discovery protocol 选择 **mDNS**。
   3. 将 **Enter mDNS service name** 设置为 `_home-assistant._tcp.local`
   4. 选择 **Add field**，然后在 **Select a field** 下选择 **Name**。
   5. 输入一个新的 **Value** 字段设置为 `.*\\._home-assistant\\._tcp\\.local`
7. 滚动到页面底部并 **Save** 您的更改。
8. 等待 30 分钟，或重启所有 Google Assistant 设备。
9. 重启 Home Assistant Core。
10. 使用 Google Assistant 设备，尝试说 "OK Google, sync my devices。" 这有助于避免问题，特别是如果您在添加云端 Google Assistant 支持一段时间后才启用本地执行。

您可以按照[这些说明](https://developers.home.google.com/local-home/test#debugging_from_chrome)调试设置。

### YAML 配置

现在将您的设置添加到 "`configuration.yaml`" 文件中，例如：

```yaml
# 示例 configuration.yaml 条目
google_assistant:
  project_id: YOUR_PROJECT_ID
  service_account: !include SERVICE_ACCOUNT.json
  report_state: true
  exposed_domains:
    - switch
    - light
  entity_config:
    switch.kitchen:
      name: CUSTOM_NAME_FOR_GOOGLE_ASSISTANT
      aliases:
        - BRIGHT_LIGHTS
        - ENTRY_LIGHTS
    light.living_room:
      expose: false
      room: LIVING_ROOM
```

```yaml
project_id:
  description: Actions on Google 控制台中的项目 ID（看起来像 `words-2ab12`）
  required: true
  type: string
secure_devices_pin:
  description: "当您想与安全设备交互时需要说的 PIN 码。"
  required: false
  type: string
  default: ""
service_account:
  description: 服务账户信息。您可以使用 include 语句包含下载的 JSON 文件，在此处直接输入数据，或使用 secrets 文件填充。
  required: true
  type: map
  keys:
    private_key:
      description: PEM 格式的私钥
      required: true
      type: string
    client_email:
      description: 服务电子邮件地址
      required: true
      type: string
report_state:
  description: 主动报告实体的状态变化。这加快了影响多个实体的动作的响应时间，因为 Google Assistant 事先知道它们处于什么状态。视觉控件上的某些功能也需要它。
  required: false
  default: false
  type: boolean
expose_by_default:
  description: "默认情况下公开所有支持域中的设备。如果设置了 `exposed_domains` 域，则默认只公开这些域。如果 `expose_by_default` 设置为 false，则必须在 `entity_config` 中手动公开设备。"
  required: false
  default: true
  type: boolean
exposed_domains:
  description: 如果 `expose_by_default` 设置为 true，则向 Google Assistant 公开的实体域列表。如果 `expose_by_default` 设置为 false，则此选项无效。
  required: false
  type: list
entity_config:
  description: Google Assistant 的实体特定配置
  required: false
  type: map
  keys:
    YOUR_ENTITY_ID:
      description: 要配置的实体
      required: false
      type: map
      keys:
        name:
          description: 在 Google Assistant 中显示的实体名称
          required: false
          type: string
        expose:
          description: 强制公开/排除实体。
          required: false
          type: boolean
          default: true
        aliases:
          description: 也可用于引用此实体的别名
          required: false
          type: list
        room:
          description: 允许将此设备关联到 Google Assistant 中的房间。
          required: false
          type: string
```

### 可用域

目前，以下域可与 Google Assistant 一起使用，列出了它们的默认类型：

- alarm_control_panel（布防/撤防）
- binary_sensor（设备类为 `carbon_monoxide`、`door`、`garage_door`、`lock`、`moisture`、`opening`、`smoke`、`window` 的实体）
- button（场景）
- camera（流媒体，需要兼容的摄像头）
- climate（开/关、温度设置、hvac_mode）
- cover（开/关/设置位置/停止/启动=切换遮盖）
- event（仅支持设备类为 `doorbell` 的实体）
- fan（开/关/速度百分比/预设模式）
- group（开/关）
- humidifier（湿度设置/开/关/模式）
- input_boolean（开/关）
- input_button（场景）
- input_select（选项/设置/模式/值）
- light（开/关/亮度/RGB颜色/色温）
- lawn_mower（停靠/启动/暂停）
- lock
- media_player（开/关/设置音量（通过设置音量）/源（通过设置输入源）/控制播放）
- scene
- script（场景）
- select
- sensor（设备类为 `aqi`、`carbon_dioxide`、`carbon_monoxide`、`humidity`、`pm10`、`pm25`、`temperature`、`volatile_organic_compounds` 的实体）
- switch（开/关）
- vacuum（停靠/启动/停止/暂停）
- valve（打开/关闭/设置位置/停止/启动=切换阀门）
- water_heater（开-关/温度设置/操作模式）

:::note
某些设备可能在 Google Home 应用中无法正确显示，例如 media_player，但语音命令仍然有效。

:::
### 安全设备

某些设备被视为安全设备。这包括 `lock` 域、`alarm_control_panel` 域中的设备，以及设备类型为 `door`、`garage` 或 `gate` 的 `covers`。

默认情况下，除非设置了 `secure_devices_pin` 码，否则 Google Assistant 无法打开安全设备。要允许打开，请将 `secure_devices_pin` 设置为某个值。然后，打开设备时系统会提示您说出 PIN 码。关闭或锁定这些设备不需要 PIN 码。

如果为报警控制面板设置了代码，它必须与 `secure_devices_pin` 相同。如果 `code_arm_required` 设置为 `false`，系统将在不提示输入 PIN 码的情况下布防。

### 房间/区域支持

未明确分配到房间但已放置在 Home Assistant 区域中的实体将向 Google 返回房间提示，其中包含这些区域中的设备。

:::note
某些设备，如 `scene` 或 `script`，必须分配到 `area`，然后共享 Google Home 家庭的其他成员才能使用它们。这是因为共享 Google Home 中的家庭成员将无法查看未分配到房间的设备，_除非_ 他们是将服务链接到 Google Home 的用户。此问题不会立即显现，因为 `script` 和 `scene` 设备在 Google Home 主仪表板中不可见。

当您的 Google 账户中设置了多个住宅时，自动房间分配将不起作用。

:::
### Climate 操作模式

Home Assistant 和 Google Assistant 的可用操作模式并非一一对应。
以下是当前可用的模式：

- off
- heat
- cool
- heatcool（auto）
- fan-only
- dry
- eco

### 电视频道

Home Assistant 中没有电视频道对象。电视频道只能通过数字更改，不能通过名称更改（例如，`Turn to channel two`）。

### 故障排除

#### 请求同步时的 404 错误

一段时间后（可能大约 30 天），从 Google Assistant 同步可能会失败，因为您的 Actions on Google 应用技术上处于测试模式，从未发布。最终，测试似乎会过期。设备控制将继续工作，但同步可能不行。如果您说 "Ok Google, sync my devices" 并收到响应 "Unable to sync Home Assistant"（或您命名的任何项目名称），通常可以通过返回 [Actions on Google 控制台](https://console.actions.google.com/) 中的测试应用并点击 `TEST` 下的 `Simulator` 来解决。重新生成草稿版本测试应用，然后再次尝试让 Google 同步您的设备。如果重新生成草稿不起作用，请返回 `Action` 部分，只需按 URL 的 `enter` 键即可重新创建预览。

从 Home Assistant 同步将始终有效，并自动更新实体更改。

`request_sync` 服务要求来自 Google 的初始同步包含 `agent_user_id`。如果不包含，服务将记录一个错误，内容类似于 "Request contains an invalid argument"。如果发生这种情况，请从 Home Control [取消链接账户](https://support.google.com/googlenest/answer/7126338)并重新链接。

如果 HomeGraph API 的 `project_id` 与 [Actions on Google 控制台](https://console.actions.google.com) 上项目首选项中的 Actions SDK 的 `project_id` 不同，`request_sync` 服务可能会失败并显示 404。解决方法：

  1. 从 [Google Cloud API Console](https://console.cloud.google.com) 删除您的项目。
  2. 向 [Actions on Google 控制台](https://console.actions.google.com) 添加新项目。在这里您将获得一个新的 `project_id`。
  3. 按照前面提到的 [Actions on Google 控制台] 设置说明操作，直到创建 `service_account` 的步骤。
  4. 一旦开始在 [Google Cloud API Console] 中创建新的 `service_account`，请确保通过验证 `project_id` 选择在 [Actions on Google 控制台] 中创建的项目。
  5. 为新项目启用 HomeGraph API。

验证 Google Assistant 在 `https://[YOUR HOME ASSISTANT URL:PORT]/api/google_assistant` 上可用。如果正常工作，在浏览器或通过 curl 打开时应返回 `405: Method Not Allowed`。

#### 请求同步时的 403 错误

如果未启用 HomeGraph API，`request_sync` 动作可能会失败并显示 403。转到 [Google API Console](https://console.cloud.google.com/apis/api/homegraph.googleapis.com/overview) 并验证您的项目已启用 HomeGraph API。

#### 报告状态时的 404 错误

如果您在日志中收到与报告状态相关的 404 错误，则 Home Assistant 正在报告从未同步到 Google 的实体的状态。让您的 Google Home `Sync my devices` 或运行 `google_assistant.request_sync` 动作。

#### 链接期间出错："Could not update the setting. Please check your connection"

您的 fulfillment URL 可能无效或无法访问。重新检查 [手动设置](#manual-setup-if-you-dont-have-home-assistant-cloud) 中指定的 `Fulfillment URL` 并验证其可公开访问。

#### 请求同步时的 500 / 429 错误

如果服务密钥无效，可能会发生此错误。尝试删除并创建新的服务账户和密钥。

#### NGINX

使用 NGINX 时，请确保您的 `proxy_pass` 行 _没有_ 尾随 `/`，因为这会导致错误。您的行应如下所示：

    proxy_pass http://localhost:8123;

### 取消链接并重新链接

如果您在取消链接服务后遇到 _Account linking failed_ 问题，请尝试清除浏览器历史记录和缓存。

### 链接失败 - Could not update the setting. Please check your connection

如果您在链接账户时遇到问题，登录 Home Assistant 实例后出现错误消息 `Could not update the setting. Please check your connection`，请尝试设置 `expose_by_default: false`，然后公开一个简单的设备（最好是灯或开关）。如果遇到问题，还值得检查是否禁用了任何家庭广告拦截器。