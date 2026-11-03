# Counter

**计数器（Counter）** 集成可用于统计自动化被触发的次数。

## 配置

配置计数器助手的首选方式是通过用户界面。要添加一个，请前往
**[设置 > 设备与服务 > 助手](https://my.home-assistant.io/redirect/helpers/)** 并点击添加按钮；
然后选择 **[Counter（计数器）](https://my.home-assistant.io/redirect/config_flow_start/?domain=counter)** 选项。

为了能够通过用户界面添加**助手**，您的 "`configuration.yaml`" 中应该有
`default_config:`，默认情况下它应该已经在那里，除非您删除了它。如果您从配置中删除了 `default_config:`，必须先在 "`configuration.yaml`" 中添加 `counter:`，
然后才能使用 UI。

您也可以通过 "`configuration.yaml`" 配置计数器：

```yaml
# 示例 configuration.yaml 条目
counter:
  my_custom_counter:
    initial: 30
    step: 1
```

```yaml
"[alias]":
  description: 计数器的别名。允许多个条目。`alias` 应由用户替换为其实际值。
  required: true
  type: map
  keys:
    name:
      description: 计数器的友好名称。
      required: false
      type: string
    initial:
      description: Home Assistant 启动或计数器重置时的初始值（0 或正整数）。
      required: false
      type: integer
      default: 0
    restore:
      description: 当 Home Assistant 启动时尝试恢复最后已知的值。
      required: false
      type: boolean
      default: true
    step:
      description: 计数器的增量/步进值。
      required: false
      type: integer
      default: 1
    minimum:
      description: 计数器允许的最小值。
      required: false
      type: integer
    maximum:
      description: 计数器允许的最大值。
      required: false
      type: integer
    icon:
      description: 计数器显示的图标。
      required: false
      type: icon
```

从 [Material Design Icons](https://pictogrammers.com/library/mdi/) 中选择一个图标用于您的输入，并在名称前加上 `mdi:` 前缀。例如 `mdi:car`、`mdi:ambulance` 或 `mdi:motorbike`。

### 恢复状态

只要实体的 `restore` 设置为 `true`（默认值），此集成就会在 Home Assistant 启动时自动恢复停止前的状态。要禁用此功能，请将 `restore` 设置为 `false`。

如果 `restore` 设置为 `true`，则 `initial` 值仅在找不到之前的状态或计数器重置时使用。

## 动作

可用动作：`increment`、`decrement`、`reset` 和 `set_value`。

### 动作：递增

`counter.increment` 动作允许您将计数器增加 1 或给定的步进值。

| 数据属性 | 可选 | 描述                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `entity_id`            | 否       | 要执行动作的实体名称，例如 `counter.my_custom_counter`。 |

### 动作：递减

`counter.decrement` 动作允许您将计数器减少 1 或给定的步进值。

| 数据属性 | 可选 | 描述                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `entity_id`            | 否       | 要执行动作的实体名称，例如 `counter.my_custom_counter`。 |

### 动作：重置

`counter.reset` 动作允许您将计数器重置为其初始值。

| 数据属性 | 可选 | 描述                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `entity_id`            | 否       | 要执行动作的实体名称，例如 `counter.my_custom_counter`。 |

### 动作：设置值

`counter.set_value` 动作允许您将计数器设置为特定值。

| 数据属性 | 可选 | 描述                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `entity_id`            | 否       | 要执行动作的实体名称，例如 `counter.my_custom_counter`。 |
| `value`                | 是       | 将计数器设置为给定值。                                   |

### 使用动作

前往 [**设置** > **开发者工具** > **动作**](https://my.home-assistant.io/redirect/developer_services/)。在 **领域** 列表中选择 **counter**，再选择 **动作**，然后在 **数据** 字段中输入类似下面的示例，最后选择 **执行动作**。

```json
{
  "entity_id": "counter.my_custom_counter"
}
```

## 示例

### 计算 Home Assistant 错误

要使用计数器计算 Home Assistant 捕获的错误，您需要在 "`configuration.yaml`" 中添加 `fire_event: true`，如下所示：

```yaml
# 示例 configuration.yaml 条目
system_log:
  fire_event: true
```

### 错误计数 - 示例配置

```yaml
# 示例 configuration.yaml 条目
automation:
- alias: "错误计数自动化"
  triggers:
    - trigger: event
      event_type: system_log_event
      event_data:
        level: ERROR
  actions:
    - action: counter.increment
      target:
        entity_id: counter.error_counter
    
counter:
  error_counter:
    name: Errors
    icon: mdi:alert  
```
