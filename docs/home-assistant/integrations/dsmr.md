---
title: DSMR Smart Meter
description: 关于如何在 Home Assistant 中集成 DSMR 智能电表的说明。
ha_category:
  - Energy
ha_release: 0.34
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: dsmr
ha_codeowners:
  - '@Robbie1221'
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: hub
---

这是一个适用于比利时、荷兰、卢森堡和瑞典智能电表的传感器平台，这些电表需符合 DSMR（Dutch Smart Meter Requirements）标准，也称为 “Slimme meter” 或 “P1 poort”。带有 “HAN port” 的瑞典电表不受此集成支持。

- 目前通过 Nigel Dokter 编写的 [dsmr_parser](https://github.com/ndokter/dsmr_parser) 模块支持 DSMR V2.2、V3、V4、V5、比利时 V5 变体、卢森堡 V5 变体（Smarty）、瑞典 V5 变体，以及德国的 EasyMeter Q3D。
- 有关 DSMR 的官方信息，请参阅：[DSMR Document](https://www.netbeheernederland.nl/dossiers/slimme-meter-15)
- 有关 P1 端口的官方信息，请参阅：[P1 Companion Standard](https://www.netbeheernederland.nl/sites/default/files/2024-02/dsmr_5.0.2_p1_companion_standard.pdf)
- 有关非官方硬件连接示例，请参阅：[Domoticx](http://domoticx.com/p1-poort-slimme-meter-hardware/)
- 有关瑞典变体的官方信息，请参阅：[Swedish specification](https://www.energiforetagen.se/globalassets/energiforetagen/det-erbjuder-vi/kurser-och-konferenser/elnat/branschrekommendation-lokalt-granssnitt-v2_0-201912.pdf)
- 有关匈牙利 E.ON 变体的官方信息，请参阅：[E.ON Hungary P1 port specification](https://www.eon.hu/content/dam/eon/eon-hungary/documents/Lakossagi/aram/muszaki-ugyek/P1_port_felhasznaloi_interfesz_felhasznaloi_tajekoztato_%2020240702.pdf)
- 支持集成在 [RFXtrx 设备](http://www.rfxcom.com/epages/78165469.sf/nl_NL/?ObjectPath=/Shops/78165469/Products/18103)中的 [P1 电缆](http://www.rfxcom.com/epages/78165469.sf/nl_NL/?ObjectPath=/Shops/78165469/Products/19602)。

<p class='img'>
<img src='/home-assistant/images/screenshots/dsmr.png' alt='DSMR 集成截图' />
</p>

### 配置

- 对于比利时电表，请选择 DSMR 版本 `5B`
- 对于荷兰电表，请选择 DSMR 版本 `2.2`、`4` 或 `5`
- 对于卢森堡电表，请选择 DSMR 版本 `5L`
- 对于瑞典电表，请选择 DSMR 版本 `5S`
- 对于 EasyMeter Q3D，请选择 DSMR 版本 `Q3D`
- 对于匈牙利 E-ON 电表（以及大多数其他匈牙利电表），请选择 DSMR 版本 `5EONHU`

### 选项

要配置 DSMR 集成的选项，请前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，然后在 DSMR 卡片上选择 **选项**。

#### 更新间隔

通常，智能电表每 5 到 10 秒发送一次新数据。此值用于定义实体更新之间的最小时间间隔（秒）。将该值设为 `0` 时，每次从智能电表接收到数据都会更新实体。

:::important
缩短默认更新间隔会增加生成的事件数量，并且可能导致系统被大量事件淹没。

:::
### 支持的电表

已知此集成可用于：

- Iskra ME382 / MT382 (DSMR 2.2)
- ISKRA AM550 (DSMR 5.0)
- Landis+Gyr E350 (DSMR 4)
- Landis+Gyr E360 (DSMR 5)*
- Landis+Gyr ZCF110 / ZM F110 (DSMR 4.2)
- Kaifa E0026
- Kaifa MA304C (DSMR 4.2)
- Kamstrup 382JxC (DSMR 2.2)
- Sagemcom XS210 ESMR5
- Sagemcom T211
- Sagemcom MA304
- Ziv E0058 ESMR5
- EasyMeter Q3D

备注：
\* E360 需要专用的 P1 电缆，多个网店都有销售专用于 E360 的型号。

### M-Bus 支持

智能电表可以有多个子设备，也称为 [M-Bus](https://m-bus.com/) 设备。
对于 <abbr title="Dutch smart meter requirement">DSMR</abbr> 版本 5B，已添加对水表和燃气表 M-Bus 设备的支持。这意味着您的 <abbr title="Dutch smart meter requirement">DSMR</abbr> 电表最多可以连接 4 个子设备。
此前仅支持 1 个燃气表，而现在已支持多个燃气表和水表。

### 连接到电表

您可以通过 USB 转串口连接器直接连接到电表，也可以通过串口到网络代理进行连接。
您也可以连接到集成了 [P1 电缆](http://www.rfxcom.com/epages/78165469.sf/nl_NL/?ObjectPath=/Shops/78165469/Products/19602) 的 [RFXtrx 设备](http://www.rfxcom.com/epages/78165469.sf/nl_NL/?ObjectPath=/Shops/78165469/Products/18103)。

#### USB 串口转换器：

- Cheap (Banggood/ebay) Generic PL2303
- [SOS Solutions](https://www.sossolutions.nl/slimme-meter-kabel)
- [AliExpress](https://nl.aliexpress.com/item/32945187155.html)

Docker 用户需要通过在运行命令中添加 `--device /dev/ttyUSB21:/dev/ttyUSB21`，来允许 Docker 访问 USB 串口转换器：

```bash
$ docker run --device /dev/ttyUSB0:/dev/ttyUSB0 -d --name="home-assistant" -v /home/USERNAME/hass:/config -v /etc/localtime:/etc/localtime:ro --net=host {{ site.installation.container }}
```

#### 串口到网络代理：

- [ser2net](https://ser2net.sourceforge.net)
- [Smart Meter bridge](https://github.com/legolasbo/smartmeterBridge)
- [WIZnet WIZ110SR](https://www.wiznet.io/product-item/wiz110sr/)
- [esp8266 SmartMeter (Poluket)](https://www.domohab.be/categorie-produit/passerelle/)（为 DSMR5 / ESMR5 电表而设计）
- [Smart Gateways NL](https://smartgateways.nl/)

DIY 方案（基于 ESP8266）：
- [esp8266_p1meter (daniel-jong)](https://github.com/daniel-jong/esp8266_p1meter)（在 ESP8266 上解析并发布到 MQTT）
- [DSMR reader for ESPHome (mmakaay)](https://github.com/mmakaay/dsmr-reader-for-esphome)
- [p1-esp8266 (DavyLandman)](https://github.com/DavyLandman/p1-esp8266)（将 ESP8266 变成串口转发器）
- [Simple DSMR P1 Meter (maximevince)](https://github.com/maximevince/Simple-DSMR-P1-meter)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

ser2net 3.x.x 的可选配置示例：

```bash
# 用于将 USB/串口连接代理到 DSMRv4 智能电表的 `/etc/ser2net.conf` 示例
2001:raw:600:/dev/ttyUSB0:115200 NONE 1STOPBIT 8DATABITS XONXOFF LOCAL -RTSCTS
```
或者
```bash
# 用于将 USB/串口连接代理到 DSMRv2.2 智能电表的 `/etc/ser2net.conf` 示例
2001:raw:600:/dev/ttyUSB0:9600 EVEN 1STOPBIT 7DATABITS XONXOFF LOCAL -RTSCTS
```

ser2net 4.x.x 的可选配置示例：

```bash
# 用于将 USB/串口连接代理到 DSMRv4 智能电表的 `/etc/ser2net.yaml` 示例
connection: &con0096
    accepter: tcp,2001
    enable: on
    options:
      banner: *banner
      kickolduser: true
      telnet-brk-on-sync: true
    connector: serialdev,
              /dev/ttyUSB0,
              115200n81,local
```

Smart Meter Bridge 的可选配置示例：
```yaml
serial_port: "/dev/ttyUSB0"
dsmr_version: "4"
server:
  port: 9988
```

### 技术概览

DSMR 是荷兰智能电表必须遵循的一项标准。它规定智能电表必须每 10 秒（对于 DSMR 5.0 设备则是每 1 秒）通过串口发送一次 “telegram”。

不同版本的 telegram 内容有所不同，但通常都由若干行组成，每行包含 “obis”（Object Identification System，一种数值 ID）以及对应的值和单位。

比利时、卢森堡和瑞典的智能电表提供的 telegram 内容大体相同。

该模块使用 `dsmr_parser` 建立一个异步读取循环，用于等待完整的 telegram、对其进行解析，并将其作为 `obis` 到对象映射的字典放入异步队列中。每个值的数值和单位都可以从对象属性中读取。由于每个 DSMR 版本的 `obis` 都是已知的，因此此集成的实体会在启动期间创建。

还会建立另一个循环（DSMR 类），用于读取 telegram 队列、存储或缓存最新的 telegram，并通知各个实体 telegram 已更新。
