# ELV PCA

**ELV PCA** 集成允许您控制 [ELV PCA 301 智能开关](https://www.elv.de/funkschaltsteckdose-fuer-energiekostenmonitor-pca-301.html) 的状态。您需要一个 868 MHz 接口，如刷入了 [pca-hex 固件](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/firmware/JeeLink_PCA301.hex) 的 [JeeLink](https://www.digitalsmarties.net/products/jeelink)。

## 配置

要在您的系统中使用 PCA 301 开关或插座，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
elv:
  device: SERIAL_PORT
```

此集成将添加范围内所有的 PCA 301 开关。您可以读取以 kWh 为单位的总用电量和以瓦特为单位的当前功率。

```yaml
device:
  description: "您的串行控制台路径。通过以下命令获取：`ls /dev/tty*`。"
  required: true
  type: string
name: 
  description: 插座的默认名称。
  required: false
  type: string
```
