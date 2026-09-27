# eQ-3 MAX!

Home Assistant 的 **eQ-3 MAX!** 集成允许您通过 eQ-3 MAX! Cube 连接 eQ-3 MAX! 组件。这些组件通过 TCP 连接到 eQ-3 MAX! Cube，并会自动在 Home Assistant 中提供所有受支持的集成。每个设备的名称由 MAX! 房间名和设备名拼接而成。

Home Assistant 目前支持以下设备类型：

* Binary sensor
* Climate

限制：

* 无法配置每周计划。
* 该实现基于逆向工程得到的 [MAX! 协议](https://github.com/Bouni/max-cube-protocol)。

支持的设备：

* MAX! 暖气片恒温器（已测试）
* MAX! 暖气片恒温器+
* MAX! 窗户传感器（已测试）
* MAX! 墙壁恒温器（已测试）

### 单个网关

`configuration.yaml` 文件中必须包含 `maxcube` 部分，并按需提供以下选项：
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
maxcube:
  gateways:
    - host: 192.168.0.20
```

### 多个网关

```yaml
# Example configuration.yaml entry
maxcube:
  gateways:
    - host: 192.168.0.20
      port: 62910
    - host: 192.168.0.21
      port: 62910
```

```yaml
  host:
    description: 要使用的 eQ-3 MAX! Cube 的 IP 地址。
    required: true
    type: string
  port:
    description: UDP 端口号。
    required: false
    type: integer
    default: 62910
  scan_interval:
    description: 更新间隔（秒）
    required: false
    type: integer
    default: 300
```

### 连接或设置问题

由于 eQ-3 MAX! Cube 的连接数有限，如果仍有其他应用连接到网关，Home Assistant 将无法连接。这可能会导致类似 *Error: timed out You will need to restart Home Assistant after fixing.* 以及 *The following integrations and platforms could not be set up: maxcube Please check your configuration.* 这样的超时错误。

为避免这些问题，请确保所有其他连接到网关的应用都已关闭，例如移动应用或 MAX! 桌面应用（在 Windows 设备上，请从状态栏退出；仅关闭浏览器窗口时程序仍会继续运行）。
