# Refoss

将 Refoss 设备接入 Home Assistant。

## 先决条件

* 设备需要先连接到本地网络。
* 设备和 Home Assistant 必须连接到同一网络。
* 集成会占用端口 `9989`。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 支持的设备型号

| 型号 | 版本 |
|-------------------------------------|--------------------|
| `Refoss Smart Wi-Fi Switch, R10`    | `all`              |
| `Refoss Smart Wi-Fi Switch, R20`    | `all`              |
| `Refoss Smart Energy Monitor, EM06` | `v2.3.8 and above` |
| `Refoss Smart Energy Monitor, EM16` | `v3.1.7 and above` |

### 发现设备

接入 Refoss 后，集成会启动 socket 广播，Home Assistant 会自动发现当前局域网中的 Refoss 设备。

## 实体命名

此集成使用以下策略为实体命名：

* 实体名称将由 `Device Name` 和 `Channel Number` 生成。

单通道设备。

示例：

| 设备名称 | 通道编号 | 实体名称 |
| ----------- | -----------|------------|
| `r10`       | `0`           | r10        |

多通道设备。

示例：

| 设备名称 | 通道编号 | 实体名称 |
| ----------- |----------------|----------|
| `r10`       | `0`            | r10      |
| `r10`       | `1`            | r10-1    |

## 重置设备

长按设备上的按钮即可重置。

## 故障排除

### 网络中未发现设备

如果 Home Assistant 没有自动发现 Refoss 设备，请按以下步骤操作：

1. 确认 Refoss 设备与 Home Assistant 位于同一网络中。
2. 为该集成启用调试日志：
   ```yaml
   logger:
     logs:
       homeassistant.components.refoss: debug
   ```
3. 重启 Home Assistant，并再次尝试添加该集成。
4. 检查日志中是否包含 "Discovered devices" 消息。
5. 如果仍未发现设备，请检查：
   * 网络连接是否正常
   * 设备固件版本是否符合上方列出的支持版本
