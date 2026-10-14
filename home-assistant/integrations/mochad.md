# Mochad

**Mochad** 集成是用于接入所有由 [mochad](https://sourceforge.net/projects/mochad/) 控制的 X10 平台的主集成。除启用此集成外，您还需要分别设置各个 X10 设备。

Home Assistant 目前支持以下设备类型：

* [Light](#light)
* [Switch](#switch)

## 配置

要将您的 Mochad 设备接入 Home Assistant，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mochad:
```

```yaml
host:
  description: 运行 mochad 的主机。
  required: false
  type: string
  default: localhost
port:
  description: mochad 运行所在端口。
  required: false
  type: integer
  default: 1099
```

## 示例

完整配置示例如下：

```yaml
# Example configuration.yaml entry
mochad:
  host: localhost
  port: 1099
```

## Light

`mochad` light 平台可让您控制支持 X10 的调光器/灯光设备。

要启用此实体，您需要先设置 [mochad 集成](#configuration)，然后将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
light:
  - platform: mochad
    devices:
      - address: a1
      - address: a5
```

```yaml
address:
  description: 灯的 X10 地址。
  required: true
  type: string
name:
  description: 灯的名称。
  required: false
  default: x10_light_dev_address
  type: string
comm_type:
  description: `pl`（电力线）或 `rf`（无线电频率）。
  required: false
  default: pl
  type: string
brightness_levels:
  description: X10 灯光设备支持的亮度级数。可选值为 32、64 或 256（注意，发送到设备的最大值将是 n-1，因为亮度从 0 开始计数）。
  required: false
  default: 32
  type: integer
```

## Switch

`mochad` switch 平台可让您控制支持 X10 的开关设备。

要启用此实体，您需要先设置 [mochad 集成](#configuration)，然后将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
switch:
  - platform: mochad
    devices:
      - address: a1
      - address: a5
```

```yaml
address:
  description: 开关的 X10 地址。
  required: true
  type: string
name:
  description: 开关的名称。
  required: false
  default: x10_switch_dev_*address*
  type: string
comm_type:
  description: `pl`（电力线）或 `rf`（无线电频率）。
  required: false
  default: pl
  type: string
```
