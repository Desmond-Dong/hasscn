# Open Hardware Monitor

**Open Hardware Monitor** 集成会使用您的 [Open Hardware Monitor](https://openhardwaremonitor.org/) 安装作为传感器数据源，以显示系统信息。

## 设置

OpenHardwareMonitor 必须运行在主机上，并启用 “Remote web server”。您还需要在主机上开放入站端口（TCP 8085）。

在 Windows 上开放端口：

1. 打开“控制面板”、“系统和安全”，然后进入“Windows 防火墙”。
2. 选择 **高级设置**，然后在左侧窗格中选中 **入站规则**。
3. 右键单击 **入站规则**，然后选择“新建规则”。
4. 添加您需要开放的端口，然后选择“下一步”。
5. 在下一个窗口中添加协议（TCP）和端口号（8085），然后选择“下一步”。
6. 在下一个窗口中选择“允许连接”，然后选择“下一步”。
7. 按需选择网络类型，然后选择“下一步”。
8. 为该规则命名，然后选择“完成”。

在 Linux 上使用 `firewalld` 开放端口：

```bash
sudo firewall-cmd --permanent --add-port=8085/tcp
sudo firewall-cmd --reload
```

## 配置

要将 Open Hardware Monitor 添加到您的安装中，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 配置示例
sensor:
  - platform: openhardwaremonitor
    host: IP_ADDRESS
```

```yaml
host:
  description: 运行 Open Hardware Monitor 的系统的 IP 地址或主机名。
  required: true
  type: string
port:
  description: Open Hardware Monitor API 的端口。默认为 `8085`。
  required: false
  type: integer
```
