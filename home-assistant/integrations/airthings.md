# Airthings

将 Airthings 传感器集成到 Home Assistant 中。

[Airthings](https://www.airthings.com/) 提供不同类型的传感器用于测量空气质量。他们专门专注于氡传感器。

虽然此集成无需 Airthings SmartLink 集线器即可工作，但使用集线器将为您的传感器数据提供实时更新。如果没有集线器，您需要依赖 Airthings 移动应用程序通过蓝牙同步数据并将其上传到云端。

需要 Airthings 硬件和有效的 Airthings 仪表板登录凭据。

## 先决条件

Airthings API 设置（需要获取 Home Assistant Airthings 集成所需的 ID 和 Secret）。

1. 登录[这里](https://dashboard.airthings.com/integrations/api-integration)找到您的凭据。
2. 从左侧边栏选择 [Integrations](https://dashboard.airthings.com/integrations/api-integration)。
3. 点击"Request API Client"以设置 API 连接。
4. 为您的 API 连接命名（例如，"Home Assistant"）。注意：名称字段有字符限制，较长的名称将被截断。
5. 为连接提供准确的描述。
6. 选择资源范围。
7. 选择访问类型，即 Confidential。
8. 选择流程类型。
9. 将启用设置为"on"。
10. 保存设置。

保存设置后，您将看到生成的 id 和 secret。

现在可以使用您刚刚创建的生成的 id 和 secret 激活 Airthings 集成。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 故障排除

### 氡传感器未显示

最初，Airthings API 可能不会发布氡传感器（在设备启动时，该值被视为"未知"），因此您可能需要等待氡传感器出现在新设备上。
