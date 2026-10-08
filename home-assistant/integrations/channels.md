# Channels

**Channels** 集成允许您从 Home Assistant 控制 [Channels](https://getchannels.com/)。可以在网络上运行的 Channels 实例上播放、暂停、快进或跳过广告。

您喜爱的频道将作为源显示在 Home Assistant 的源列表中。

## 配置

要将 Channels 添加到您的系统，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
media_player:
  - platform: channels
    name: Family Room Channels
    host: 192.168.1.50
```

```yaml
host:
  description: 运行 Channels 的设备 IP 地址，例如 192.168.1.50。
  required: true
  type: string
port:
  description: Channels 可访问的端口。
  required: false
  default: 57000
  type: integer
name:
  description: Channels 实例在 Home Assistant 中的名称，例如 Family Room Channels。
  required: false
  default: Channels
  type: string
```

### 动作 `seek_forward`

按 Channels 实例设置中当前设置的秒数向前快进。

| 数据属性 | 可选 | 描述                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `entity_id`            | 否       | 指向 Channels 应用 `entity_id` 的字符串。 |

### 动作 `seek_backward`

按 Channels 实例设置中当前设置的秒数向后快退。

| 数据属性 | 可选 | 描述                                        |
| ---------------------- | -------- | -------------------------------------------------- |
| `entity_id`            | 否       | 指向 Channels 应用 `entity_id` 的字符串。 |

### 动作 `seek_by`

按指定的秒数向前或向后快进。

| 数据属性 | 可选 | 描述                                                                     |
| ---------------------- | -------- | ------------------------------------------------------------------------------- |
| `entity_id`            | 否       | 指向 Channels 应用 `entity_id` 的字符串。                              |
| `seconds`              | 否       | 要在时间轴上快进的秒数。负数表示向后快退。 |
