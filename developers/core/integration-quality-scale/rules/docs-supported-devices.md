# 该文档描述了已知支持/不支持的设备

## 推理

许多Home Assistant用户根据Home Assistant是否支持来购买设备。
为了让用户更容易地了解某个设备是否受支持，文档应描述已知的受支持或不受支持的设备。
这将减少用户在尝试设置设备时发现其设备不受支持的不良体验。

## 实施示例

```markdown showLineNumbers

## Supported devices

The following devices are known to be supported by the integration:
- Device 1
- Device 2
- Every appliance that runs MyOS

## Unsupported devices

The following devices are not supported by the integration:
- Device 3
- Appliances built before 2010
```

## 例外情况

此规则不适用于不连接到设备或服务的集成。
此规则也不适用于不集成物理设备的集成。
