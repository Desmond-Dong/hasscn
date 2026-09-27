# Rabbit Air

**Rabbit Air** 集成允许您通过本地网络控制空气净化器。目前支持以下设备型号：

* MinusA2（第 2 代）
* A3

此集成的风扇平台允许您开关设备、选择预设模式或手动设置风速。

## 先决条件

设置此集成时，您需要知道设备地址和访问令牌。

1. 打开 Rabbit Air 手机应用。您会看到与账户关联的设备列表。
2. 点击列表项，打开设备控制页面。
3. 在设备页面中，选择 **Edit** 按钮。随后会看到一个包含设备位置和名称设置的页面。
4. 在该页面上，快速连续点击 **Serial Number** 几次，直到出现之前隐藏的另外两行信息。第一行为设备 ID，第二行为访问令牌。

请注意，设备 ID 会作为设备的 mDNS 名称使用。因此，您可以在其末尾加上后缀 `.local`，并将其作为“Host”值填写。

例如，您得到了以下信息：

<p class='img'>
  <a href='/home-assistant/images/integrations/rabbitair/access_token.png' target='_blank'>
    <img height='460' src='/home-assistant/images/integrations/rabbitair/access_token.png' alt='Screenshot: Access token on the &quot;Edit device&quot; screen'>
  </a>
</p>

然后，您可以将 `abcdef1234_123456789012345678.local` 用作 **Host**，将 `0123456789ABCDEF0123456789ABCDEF` 用作 **Access Token**。

在某些情况下，访问令牌不会立即显示，此时您会看到“Tap for setup user key”消息。要生成访问令牌，请点击该消息并按照说明操作。如果应用提示“your device is not supported”，通常表示您正在尝试连接第一代 MinusA2 型号（较旧的硬件版本）。该版本目前尚不受此集成支持。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
host:
  description: 设备的主机名或 IP 地址。
access_token:
  description: 可在 Rabbit Air 应用中获取的访问令牌。
```
