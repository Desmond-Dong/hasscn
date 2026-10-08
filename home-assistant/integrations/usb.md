# USB Discovery

**USB Discovery** 集成会检测新连接的 USB 设备。发现的设备会显示在配置面板中“集成”页面的已发现区域。

* 在所有受支持的系统上，设备都会在启动期间被检测到。
* 在具备正常 `udev` 支持的 Linux 系统上（包括 Home Assistant Operating System），设备会在插入后立即被检测到。
* 在非 Linux 系统或不支持 `udev` 的系统上，设备会在访问集成页面以及首次引导期间被检测到。

## Configuration

此集成是 [`default_config:`](/home-assistant/integrations/default_config/index.md) 的一部分。如果您选择不使用 [`default_config:`](/home-assistant/integrations/default_config/index.md)，可以将以下内容添加到 `configuration.yaml` 以启用该集成。

```yaml
# configuration.yaml 示例
usb:
```
