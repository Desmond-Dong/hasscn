# Thread

**Thread** 集成可帮助您跟踪家中的不同 Thread 网络，并存储 Thread 网络凭据（类似于 Wi-Fi 密码）。Home Assistant 中的 Thread 集成目前仍在持续完善中。

您无需手动安装此集成。当 Home Assistant 检测到[边界路由器](#about-thread-border-routers)时，Thread 集成会自动出现。

## Thread 智能家居设备上的标识

如果您购买的是基于 Thread 的消费级设备，通常会在包装上看到 Thread 标识。

<p class='img'><img width="200" src='/home-assistant/images/integrations/thread/thread-requires-border-router.png'></p>

`Built on Thread: requires border router` 标识表示 Thread 是此设备唯一支持的网络协议。您不能通过 Wi-Fi 与该设备通信。

此外，包装上通常还会看到 Matter 或 Apple HomeKit 标识。

Matter 和 Apple HomeKit 都是智能家居协议。它们负责处理 Thread 凭据，并将 Thread 设备连接到 Thread 网络。要控制设备，必须依赖某种智能家居协议。Home Assistant 原生支持这两种家庭自动化标准。

## 将基于 Thread 的设备添加到 Home Assistant

基于 Thread 的设备如何添加到 Home Assistant，取决于它使用的是哪种家庭自动化标准。

1. 如果您在设备包装上看到 Matter 标识，请按照[将 Matter 设备添加到 Home Assistant](/home-assistant/integrations/matter/index.md#adding-a-matter-device-to-home-assistant)中的步骤操作。

   <img src="/home-assistant/images/integrations/thread/matter_onpackbadge_logo.png"  width="200">

2. 如果您在设备包装上看到 Apple HomeKit 标识，请按照[将 HomeKit 设备添加到 Home Assistant](/home-assistant/integrations/homekit_controller/index.md#adding-a-homekit-device-through-thread)中的步骤操作。

   <img src="/home-assistant/images/integrations/thread/apple-works-with-homekit-logo.png"  width="200">

## 关于 Thread

本节将介绍 *Thread* 和 *border router* 这两个概念，并列出 Home Assistant 支持的边界路由器。

### 一种面向 IoT 设备的通信协议

Thread 是一种面向 IoT 设备的低功耗网状网络标准。低功耗特性对于电池供电的智能家居设备非常重要。但它同时也是低带宽的，因此非常适合数据量不大的应用，例如开关或运动传感器。

Thread 使用与 Zigbee 相同的 <abbr title="radio frequency">RF</abbr> 技术（IEEE 802.15.4），但提供了类似 Wi-Fi 的 IP 连接能力。与 Zigbee 不同，Thread 本身并不负责控制设备：它只是通信协议。要控制 Thread 设备，还需要更高层的协议，例如 Matter 或 Apple HomeKit。Thread 设备通过 IPv6 标准在网状网络内外进行通信。

<a id="about-thread-border-routers"></a>

### 关于 Thread 边界路由器

Thread 边界路由器是一种网络设备，用于将 Thread 网状网络（由低功耗 IoT 设备构成）连接到以太网或 Wi-Fi 等其他 IP 网络。

IoT 设备通过 Thread 边界路由器与网状网络外部的任意 IPv6 设备通信。Thread 边界路由器会通过 Wi-Fi 或以太网连接到您的网络，并利用其 <abbr title="radio frequency">RF</abbr> 无线芯片与 Thread 网状网络通信。<abbr title="Thread border router">TBR</abbr> 会在本地网络与 Thread 网状网络之间路由数据包。边界路由器不会检查这些数据包的内容，只负责转发。

Thread 边界路由器不负责控制设备。设备控制由 Matter 或 Apple HomeKit 这类应用层协议负责。

![Home Assistant matter thread infographic](/home-assistant/images/integrations/matter/matter_thread_infographic.png)

图片来自 Thread Group 的 [Thread Smart Home Fact Sheet](https://www.threadgroup.org/support#Resources)。它展示了 Matter、Thread 和边界路由器之间的整体关系。这里除了 Matter，也可以换成其他协议，例如 HomeKit。

与其他协议不同，Thread 可以在单一网络中使用多个边界路由器。这能提升无线覆盖范围，并降低单点故障风险。对于设备数量多、分布范围广的家庭自动化场景非常理想。

#### OpenThread 边界路由器

OpenThread 是 Thread 的开源实现，最初由 Google 发布。市面上几乎所有商用 Thread 边界路由器都基于这一开源实现。不过，<abbr title="Thread border routers">TBR</abbr> 的配置方式并不属于 Thread 标准的一部分。这意味着 Google 和 Apple 的 <abbr title="Thread border routers">TBR</abbr> 实现是由各自生态系统进行设置和配置的。

虽然 Home Assistant 可以*使用*任意边界路由器，但它只能*配置*和*控制*那些基于开源实现、并启用了 REST API 的 OpenThread 边界路由器。**OpenThread Border Router** 应用正是基于这套开源 OpenThread 代码构建，并启用了 REST API。

### Thread 边界路由器设备列表

Home Assistant 本身可以充当 Thread 边界路由器，同时也支持第三方边界路由器。很多时候，Thread 边界路由只是某个智能家居设备的附带功能。例如，Nest Hub（第二代）既是智能显示屏、Google Home 控制器和 Chromecast 目标设备，同时也内置了 Thread 边界路由器。

目前，已知以下 <abbr title="Thread border router">TBR</abbr> 设备可与 Home Assistant 配合工作。
这些边界路由器在接入过程中可能需要 iPhone 或 Android 手机。具体要求取决于您的设备所使用的家庭自动化协议（Matter 或 Apple HomeKit）。购买边界路由器前，请先查看相应流程中的前提条件：

* [将 Matter 设备添加到 Home Assistant](/home-assistant/integrations/matter/index.md#adding-a-matter-device-to-home-assistant)
* [通过 Thread 添加 Apple HomeKit 设备](/home-assistant/integrations/homekit_controller/index.md#adding-a-homekit-device-through-thread)

#### Home Assistant

默认情况下，Home Assistant Connect ZBT-1、[Connect ZBT-2](/home-assistant/connect/zbt-2/) 和 Yellow 运行的是 Zigbee，而不是 Thread。目前启用 Thread 仍需要手动操作。基于 Home Assistant 的 Thread 边界路由器与 Matter 的集成也仍在开发中。

* 如果您使用的是 Home Assistant Yellow、Connect ZBT-1 或 [Connect ZBT-2](/home-assistant/connect/zbt-2/)，可以使用其 Thread 无线模块。请按照以下步骤[将 Home Assistant 变成 Thread 边界路由器](#turning-home-assistant-into-a-thread-border-router)。

#### Google

* **显示设备**：Nest Hub（第二代）、Nest Hub Max
* **Wi-Fi 路由器**：Nest Wifi Pro（Wi-Fi 6E）、Nest Wifi
* **电视设备**：Google TV Streamer（4K）

#### Apple

* **音箱**：HomePod（第二代）、HomePod mini
* **电视设备**：Apple TV 4K（第三代，Wi-Fi + 以太网）、Apple TV 4K（第二代）

#### 其他

还有其他公司也提供具备边界路由器能力的设备，例如 Nanoleaf 或 Amazon。

<a id="turning-home-assistant-into-a-thread-border-router"></a>

## 将 Home Assistant 变成 Thread 边界路由器

如果您想使用 Yellow、Connect ZBT-1 或其他兼容无线电设备的 Thread 无线模块，将 Home Assistant 变成 Thread 边界路由器，请按以下步骤操作。

先确认您是否已经有 Thread 网络：

* 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)。
* 如果没有看到 **Thread** 集成，请先添加它。
* 然后选择 **Configure**，检查概览页面中是否已有任何 Thread 网络。
* 情况 1：如果您还没有任何 Thread 网络，请参阅[情况 1：将 Home Assistant 作为您的第一个 Thread 网络](#case-1-making-home-assistant-your-first-thread-network)
* 情况 2：如果您已经有现有网络，请参阅[情况 2：在已有网络时创建 Home Assistant 边界路由器](#case-2-creating-a-ha-border-router-when-there-is-an-existing-network)

<a id="case-1-making-home-assistant-your-first-thread-network"></a>

### 情况 1：将 Home Assistant 作为您的第一个 Thread 网络

如果您想使用 Yellow、Connect ZBT-1、Connect ZBT-2 或其他兼容无线电设备的 Thread 无线模块，将 Home Assistant 变成 Thread 边界路由器，并且当前还没有任何第三方 Thread 网络，请按以下步骤操作。这会自动创建一个名为 `ha-thread-xxxx` 的新 Thread 网络，末尾四位是网络专属标识符（PAN ID）。

#### 前提条件

* 一台带有 Thread 无线模块的设备，例如 Home Assistant Yellow、Connect ZBT-1、[Connect ZBT-2](/home-assistant/connect/zbt-2/) 或其他兼容无线电设备
* Android 手机或 iPhone
* 当前不存在第三方 Thread 网络

#### 将 Home Assistant 设为第一个 Thread 网络

1. 要在 Home Assistant Yellow、Connect ZBT-1 或 [Connect ZBT-2](/home-assistant/connect/zbt-2/) 上启用 Thread 支持，您需要安装 **OpenThread Border Router** 应用。请按对应流程操作：
   * [在 Home Assistant Yellow 上启用 Thread](https://support.nabucasa.com/hc/articles/25742476767517)。
   * [在 Home Assistant Connect ZBT-1 上启用 Thread](https://support.nabucasa.com/hc/sections/26122472719517)。
   * [在 Home Assistant Connect ZBT-2 上启用 Thread](https://support.nabucasa.com/hc/sections/31260019451421)。
   * [将 Thread 适配器添加到 Home Assistant](#adding-a-thread-adapter-to-home-assistant)。

2. 确保 Home Assistant Thread 网络已被设为首选网络。
   * 正常情况下会自动完成，但仍建议检查确认。
   * 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，选择 **Thread** 集成。
   * 然后选择 **Configure**。
   * 您应能在 **Preferred network** 下看到 Home Assistant 标识。

     ![Home Assistant thread preferred network ha only](/home-assistant/images/integrations/thread/thread-preferred-network-ha-only.png)

3. 在添加基于 Matter 的 Thread 设备之前，您的手机需要知道刚创建的 Thread 网络凭据。
   * 若要将凭据共享给 Android 手机，请打开 Home Assistant Companion 应用。
     * 在 Companion 应用中，前往 **Settings** > **Companion app** > **Troubleshooting**，然后选择 **Sync Thread credentials**。
     * 按照屏幕提示操作。
     * **结果**：您会看到确认信息，说明来自 Home Assistant 的 Thread 凭据已添加到该设备。
   * 若要将凭据共享给 iPhone，请打开 Home Assistant Companion 应用。
     * 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，选择 **Thread** 集成。
     * 在 **Services** 下选择 **Configure**。
     * 在首选网络框底部选择 **Send credentials to phone**。

4. 要添加基于 Matter 的 Thread 设备，请按[将 Matter 设备添加到 Home Assistant](/home-assistant/integrations/matter/index.md#adding-a-matter-device-to-home-assistant)中的步骤操作。

<a id="case-2-creating-a-ha-border-router-when-there-is-an-existing-network"></a>

### 情况 2：在已有网络时创建 Home Assistant 边界路由器

如果您想使用 Yellow、Connect ZBT-1 或其他兼容无线电设备的 Thread 无线模块，将 Home Assistant 变成 Thread 边界路由器，但当前已经存在第三方 Thread 网络，请按以下步骤操作。这些步骤会让 Home Assistant 的 Thread 边界路由器加入现有的 Thread 网络。

![Home Assistant thread no preferred network but third party present](/home-assistant/images/integrations/thread/thread-no-preferred-network-but-third-party-present.png)

如果您同时存在 Google 和 Apple 的 Thread 网络，请先决定要让 Home Assistant 边界路由器加入哪一个。

#### 前提条件

* 一台带有 Thread 无线模块的设备，例如 Home Assistant Yellow、Connect ZBT-1、Connect ZBT-2，或其他兼容无线电设备
* 已列出的第三方 Thread 网络
* 若是 Google Thread 网络则需 Android 手机；若是 Apple Thread 网络则需 iPhone

#### 在已有网络时创建 Home Assistant 边界路由器

注意：这里的步骤和图片展示的是 Google Thread 网络的流程。但如果您使用的是 Apple Thread 网络和 iPhone，整体过程也非常相似。

1. 请确保您有 Android 手机或 iPhone，并且手机与 Google 边界路由器处于同一 Wi-Fi 网络。

2. 首先，您需要导入 Google Thread 网络的凭据。
   * 在 Companion 应用中，前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，选择 **Thread** 集成。
   * 在 Android 上，选择 **Configure** 和 **Import Credentials**。
     * **结果**：您应会看到凭据已导入的通知。
   * 在 iOS 上，选择 **Send credentials to Home Assistant**。

3. 刷新页面。
   * 现在您应能看到一个 <img width="30px" src='/home-assistant/images/integrations/thread/information-outline.png'> 图标，表示 Home Assistant 已拥有该网络的凭据。

4. 选择 **Make preferred network**。

   * **结果**：所选网络现在会显示为首选网络。

   ![Home Assistant thread google br](/home-assistant/images/integrations/thread/thread-google-br.png)

5. 要启用 Thread 支持，您需要安装 **OpenThread Border Router** 应用。请按对应流程操作：

   * [在 Home Assistant Yellow 上启用 Thread](https://support.nabucasa.com/hc/articles/25742476767517)。
   * [在 Home Assistant Connect ZBT-1 上启用 Thread](https://support.nabucasa.com/hc/sections/26122472719517)。
   * [在 Home Assistant Connect ZBT-2 上启用 Thread](https://support.nabucasa.com/hc/sections/31260019451421)。
   * [将 Thread 适配器添加到 Home Assistant](#adding-a-thread-adapter-to-home-assistant)。
   * **结果**：该网络现在会显示为首选网络，并已加入第三方网络。

   ![Home Assistant thread ha preferred](/home-assistant/images/integrations/thread/thread-ha-preferred.png)

   * 🎉 您已成功创建 Home Assistant Thread 网络，并将其与现有第三方网络连接起来。

<a id="adding-a-thread-adapter-to-home-assistant"></a>

## 将第三方 Thread 适配器添加到 Home Assistant

如果您想设置第三方 Thread 适配器，请按以下步骤操作。

如果您使用的是 Home Assistant Thread 适配器，请改为参考对应说明：

* [在 Home Assistant Yellow 上启用 Thread](https://support.nabucasa.com/hc/articles/25742476767517)。
* [在 Home Assistant Connect ZBT-1 上启用 Thread](https://support.nabucasa.com/hc/sections/26122472719517)。
* [在 Home Assistant Connect ZBT-2 上启用 Thread](https://support.nabucasa.com/hc/sections/31260019451421)。

### 前提条件

* 智能家居主机上已安装 [Home Assistant Operating System](/home-assistant/docs/glossary/index.md#home-assistant-operating-system)。例如：
  * Home Assistant Green（预装 Home Assistant OS）
  * Home Assistant Yellow 或 Raspberry Pi
* 已安装最新更新
* 一个新的 Thread 适配器和一根 USB 延长线
  * 如果您的适配器支持多种协议：
    * 它可能默认安装了其他固件（例如 Zigbee）。
    * 请查阅其文档，并在适配器上安装 OpenThread 固件。
    * 请查阅其文档并记录波特率。

### 将 Thread 适配器添加到 OpenThread Border Router 应用

1. 安装 **OpenThread Border Router** 应用。
   * 前往 [**Settings** > **Apps**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_openthread_border_router)，然后选择 **OpenThread Border Router** 应用。
2. 将适配器插入延长线，再将延长线插入 Home Assistant 主机。
3. 前往 [**Settings** > **Apps** > **OpenThread Border Router**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_openthread_border_router)，选择 **Configuration** 选项卡。
4. 在 **Devices** 下选择您的适配器。
5. 按照适配器文档输入 **Baudrate**。
   * 如果找不到波特率，请尝试 `460800`，或联系厂商支持。
   * 保存更改。
   * **故障排查**：
     * 检查日志。
     * 如果应用崩溃或无法与 Thread 集成通信：切换 **Hardware flow control** 选项后重试。
6. 重启应用并检查日志。等待片刻。
7. 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，选择 **Thread** 集成。
   * 选择齿轮图标 `[mdi:cog-outline]`。
   * **结果**：您现在应该能看到一个新的 `ha-thread` Thread 网络。
   * **故障排查**：如果没有看到该网络，请返回应用配置，根据需要调整设置后重试。

## 将 Thread 网络迁移到新适配器

如果您已经在使用一个 Thread 适配器，但希望切换到新适配器，请按以下步骤操作。

如果您想迁移到 Home Assistant Connect ZBT-2，请按照 [Home Assistant Connect ZBT-2 文档](https://support.nabucasa.com/hc/articles/32087461954589)中的步骤操作。

### 前提条件

* 您的智能家居主机上已安装 [Home Assistant Operating System](/home-assistant/docs/glossary/index.md#home-assistant-operating-system)。例如：
  * Home Assistant Green（预装 Home Assistant OS）
  * Home Assistant Yellow 或 Raspberry Pi
* 现有 Thread 适配器已连接到 Home Assistant 主机
* 已安装最新更新
* 一个新的 Thread 适配器和一根 USB 延长线
  * 如果您的适配器支持多种协议：
    * 它可能默认安装了其他固件（例如 Zigbee）。
    * 请查阅其文档，并在适配器上安装 OpenThread 固件。
    * 请查阅其文档并记录波特率。
* Thread 设备

### 将现有 Thread 网络迁移到新适配器

1. 将新适配器插入延长线，再将延长线插入 Home Assistant 主机。
2. 前往 [**Settings** > **Apps** > **OpenThread Border Router**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_openthread_border_router)，选择 **Configuration** 选项卡。
3. 在 **Devices** 下选择您的适配器。
4. 按照适配器文档输入 **Baudrate**。
   * 如果找不到波特率，请尝试 `460800`，或联系厂商支持。
   * 保存更改。
   * **故障排查**：
     * 检查日志。
     * 如果应用崩溃或无法与 Thread 集成通信：切换 **Hardware flow control** 选项后重试。
5. 重启应用并检查日志。等待片刻。
   * **说明**：您的 Thread 网络由 Home Assistant 管理，而不是保存在适配器中。迁移适配器意味着 Home Assistant 会开始使用新适配器的无线模块，而不是旧的那个。
6. 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，选择 **Thread** 集成。
   * 选择齿轮图标 `[mdi:cog-outline]`。
   * **结果**：您现在应能看到 Thread 网络仍然存在。
   * **故障排查**：如果没有看到该网络，请返回应用配置，根据需要调整设置后重试。
7. 如果您不再使用旧适配器，现在可以将其拔下。

## 了解 Thread 配置页面

本节解释为什么您可能会在 Thread 配置页面中看到多个网络，以及这对您的网络意味着什么。

### 关于不同的 Thread 网络

如今，每个厂商在您开始使用其产品时，通常都会建立自己的 Thread 网络。这意味着您家中可能会同时存在 Home Assistant、Apple 和 Google 的 Thread 网络。Thread 配置面板会列出所有 Thread 边界路由器，并按 Thread 网络进行分组。

<p class='img'><img width="400" src='/home-assistant/images/integrations/thread/thread-no-3rd-party-credentials.png'>
Thread 配置页面展示了三个厂商专属的 Thread 网络。
</p>

这些都是使用不同凭据的独立网络，这意味着设备无法在这些 Thread 网络之间漫游。

<img width="30px" src='/home-assistant/images/integrations/thread/information-outline.png'> 图标表示 Home Assistant 已拥有该网络的凭据。在这个例子中，Home Assistant 只知道 `home assistant` 网络的凭据。

Home Assistant 能发现网络中的所有 Thread 边界路由器，是因为它们会发送 mDNS/DNS-SD 广播。这些本地广播不包含网络凭据，因此您能看到网络本身，却看不到凭据。

#### 关于首选网络

Home Assistant 中 **Preferred network** 的设计目的是：在添加基于 Thread 的设备时，将它作为默认网络使用。

:::note
**preferred network** 功能尚未完全实现。尤其是在通过 Companion 应用添加 Matter 设备时，实际使用的是移动设备上的首选网络。

:::

#### 将某个网络设为首选网络

只有在已知网络凭据的前提下，您才能将某个 Thread 网络设为首选网络。

1. 要导入 Thread 凭据，您需要 Android 或 iOS 的 Companion 应用。
2. 在 Companion 应用中，进入 Thread 配置页面。

   * 您应能在右下角看到 **Import credentials** 按钮。

   <img width="400" src='/home-assistant/images/integrations/thread/thread-import-credentials.png'>

   * 导入凭据后，由 Google 或 Apple 创建的 Thread 网络就可以作为 Home Assistant 的首选网络。
     <img width="400" src='/home-assistant/images/integrations/thread/thread-preferred-network.png'>
3. 如果显示 **Make preferred network** 按钮，请选择它。
   * 更多信息请参阅[合并 Thread 网络](#combining-thread-networks)部分。

<a id="combining-thread-networks"></a>

### 合并 Thread 网络

在当前实现中，来自不同厂商的多个 <abbr title="Thread border routers">TBR</abbr> 会形成使用不同凭据的独立网络，这会阻止设备在这些 Thread 网络之间漫游。从理论上讲，最好将所有 Thread 网络合并为单一网络，以扩大网状网络规模。更密集的网状网络通常会带来更好的 <abbr title="radio frequency">RF</abbr> 覆盖和链路质量，从而降低传输延迟并提升通信速度。
