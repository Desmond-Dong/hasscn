# LiteJet

LiteJet 是一种早于大多数家庭自动化技术出现的集中式照明系统。所有灯具和墙壁开关都连接到一个中央面板。该中央面板带有串口接口，允许计算机通过 LiteJet 的第三方协议控制系统。Home Assistant 集成了 LiteJet 第三方协议，因此您可以查看状态并控制已连接的灯具。此集成还支持 Centralite Elegance 和 Centralite Jetstream。

## 前提条件

您的 LiteJet MCP 应配置为 19.2 K 波特率、8 个数据位、1 个停止位、无奇偶校验，并在每次响应后发送一个 `CR`。这些设置可通过 [Dragon Technologies](https://www.dragontechinc.com/) Programming 页面上的 LiteJet 编程软件进行配置。请将 LiteJet 的 RS232-2 端口连接到您的计算机。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

默认情况下，仅启用灯光实体。场景和开关实体可在集成的实体列表页面中单独启用。

### 触发器

LiteJet 开关可用作触发器，使这些按钮根据按住时长表现出不同的行为。例如，自动化可以区分快速点击和长按。

* **platform**（*必填*）：必须为 `litejet`。
* **number**（*必填*）：要监控的开关编号。
* **held\_more\_than**（*可选*）：触发器可激活前，开关必须至少被按住的时间。
* **held\_less\_than**（*可选*）：触发器可激活前，开关允许被按住的最长时间。

当已知同时满足 `held_more_than` 和 `held_less_than` 时，触发器会在最早时刻激活。如果两者都未指定，则在开关被按下时立即激活。如果仅指定 `held_more_than`，则会在开关被按住达到该时长时激活。如果指定 `held_less_than`，则触发器只能在开关释放时激活。

```yaml
automation:
- triggers:
    platform: litejet
    number: 55
    held_more_than:
      milliseconds: 1000
    held_less_than:
      milliseconds: 2000
```
