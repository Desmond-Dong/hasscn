# Bbox

**Bbox** 集成使用法国互联网提供商 Bouygues Telecom 的 [Bbox 调制解调器路由器](https://www.bouyguestelecom.fr/offres-internet/bbox-fit)。传感器主要是带宽测量。

目前 Home Assistant 支持以下设备类型：

* [存在检测](#presence-detection)
* [传感器](#sensor)

:::note
由于第三方限制，只有当 Home Assistant 和 Bbox 位于同一局域网时，传感器才可用。您可以通过使用 Web 浏览器访问 192.168.1.254 来检查这一点。

:::

## 存在检测

`bbox` 集成通过查看连接到 [Bouygues](https://www.bouyguestelecom.fr/) 的 [Bbox](https://www.bouyguestelecom.fr/offres-internet/bbox-fit) 路由器的设备来提供存在检测，Bouygues 是法国主要的互联网提供商之一。

Bbox 是不同硬件路由器的通用名称。集成已在以下设备上测试：

* Sagem F@st 5330b

### 配置

要在您的安装中使用 Bbox 路由器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: bbox
```

```yaml
host:
  description: 您的 Bbox 设备的 IP 地址。
  required: false
  type: string
  default: 192.168.1.254
```

:::important
目前由于第三方限制，Bbox 必须与 Home Assistant 安装在同一局域网上。

:::
有关如何配置要跟踪的人员的说明，请参阅[设备跟踪器集成页面](/home-assistant/integrations/device_tracker/index.md)。

## 传感器

要将 Bbox 传感器添加到您的安装中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: bbox
    monitored_variables:
      - down_max_bandwidth
      - up_max_bandwidth
      - current_down_bandwidth
      - current_up_bandwidth
      - uptime
      - number_of_reboots
```

```yaml
name:
  description: 在前端显示的名称。
  required: false
  default: Bbox
  type: string
monitored_variables:
  description: 在前端显示的传感器。
  required: true
  type: list
  keys:
    down_max_bandwidth:
      description: 下载可用的最大带宽。
    up_max_bandwidth:
      description: 上传可用的最大带宽。
    current_down_bandwidth:
      description: 当前使用的下载带宽的即时测量。
    current_up_bandwidth:
      description: 当前使用的上传带宽的即时测量。
    uptime:
      description: 自上次启动以来的运行时间。
    number_of_reboots:
      description: 自路由器初始配置以来的重启次数。
```
