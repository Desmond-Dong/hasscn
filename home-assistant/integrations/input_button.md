# Input button

**Input button** 辅助集成允许您定义可通过用户界面按下的按钮，并可用于触发事物，如自动化。

## 配置

配置按钮辅助工具的首选方式是通过用户界面。
要添加一个，请转到 **[**设置** > **设备与服务** > **辅助工具**](https://my.home-assistant.io/redirect/helpers/)** 并点击添加按钮；然后选择 **[按钮](https://my.home-assistant.io/redirect/config_flow_start/?domain=input_button)** 选项。

要通过用户界面添加 **辅助工具**，您的 "`configuration.yaml`" 中应该有 `default_config:`，除非您删除了它，否则默认情况下它应该已经存在。如果您从配置中删除了 `default_config:`，必须先将 `input_button:` 添加到您的 `configuration.yaml` 中，然后才能使用 UI。

输入按钮也可以通过 "`configuration.yaml`" 配置：

```yaml
# 示例 configuration.yaml 条目
input_button:
  ring_bell:
    name: 按门铃
    icon: mdi:bell
```

```yaml
input_button:
  description: 输入的别名。允许多个条目。
  required: true
  type: map
  keys:
    name:
      description: 输入的友好名称。
      required: false
      type: string
    icon:
      description: 在前端输入元素前显示的图标。
      required: false
      type: icon
```

## 自动化示例

`input_button` 实体是无状态的，即它不能像普通开关实体那样具有 `on` 或 `off` 状态。

每个输入按钮实体确实会跟踪上次在 Home Assistant UI 中按下输入按钮实体或通过服务调用按下的时间戳。

因为 Home Assistant 中输入按钮实体的状态是时间戳，这意味着我们可以在自动化中使用它。例如：

```yaml
triggers:
  - trigger: state
    entity_id: input_button.my_button
actions:
  - action: notify.frenck
    data:
      message: "我的按钮已被按下！"
```

## 动作

输入按钮实体公开一个动作：
[**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_call_service/?service=input_button.press)

此动作可用于触发该实体的按钮按下。

```yaml
- action: input_button.press
  target:
    entity_id: input_button.my_button
```
