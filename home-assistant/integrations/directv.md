# DirecTV

**DirecTV** 集成允许您控制 [DirecTV](https://www.directv.com) 接收器及其客户端设备。

## 要求

为了与 Home Assistant 正确集成，您的 DirecTV 设备设置应允许"外部访问"。

这可以通过 **菜单** > **设置与帮助** > **设置** > **全屋** > **外部设备** 中的一系列设置完成：

* 外部访问：允许
* 当前节目：允许
* 录制：允许

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 操作

### 媒体控制操作

可用操作：turn\_on、turn\_off、media\_play、media\_pause、media\_stop、media\_next\_track、media\_previous\_track、play\_media

#### 操作 `media_player.play_media`

| 数据属性 | 可选 | 描述                                                                                                                                                            |
| -----------------------| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            |      是 | 指定特定的媒体播放器。默认为所有。                                                                                                                       |
| `media_content_id`     |       否 | 要切换到的频道号。                   |
| `media_content_type`   |       否 | 媒体类型。必须为 `channel`。

## 遥控器

DirecTV 遥控器平台允许您向 DirecTV 接收器发送遥控按钮命令。当配置 DirecTV 接收器时会自动设置。

目前支持以下按钮：

* `power`
* `poweron`
* `poweroff`
* `format`
* `pause`
* `rew`
* `replay`
* `stop`
* `advance`
* `ffwd`
* `record`
* `play`
* `guide`
* `active`
* `list`
* `exit`
* `back`
* `menu`
* `info`
* `up`
* `down`
* `left`
* `right`
* `select`
* `red`
* `green`
* `yellow`
* `blue`
* `chanup`
* `chandown`
* `prev`
* `0`
* `1`
* `2`
* `3`
* `4`
* `5`
* `6`
* `7`
* `8`
* `9`
* `dash`
* `enter`

按下多个按钮的典型操作如下所示。

```yaml
action: remote.send_command
target:
  entity_id: remote.directv_entity
data:
  command:
    - left
    - left
    - menu
    - select
```
