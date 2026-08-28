# Keyboard Remote

接收来自键盘的信号，并将其当作遥控器使用。

此集成可让您将一个或多个键盘当作遥控器使用。它会触发 `keyboard_remote_command_received` 事件，随后您便可在自动化规则中使用这些事件。

该集成使用 `evdev` 软件包与键盘交互，因此仅适用于 Linux。这也意味着您不能直接拿平常使用的键盘来做这件事，因为 `evdev` 会独占并阻止其正常输入。

要启用 Keyboard Remote 集成，请将其添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
keyboard_remote:
  type: "key_up"
```

```yaml
type:
  description: 可用值为 `key_up`、`key_down` 和 `key_hold`。请注意，`key_hold` 会触发大量事件。该项也可以是类型列表。
  required: true
  type: string
emulate_key_hold:
  description: 在按键被按住时模拟 key hold 事件。（某些输入设备默认不会发送此类事件。）
  required: false
  type: boolean
  default: false
emulate_key_hold_delay:
  description: 发送第一个模拟 key hold 事件前等待的秒数。
  required: false
  type: float
  default: 0.250
emulate_key_hold_repeat:
  description: 发送后续模拟 key hold 事件前等待的秒数。
  required: false
  type: float
  default: 0.033
device_descriptor:
  description: 与该键盘对应的本地事件输入设备文件路径。
  required: false
  type: string
device_name:
  description: 键盘设备名称。
  required: false
  type: string
```

配置中必须包含 `device_name` 或 `device_descriptor` 之一。指定设备名称在设备反复断开和重新连接时会更有用（例如蓝牙键盘），因为本地输入设备文件路径可能会变化，从而导致配置失效，但设备名称通常保持不变。

如果存在多个同型号设备，则必须使用 `device_descriptor`。

如果在启动时找不到配置中指定的设备，调试日志中会列出可能的设备描述符和名称。

两个 Keyboard Remote 的完整配置示例如下：

```yaml
keyboard_remote:
- device_descriptor: '/dev/input/by-id/bluetooth-keyboard'
  type: "key_down"
  emulate_key_hold: true
  emulate_key_hold_delay: 0.25
  emulate_key_hold_repeat: 0.033
- device_descriptor: '/dev/input/event0'
  type:
    - 'key_up'
    - 'key_down'
```

或者，单个键盘也可以这样配置：

```yaml
keyboard_remote:
  device_name: "Bluetooth Keyboard"
  type: "key_down"
```

以下是一个让它真正发挥作用的自动化规则示例：

```yaml
automation:
  alias: "Keyboard all lights on"
  triggers:
    - trigger: event
      event_type: keyboard_remote_command_received
      event_data:
        device_descriptor: "/dev/input/event0"
        key_code: 107 # inspect log to obtain desired keycode
        type: key_down # only trigger on key_down events (optional)

  actions:
    - action: light.turn_on
      target:
        entity_id: light.all
```

您可以在触发器中指定 `device_descriptor` 或 `device_name`，这样自动化就只会针对该键盘触发。如果您想用多个蓝牙遥控器控制不同设备，这会特别有用。如果省略它们，则相同按键会为所有键盘/遥控器触发该自动化。

`key_code` 应设置为按键按下时生成的代码，否则每次按键都会触发该自动化。
`type` 可选设置为 `key_down`、`key_up` 或 `key_hold` 之一，以将触发限制为特定事件类型。

## 断开连接

此集成可处理键盘的断开与重新连接，例如蓝牙设备为了节省电量而自动关机的情况。

如果键盘断开连接，此集成会触发 `keyboard_remote_disconnected` 事件。
当键盘重新连接时，则会触发 `keyboard_remote_connected` 事件。

以下是一个自动化示例：每当键盘连接或断开连接时，就通过媒体播放器播放提示音。

```yaml
automation:
  - alias: "Keyboard Connected"
    triggers:
      - trigger: event
        event_type: keyboard_remote_connected
    actions:
      - action: media_player.play_media
        target:
          entity_id: media_player.speaker
        data:
          media_content_id: keyboard_connected.wav
          media_content_type: music

  - alias: "Bluetooth Keyboard Disconnected"
    triggers:
      - trigger: event
        event_type: keyboard_remote_disconnected
        event_data:
          device_name: "00:58:56:4C:C0:91"
    actions:
      - action: media_player.play_media
        target:
          entity_id: media_player.speaker
        data:
          media_content_id: keyboard_disconnected.wav
          media_content_type: music
```

## 权限

事件输入设备文件可能会出现权限问题。如果发生这种情况，则必须为运行 Home Assistant 的用户授予读写权限：

```bash
sudo setfacl -m u:HASS_USER:rw /dev/input/event*
```

其中 `HASS_USER` 是运行 Home Assistant 的用户。

如果您想让该设置永久生效，可以使用一条 udev 规则为所有事件输入设备设置权限。请添加文件 `/etc/udev/rules.d/99-userdev-input.rules`，内容如下：

```bash
KERNEL=="event*", SUBSYSTEM=="input", RUN+="/usr/bin/setfacl -m u:HASS_USER:rw $env{DEVNAME}"
```

您可以使用以下命令检查 ACL 权限：

```bash
getfacl /dev/input/event*
```

## 容器

如果您运行的是 Home Assistant Container，则需要将输入设备传递给容器。您可以使用 `--devices` 标志将要使用的输入设备直接传入容器。不过，重启容器或拔掉再重新插入键盘后，此集成会失效。原因是容器内部只能访问容器首次启动时存在的那个键盘实例。

以下是一个不完整的 `docker-compose.yml` 示例，可让 Home Assistant 在容器中持续访问输入设备：

```yaml
version: '3.7'

services:
  homeassistant:
    image: ghcr.io/homeassistant/home-assistant:stable
    volumes:
      - config:/config/
      - /dev/input:/dev/input/ # this is needed to read input events.
    restart: unless-stopped
    device_cgroup_rules:
      # allow creation of /dev/input/* with mknod, this is not enough on its own and needs mknod to be called in the container
      - 'c 13:* rmw' 
    devices:
      # since input id may change, pass them all in
      - "/dev/input/"
    ...

```
