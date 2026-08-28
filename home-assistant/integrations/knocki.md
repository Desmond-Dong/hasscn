# Knocki

**Knocki** 集成可让您只需在普通表面上敲击自定义模式（例如连敲三下），就触发自己喜欢的自动化。

## 前提条件

* 您必须拥有一台 [Knocki 设备](https://knocki.com/)。

* 您需要在 **Knocki** 移动应用中完成设置流程，具体见下方步骤 1-7。

1. 打开 Knocki 移动应用。您可以在 [iOS](https://apps.apple.com/app/id1238395440) 和 [Android](https://play.google.com/store/apps/details?id=com.knocki.mobileapp) 免费下载。
2. 使用应用登录，或创建新的 Knocki 账户。
3. 在应用首页中，选择一个 Knocki，或[添加一个 Knocki](https://support.knocki.com/hc/articles/12769368448659)。
4. 在应用的设备页面中，选择一个手势，或[添加一个手势](https://support.knocki.com/hc/articles/360013333634)。
5. 接着选择[添加任务](https://support.knocki.com/hc/articles/12920956118291)。
6. 向下滚动任务菜单并选择 Home Assistant。
7. 按照应用内说明添加 Home Assistant 任务。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 自动化示例

1. 前往 [**Settings** > **Automations & scenes**](https://my.home-assistant.io/redirect/automations/)，然后在右下角选择 **Create Automation**。
2. 选择 **Create new automation**。
3. 选择 **Add Trigger**，并将触发器类型设为 **Entity**。
   * 搜索任务名称（即您在 Knocki 应用中设置的名称），然后选择附带该名称的实体。
   * 将实体变化类型设为 **State**。
4. 选择 **Add action**，然后添加您希望该自动化触发的操作。
5. 最后，通过敲击对应的手势模式来测试该操作。
