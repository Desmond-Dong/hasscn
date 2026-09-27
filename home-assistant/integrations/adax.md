# Adax

**Adax** integration 将 Adax 加热器集成到 Home Assistant 中，可以配置为使用本地或云接口。

## 本地集成

本地集成仅适用于同时具有蓝牙和 Wi-Fi 的新型 Adax 加热器。Home Assistant 使用蓝牙 LE 配置加热器，这意味着 *运行* Home Assistant 的机器需要有蓝牙适配器，并且加热器在设置过程中需要在范围内。使用本地控制将禁用云通信，Adax 应用程序将无法工作。

1. 按 **+** 和 **OK** 重置加热器，直到显示屏显示 **Reset**。
2. 按住加热器上的 **OK** 按钮，直到蓝色 LED 开始闪烁。
3. 按 **Submit**。

此过程可能需要几分钟。

## 云集成

对于云集成，您需要您的账户 ID。可以在 Adax WiFi 应用程序中按 **Account** 找到。ID 将显示为 **log out** 和 **close account** 按钮之间的数字。

您还需要一个凭证，可以在 Adax 应用程序中创建：

1. 导航到 Account 选项卡。
2. 转到 **Third party integrations**。
3. 选择 **Remote API**。
4. 选择 **Add Credential**。
5. 为创建的凭证命名（例如 'Home Assistant'）并复制生成的密码。

在配置弹出窗口中，您需要账户 ID 和生成的 API 密码（不是账户密码）

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 能源监控

使用云集成时，Adax 集成提供能源监控传感器，用于跟踪加热器的功耗。这些传感器仅在使用云连接时可用，因为本地集成不支持能源数据。

集成创建以下能源传感器：

* **单独能源传感器** - 每个 Adax 加热器一个传感器，显示其能源消耗（Wh）

能源传感器使用 `total_increasing` 状态类，使其适合与 Home Assistant 的能源仪表板一起使用，以跟踪您的加热成本和随时间的消耗。
