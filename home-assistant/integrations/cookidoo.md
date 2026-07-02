# Cookidoo

**Cookidoo** 集成允许您在 Home Assistant 中与 [Cookidoo Thermomix 官方食谱平台](https://cookidoo.international/)的购物清单进行交互。

```yaml
Email:
    description: "输入与您的 Cookidoo 关联的电子邮箱地址。"
Password:
    description: "输入您的 Cookidoo 账户密码。"
Localization:
    description: "选择您的 Cookidoo 账户的语言和国家（例如 English - United States）。"
```

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 待办事项列表

此集成提供两个不可排序的待办事项列表：

1. **购物清单**
   * 包含食谱中的食材
   * 项目只能被`勾选`
   * 项目不能被`创建`、`删除`或`重命名`

2. **额外购买**
   * 包含用户添加的购买项目
   * 项目可以被`创建`、`删除`和`更新`
   * 项目没有`描述`字段

例如，如果您添加一个意大利面食谱，像"500g 意大利面"和"2 个番茄"这样的食材将出现在您的"购物清单"中。您可以在购物时勾选这些项目，但不能修改标签。

相比之下，在您的"额外购买"列表中，您可以自由添加像"厨房纸巾"或"洗洁精"这样的项目，并根据需要进行修改或删除。

## 按钮实体

*清除购物清单* 按钮实体允许您清除购物清单和额外购买列表，反映 Cookidoo 应用中可用的功能。触发时，此按钮将从两个列表中删除所有项目。

添加集成后，此按钮实体将自动出现在您的 Home Assistant 实例中。您可以在自动化中使用它，或使用按钮卡片将其添加到仪表板。

## 日历

此集成提供膳食计划日历实体。每个事件都是全天事件，摘要对应那天计划的膳食。

## 传感器实体

### 诊断

1. **订阅**
   * 状态：`premium`、`trial` 或 `free`
   * 描述：指示当前订阅类型
     * `premium`：年度订阅，可完全访问食谱
     * `trial`：限时高级访问（在创建账户或链接新设备期间可用）
     * `free`：有限的食谱访问，完整的购物清单功能

2. **订阅到期日期**
   * 状态：ISO 8601 时间戳或 `unknown`
   * 描述：显示当前订阅何时到期
     * 对于 `premium` 和 `trial` 订阅：到期日期的时间戳
     * 对于 `free` 订阅：返回 `unknown` 状态

添加集成后，这些传感器实体将自动出现在您的 Home Assistant 实例中。

<details>
<summary>示例状态属性</summary>

```yaml
subscription:
  state: premium
  icon: mdi:account-star

subscription_expiration_date:
  state: "2025-01-15T23:59:59+00:00"
  icon: mdi:clock-reactivate
```

</details>

## 已知限制

:::important
由于 Cookidoo 无法在账户之间共享购物清单，并且与其交互的每个人都使用相同的凭据，请确保相应地保护您的凭据。您的 Home Assistant 实例的所有用户都将访问同一个 Cookidoo 账户。

:::
Home Assistant 待办事项列表界面允许重命名项目和更改其状态。但是，对于"购物清单"，仅支持状态更改（勾选/取消勾选项目）。任何重命名项目的尝试都不会被保存。

## 数据更新

Cookidoo 集成默认每 90 秒从设备获取一次数据。

## 移除集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
