---
title: Google Sheets
description: 关于如何在 Home Assistant 中使用 Google Sheets 的说明。
ha_category:
  - Utility
ha_iot_class: Cloud Polling
ha_release: '2022.10'
ha_config_flow: true
ha_domain: google_sheets
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
google_dev_console_link: https://console.developers.google.com/start/api?id=drive
api: Google Drive API
api_link: https://console.developers.google.com/start/api?id=drive
api2: Google Sheets API
api2_link: https://console.cloud.google.com/apis/enableflow?apiid=sheets.googleapis.com
---

**Google Sheets** 集成允许您将 [Google Drive](https://drive.google.com) 连接到 Home Assistant。该集成添加了一个动作，允许您向 Sheets 文档追加行。其思想是您可以在那里存储数据以供进一步处理。当您设置配置条目时，您的云端硬盘将有一个名为 Home Assistant 的新表格。然后您可以将其重命名为您喜欢的任何名称。

**注意**：
该集成目前只能访问在设置期间创建的那一个文档。

## 前提条件

您需要配置开发者凭据以允许 Home Assistant 访问您的 Google 账户。
这些凭据与 [Nest](/home-assistant/integrations/nest)、[YouTube](/home-assistant/integrations/youtube) 和 [Google Mail](/home-assistant/integrations/google_mail) 的凭据相同。
这些与之前为 [Google Calendar](/home-assistant/integrations/google) 推荐的 *Device Auth* 凭据不同。


### 场景 1：您已有凭据

这种情况下，您只需要启用 API：

1. 前往 Google Developers Console 中的 [Google Drive API](https://console.developers.google.com/start/api?id=drive) 和 [Google Sheets API](https://console.cloud.google.com/apis/enableflow?apiid=sheets.googleapis.com)。
2. 确认项目后，为 API 选择 **启用**。
3. 继续按照[配置](#configuration)部分中的步骤操作。

### 场景 2：您尚未设置凭据

这种情况下，您需要先生成客户端密钥：

<details>
<summary>生成客户端编号和客户端密钥</summary>

本节说明如何在 [Google Developers Console](https://console.developers.google.com/start/api?id=drive) 中生成客户端 ID 和客户端密钥。

1. First, go to the Google Developers Console to enable [Google Drive API](https://console.developers.google.com/start/api?id=drive) and [Google Sheets API](https://console.cloud.google.com/apis/enableflow?apiid=sheets.googleapis.com).
2. Select **Create project**, enter a project name, and select **Create**.
3. Enable Google Drive API.
4. Navigate to **APIs & Services** > [Credentials](https://console.cloud.google.com/apis/credentials).
5. In the left sidebar, select **OAuth consent screen**.
6. Complete the app information and create the consent screen.
7. Under **Publishing status** > **Testing**, select **Publish app**.
8. In the left sidebar, select **Clients** and create a **Web application** client.
9. Add `https://my.home-assistant.io/redirect/oauth` to **Authorized redirect URIs** and select **Create**.
10. Copy the **Client ID** and **Client Secret** before closing the dialog.

</details>


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

随后，集成设置流程会引导您输入[应用程序凭据](/home-assistant/integrations/application_credentials/)，并授权 Home Assistant 连接到 Google Sheets。

<details>
<summary>账户授权步骤</summary>

1. Continue through the steps of selecting the account you want to authorize.
2. You may get a message telling you that the app has not been verified and that you need to acknowledge it to proceed.
3. Review what Home Assistant is requesting access to, then select **Continue**.
4. When the page displays **Link account to Home Assistant?**, confirm that **Your instance URL** is correct, then select **Link Account**.
5. You can close the window and return to Home Assistant, where you should see a **Success!** message.

</details>

## 故障排除

如果您的凭据出现错误，可以在[应用程序凭据](/home-assistant/integrations/application_credentials/)用户界面中删除它们。

### 视频教程

此视频教程说明了如何设置 Google Sheets 集成以及如何将数据从 Home Assistant 添加到 Google Sheet。

<lite-youtube videoid="hgGMgoxLYwo" videotitle="How to use Google Sheets in Home Assistant - TUTORIAL" posterquality="maxresdefault"></lite-youtube>

### 动作：追加表格

`google_sheets.append_sheet` 动作允许您向设置时创建的 Sheets 文档添加数据行。

<details>
<summary>动作详情</summary>


| 数据属性 | 可选 | 描述 | 示例 |
| ---------------------- | -------- | ----------- | --------|
| `config_entry` | 否 | 要使用的配置条目。 |
| `worksheet` | 是 | 工作表名称。默认为文档中的第一个。 | Sheet1 |
| `add_created_column` | 是 | 向要追加的数据添加包含日期时间的 `created` 列。默认为 True。 | True |
| `data` | 否 | 要追加到工作表的数据。这将把数据放在新行中，每列一个值。 | {"hello": world, "cool": True, "count": 5} |


```yaml
# 示例动作
action: google_sheets.append_sheet
data:
  config_entry: 1b4a46c6cba0677bbfb5a8c53e8618b0
  worksheet: "Car Charging"
  add_created_column: false
  data:
    Date: "{{ now().strftime('%-d-%b-%y') }}"
    KWh: "{{ states('input_number.car_charging_kwh')|float(0) }}"
    Cost: "{{ states('input_number.car_charging_cost')|float(0) }}"

# 多行示例动作
action: google_sheets.append_sheet
data:
  config_entry: 1b4a46c6cba0677bbfb5a8c53e8618b0
  worksheet: "Car Charging"
  data:
    - Item: "Car 1 cost"
      Cost: "{{ states('input_number.car_1_charging_cost')|float(0) }}"
    - Item: "Car 2 cost"
      Cost: "{{ states('input_number.car_2_charging_cost')|float(0) }}"
```


</details>


### 动作：获取表格

您可以使用 `google_sheets.get_sheet` 动作从 Sheets 文档中检索[数据](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data)行。

<details>
<summary>动作详情</summary>


| 数据属性 | 可选 | 描述 | 示例 |
| ---------------------- | -------- | ----------- | --------|
| `config_entry` | 否 | 要使用的配置条目。 |
| `worksheet` | 是 | 工作表名称。默认为文档中的第一个。 | Sheet1 |
| `rows` | 否 | 从工作表末尾返回的最大行数。  | 2 |


```yaml
# 示例动作
action: google_sheets.get_sheet
data:
  config_entry: 1b4a46c6cba0677bbfb5a8c53e8618b0
  worksheet: "Car Charging"
  rows: 2
```


</details>


<details>
<summary>动作响应示例</summary>


```yaml
range:
  - - 04/07/2024
    - 9 Kw
  - - 05/07/2024
    - 8 Kw
```


</details>
