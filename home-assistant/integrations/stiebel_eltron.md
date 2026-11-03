# STIEBEL ELTRON

**STIEBEL ELTRON** 集成可让您控制 [STIEBEL ELTRON](https://www.stiebel-eltron.com) 的整体通风设备或热泵设备。

它需要以下组件：

* 兼容的 STIEBEL ELTRON 设备（请参见 [Software Documentation Modbus TCP/IP](https://www.stiebel-eltron.ch/content/dam/ste/ch/de/downloads/kundenservice/smart-home/Modbus/Modbus%20Bedienungsanleitung.pdf) 中的 `Compatibility overview`）
* 启用了 [Modbus module](https://www.stiebel-eltron.ch/de/home/service/smart-home/modbus.html) 的 [ISG web](https://www.stiebel-eltron.com/en/home/products-solutions/renewables/controller_energymanagement/internet_servicegateway/isg_web.html)
* 到 ISG web 的 IP 网络连接

## 支持的设备

目前已测试以下设备：

* LWZ 504e
* LWZ 404eco
* LWZ 304
* LWZ 304 Trend

## HVAC 模式

支持以下 HVAC 模式。STIEBEL ELTRON 的模式映射及配置方式如下：

* Auto (`HVAC_MODE_AUTO`)：自动模式
* Manual (`HVAC_MODE_HEAT`)：手动模式
* Off (`HVAC_MODE_OFF`)：DHW 模式（生活热水模式，供暖关闭）

## 预设模式

支持以下预设模式。STIEBEL ELTRON 的模式映射及配置方式如下：

* Eco mode (`PRESET_ECO`)
* Day mode (`PRESET_DAY`)
* Setback mode (`PRESET_SETBACK`)
* Emergency mode (`PRESET_EMERGENCY`)

## 配置

要启用此集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
stiebel_eltron:
  name: LWZ504e
  host: IP_ADDRESS
  port: 502
```

```yaml
name:
  description: 设备显示名称。
  required: false
  default: Unnamed Device
  type: string
host:
  description: STIEBEL ELTRON ISG 的主机名或 IP 地址。
  required: true
  type: string
port:
  description: STIEBEL ELTRON ISG 的端口。
  required: false
  default: 502
  type: integer
```
