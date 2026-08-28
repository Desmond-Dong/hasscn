# PEGELONLINE

此集成使用德国联邦水道与航运管理局 (*Wasserstraßen- und Schifffahrtsverwaltung des Bundes*) 的 [PEGELONLINE](https://www.pegelonline.wsv.de/) 数据，根据所选测量站可提供的数据创建不同的[传感器](#sensors)。

## 数据获取与限制

数据每 5 分钟轮询一次。您可以添加任意数量的测量站，无需身份验证，也没有官方使用限制，但请遵守“合理使用”原则。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 第 1 步 - 位置选择

选择您要搜索可用水文测量站的区域。

```yaml
Latitude:
  description: "搜索区域中心的纬度（_由位置选择器自动填写_）。"
Longitude:
  description: "搜索区域中心的经度（_由位置选择器自动填写_）。"
Radius:
  description: "搜索半径（_单位为 km_）"
```

### 第 2 步 - 站点选择

```yaml
Station:
  description: "选择您要添加的测量站。"
```

## 传感器

将根据所选测量站的能力创建以下传感器：

| 传感器名称 | 常见计量单位 |
| --- | --- |
| 气温 | °C |
| 净空高度（*仅适用于桥梁*） | cm |
| 氧含量 | mg/l |
| pH | `None` |
| 水流速度 | m/s |
| 水位 | cm |
| 水温 | °C |
| 流量 | m³/s |

## 使用示例

### 洪水警戒水位通知

创建一个自动化，在本地河流水位达到指定洪水警戒级别时通知您。

```yaml
mode: single
triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.dresden_elbe_water_level
    above: 500
actions:
  - action: notify.persistent_notification
    metadata: {}
    data:
      message: Flood alert level 2 reached!
```

## 故障排除

无论哪种情况，在报告问题时，请先启用[调试日志](/home-assistant/docs/configuration/troubleshooting/index.md#debug-logs-and-diagnostics)、重启集成，并在问题再次出现后立即关闭调试日志（*调试日志文件会自动开始下载*）。此外，*如果仍然可行*，也请下载[诊断](/home-assistant/integrations/diagnostics.md)数据。如果您已收集调试日志和诊断数据，请在问题报告中一并提供。

## 删除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
