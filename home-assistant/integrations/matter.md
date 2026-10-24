**Matter** 集成可让你控制本地 Wi-Fi 或 Thread 网络中的 Matter 设备。

为了与 Matter 设备通信，Home Assistant 集成会运行自己的“Matter 控制器”应用（此前称为附加组件）。这个 Matter Server 应用会以独立进程运行控制器软件，并连接你的 Matter 网络（技术术语称为 Fabric）与 Home Assistant。Home Assistant 的 Matter 集成通过 WebSocket 连接到该服务器。

# 介绍 - 什么是 Matter？

Matter 是一种面向家庭自动化产品与 IoT（物联网）设备的新型智能家居连接标准，请参阅其 [Wikipedia 词条](https://en.wikipedia.org/wiki/Matter_\(standard\))。

Matter 的首个 1.0 版本发布于 2022 年 10 月。Matter 目前仍处于智能家居市场的持续落地阶段。它因承诺跨生态互操作而获得了大量关注。Google、Apple、Amazon 等大型科技公司在 CSA（[Connectivity Standards Alliance](https://csa-iot.org/)）框架下联合开发这一新标准。已活跃在家庭自动化市场的大型科技公司也已宣布正在或将会推出兼容 Matter 的产品，并参与相关开发。

Matter 产品在本地运行，并始终支持本地控制，设备控制不依赖互联网连接或云服务。从技术角度看，你可以在不连接厂商专有云的情况下，将 Matter 兼容设备接入 Home Assistant。不过，部分厂商可能要求你先创建账号，才能为某些产品启用 Matter 支持（尤其是以成品设备销售的厂商自有网关/桥接器/中枢/控制器）。

与其他常见的 IoT 无线协议（如 Zigbee、Z-Wave 和 Bluetooth）不同，Matter 标准本身不包含私有无线协议或网络传输协议。它是在应用层**构建于**现有网络基础设施之上的服务控制协议。所有 Matter 设备都通过标准 IP（IPv6）通信，在你现有的 [局域网（例如 Wi-Fi 与 Ethernet）](https://en.wikipedia.org/wiki/Local_area_network) 或 [Thread（低功耗无线个域网）](https://en.wikipedia.org/wiki/Thread_\(network_protocol\)) 上传输，具体取决于设备类型。

Home Assistant 在 Matter 生态中是所谓的“*控制器*”，也就是它可以控制基于 Matter 的设备。其他 Matter 控制器示例包括 Google Nest 产品、Apple HomePod 音箱、Samsung SmartThings Station，以及部分较新的 Amazon Echo 设备。

## Thread 与 Matter 的关系是什么？

Thread 是一种低功耗无线网状网络技术。它与 Zigbee 很相似，但关键区别在于它是 *可 IP 寻址* 的，因此非常适合作为 Matter 的传输协议选项。

下图展示了 Matter、Thread 与边界路由器的关系。Thread 边界路由器负责将 Thread 网络内设备的流量转发到网络外设备。

![Home Assistant matter thread infographic](/home-assistant/images/integrations/matter/matter_thread_infographic.png)

图片来源于 Thread Group 的 [Thread Smart Home Fact Sheet](https://www.threadgroup.org/support#Resources)。

有关 Thread 的更多信息，请参阅 [Thread 文档](/home-assistant/integrations/thread/index.md)。

### Thread 设备不一定支持 Matter

市面上很多设备使用 Thread 进行无线通信，并使用 Matter 作为控制协议，但这并非必然。一些基于 Thread 的设备支持 Apple HomeKit 或其他厂商专有通信协议。也有少数情况需要你申请设备（测试版）固件更新，才能启用 Matter 通信协议。

看到设备有 Thread 标识时，不要默认它支持 Matter。请始终确认设备本身有 *Matter* 标识（无论是基于 Wi-Fi/Ethernet 还是 Thread），或有厂商其他明确说明设备支持 Matter。

## 配网期间使用 Bluetooth

大多数（如果不是全部）符合 Matter 标准的设备都内置 Bluetooth 芯片，以便简化配网。Bluetooth 不用于日常控制，而是用于开箱后或恢复出厂后进行配对。Home Assistant 控制器通过 Home Assistant Companion 应用执行配网。配网时，你需要将手机靠近设备。随后控制器会通过 Bluetooth 把网络凭据发送给设备。完成后，设备会通过其原生接口通信：Wi-Fi 或 Thread。

:::note
即使你的 Home Assistant 服务器可能带有 Bluetooth 适配器并可用于配网，Home Assistant 目前也不会使用该适配器。主要是为了避免与内置 Bluetooth 集成产生冲突，同时相比把设备搬到服务器旁边，让手机靠近 Matter 设备通常更容易。

:::

## 多 Fabric：加入多个控制器

Matter 的一个重要特性是 *多 Fabric*：你可以把同一设备加入多个控制器。例如同时加入 Google Home、Apple Home 和 Home Assistant。标准规定每台设备应至少能够同时支持 5 个不同 Fabric。

对于 Home Assistant 已提供原生集成（本地 API）的设备，Matter 未必是最佳选择。Matter 作为通用标准，可能不包含厂商专有协议中的精细功能。一个典型例子是 Philips Hue：通过 Matter 通信只提供基础灯光控制，而官方 [Hue 集成](/home-assistant/integrations/hue.md) 还提供 Hue 独有功能，例如（动态）场景、娱乐模式等。

## 支持的安装类型

建议在 Home Assistant OS 上运行 Matter 应用（此前称为 Matter 附加组件）。这是当前唯一受支持的方案。其他安装类型不在支持范围内，请自行承担风险。

如果你在容器中运行 Home Assistant，也可以运行 [Matter server](https://github.com/home-assistant-libs/python-matter-server) 的 Docker 镜像。宿主机环境要求和配置说明见该 GitHub 页面。

## 将 Matter 设备添加到 Home Assistant

每个 Matter 网络都称为一个 fabric。每个用于控制 Matter 设备的家庭自动化控制器都有自己的“fabric”。你可以把设备直接添加到 Home Assistant 实例的 fabric，也可以从其他 fabric（如 Google 或 Apple）共享到 Home Assistant 的 fabric。下面将分别说明这些方式。

注意：下面会提到 Nest Hub（第二代）、HomePod Mini 等第三方 Thread 边界路由器。这并不意味着你必须把设备加入这些生态。Home Assistant 仅使用它们访问 Thread 无线网络。Home Assistant Matter 控制器与 Matter 设备之间的通信是加密的。Thread 边界路由器仅负责转发数据，无法读取内容。

### 前提条件

在尝试将 Matter 设备添加到 Home Assistant 前，请先确保以下组件准备就绪。

#### 准备 Home Assistant

* 确保已[安装](/home-assistant/installation/index.md)最新版本的 Home Assistant
* 在 Home Assistant 中安装 Matter 集成
  * 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)
  * 添加 **Matter** 集成
  * 当提示 **选择连接方式** 时：
    * 如果你以常规方式运行 Home Assistant OS：选择 **提交**
      * 这会安装 Home Assistant 官方 Matter Server 应用
      * 请注意，Home Assistant 官方 Matter Server 应用不支持 32 位平台
    * 如果你已在其他 Home Assistant 应用或自定义容器中运行 Matter server：
      * 取消勾选复选框，然后选择 **提交**
      * 下一步中填写 Matter server 的 URL

#### 检查设备标识

* 在设备包装上同时确认 Matter 标识，以及 Wi-Fi 或 Thread 标识
* 确认设备上是否有二维码或数字配网码
  * 如果你重置设备，再次配网时仍需要二维码*或*数字配网码。没有这些信息将无法配网。
  * 如果二维码或数字配网码只出现在随附文档中，建议提前拍照备份，最好与设备同框并妥善保存。

#### 准备 Android 或 iPhone

* 准备一部 Android 或 iPhone，并开启 Bluetooth。关于为何必须使用 Bluetooth，请参阅[配网期间使用 Bluetooth](#配网期间使用-bluetooth)：
  * **Android**：
    * 至少需要 Android 8.1，推荐 12 或更高版本
    * 安装最新版 Home Assistant Companion 应用（Play Store 完整版）
    * 如果你使用 Thread：请确保家庭网络中存在 Thread 边界路由器（Nest Hub 第二代、Nest Wi-Fi Pro，或安装了 Home Assistant OpenThread Border Router 应用的 Home Assistant）
      * 如果你使用 OpenThread（适用于 Connect ZBT-1、ZBT-2 或 SkyConnect）作为边界路由器，请确保已完成 [Thread 文档](/home-assistant/integrations/thread.md#turning-home-assistant-into-a-thread-border-router)中的步骤
  * **iPhone**
    * 需要 iOS 16 或更高版本
    * 安装最新版 Home Assistant Companion 应用
    * 如果你使用 Thread：请确保家庭网络中存在 Thread 边界路由器（HomePod Mini 或 V2、Apple TV 4K，或安装了 Home Assistant OpenThread Border Router 应用的 Home Assistant）
      * 如果你使用 OpenThread（适用于 Connect ZBT-1、ZBT-2 或 SkyConnect）作为边界路由器，请确保已完成 [Thread 文档](/home-assistant/integrations/thread.md#turning-home-assistant-into-a-thread-border-router)中的步骤
* 确保手机与边界路由器及设备距离足够近
* 如果你要添加基于 Wi-Fi 的 Matter 设备：Matter 设备通常使用 2.4 GHz Wi-Fi。请确保手机连接到你计划用于设备运行的同一 2.4 GHz 网络。

### 使用 iOS Companion 应用添加新设备

本指南说明如何添加新设备。该流程会使用手机的 Bluetooth 连接来完成添加。

1. 在手机上打开 Home Assistant 应用
2. 前往 [**设置** > **Matter**](https://my.home-assistant.io/redirect/config_matter/)
3. 选择 **添加设备** 按钮
4. 在弹窗中选择 **不，这是新设备。**
5. 使用手机相机扫描 Matter 设备二维码，或选择 **更多选项...** 手动输入配网码
6. 选择 **添加到 Home Assistant**
   * 这会启动配网流程，可能需要几分钟
7. 如果你添加的是测试板或测试版设备，可能会出现 **未认证配件** 提示。在该对话框中选择 **仍要添加**
8. 如有提示，输入自定义 **配件名称**
   * 这里可以输入任意名称
   * 这是 iOS 内部引用，不会显示在 Home Assistant 中
   * 输入名称后，选择 **继续**
9. 流程完成后选择 **完成**
   * 你会被重定向到 Home Assistant 中的设备页面，设备已可使用

### 使用 Android Companion 应用添加新设备

本指南说明如何添加新设备。该流程会使用手机的 Bluetooth 连接来完成添加。

1. 在手机上打开 Home Assistant 应用
2. 给设备通电（插电或装入电池）。大多数设备此时会进入配对模式。
   * 某些设备需要你手动启用配对模式（类似 Z-Wave 或 Zigbee 设备）
   * 如何进入配对模式通常可在设备文档中找到
3. 对于部分设备，此时手机会弹出窗口提示你 **扫描二维码**
   * 扫描二维码
   * 当提示 **选择应用** 时，请选择 Home Assistant
   * 流程完成后选择 **完成**，然后选择 **添加设备**
4. 如果没有弹窗，前往 [**设置** > **Matter**](https://my.home-assistant.io/redirect/config_matter/)
   * 选择 **添加设备**，再选择 **添加 Matter 设备**
   * 在弹窗中选择 **不，这是新设备。**
   * 使用手机相机扫描 Matter 设备二维码，或选择 **无二维码设置** 手动输入配网码
     * 这会启动配网流程，可能需要几分钟
   * 如果你添加测试板（如运行示例应用的 ESP32）且配网失败，可能需要在 Google Developer Console 执行额外操作，请查看测试设备相关说明
   * 流程完成后选择 **完成**
5. 要查看设备详情，前往 [**设置** > **Matter**](https://my.home-assistant.io/redirect/config_matter/)
6. 选择 **设备**，再选择刚添加的设备

   * 默认情况下，设备会使用出厂名称。若要重命名，在设备页面选择铅笔图标 `[mdi:edit]` 进行编辑和重命名。

   ![Home Assistant matter android rename](/home-assistant/images/integrations/matter/matter-android-rename.png)
7. 你的设备现在已可使用

<p class='img'>
    <img width="300" src="/home-assistant/images/integrations/matter/matter_android_connect_new.webp" alt="演示如何将新的 Matter 设备添加到 Home Assistant 的录屏。"/>
    演示如何将新的 Matter 设备添加到 Home Assistant 的录屏。
</p>

### 安装故障排查

如果你在 Android 手机上使用 Home Assistant Companion 应用添加 Matter 设备时遇到问题，请检查以下步骤。

#### 现象

尝试添加 Matter 设备时，出现 *Matter is currently unavailable* 错误。

#### 解决方法

这可能表示 Home Assistant Companion 应用所需的 Matter 模块尚未全部下载完成。请尝试以下步骤：

1. 最多等待 24 小时，让 Google Play Services 下载所需 Matter 模块。
2. 确保满足[前提条件](#前提条件)中列出的要求，包括最低系统要求：
   * **Android**：
     * 最低版本为 8.1，推荐 12 或更高版本
       * 使用较老 Android 版本的用户报告了更多问题
     * 使用常规、登录 Google 账号的 Android 系统，不使用替代版 Android
     * 确保 Google Play Services 已全部更新到最新
   * **iPhone**：
     * 需要 iOS 16 或更高版本
3. Home Assistant Companion 应用：
   * 确认安装的是从 Play Store 下载的（完整）版本
   * 确认已更新到最新版本
   * 如果你刚安装或更新了 Home Assistant Companion 应用：
     * 请等待
     * 后台安装所需组件可能需要一些时间
     * 1 小时后再试，以确保安装完成
4. 验证你的设备满足 Matter 支持要求：
   * 在 Android 设备中，前往 **设置** > **Google** > **设备与共享**
     * 这里应存在 **Matter 设备** 条目
5. 重新安装 Home Assistant Companion 应用。
6. 尝试（重新）安装 Google Home 应用。技术上这不是必需步骤，但可能会触发 Matter 模块的再次安装。
7. 参考 Google 的这份[故障排查指南](https://developers.home.google.com/matter/verify-services)。

## 从其他平台共享设备到 Home Assistant

如果你的 Matter 设备已添加到 Apple Home 或 Google Home，且你希望同时在 Apple/Google Home 与 Home Assistant 中控制它，请使用以下方法之一。

### 前提条件

* 安装最新版 Home Assistant Companion 应用
* Matter 设备已分别接入 Apple Home 或 Google Home
* 在 Home Assistant 中安装 Matter 集成
  * 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)
  * 添加 **Matter** 集成
  * 当提示 **选择连接方式** 时：
    * 如果你以常规方式运行 Home Assistant OS：选择 **提交**
      * 这会安装官方 Matter server 应用
    * 如果你在自定义容器中运行 Matter server（不推荐）：
      * 取消勾选复选框，然后选择 **提交**
      * 下一步中填写 Matter server 的 URL

### 从其他 Matter 控制器（如 Apple 或 Google Home）共享设备

如果你希望 Home Assistant 控制已添加到其他 Matter 控制器（如 Google Home）的 Matter 设备，请按以下步骤操作：

1. 在手机上打开 Home Assistant 应用
2. 前往 [**设置** > **Matter**](https://my.home-assistant.io/redirect/config_matter/)
3. 选择 **添加设备** 按钮
4. 在弹窗中选择 **是，已在使用中**，然后选择当前已连接的控制器，例如 Google Home
5. 按照弹窗中的指引完成操作
   * **故障排查**：如果 Home Assistant 添加设备失败，请检查 Matter 集成是否已安装，以及 Companion 应用是否为最新版
6. 设备添加到 Home Assistant 后，你会看到 **你的设备已添加** 通知
   * 流程结束后会跳转到 Home Assistant 的设备页面
   * 此后你可以在 Home Assistant 和 Google Home 中同时控制设备

<p class='img'>
    <img width="300" src="/home-assistant/images/integrations/matter/matter_share_from_apple.webp" alt="演示如何从 Apple Home 共享 Matter 设备的录屏。"/>
    演示如何从 Apple Home 共享 Matter 设备的录屏。
</p>

### 使用 Matter 桥接器

对于某些生态，你可以通过 *Matter 桥接器* 将其部分非 Matter 设备添加到 Home Assistant。Matter 桥接器示例包括 SwitchBot Hub 2、Aqara Hub M2、Ikea Dirigera，以及 Philips Hue Bridge。使用桥接器后，你可以继续通过原生应用控制这些设备，同时也能在 Home Assistant 中使用它们。以 Aqara Hub 为例，它原本使用云集成；通过 Matter 桥接到 Home Assistant（而不是其云集成）后，你可以改用本地通信。

Home Assistant 作为 Matter 控制器，仅支持对 Matter 设备进行**控制**。Home Assistant 本身不是桥接器，不能把 Home Assistant 里已有设备转换成 Matter 兼容设备。

#### 如何将 Matter 桥接器添加到 Home Assistant

桥接器接入方式取决于具体设备，请查看对应设备文档。以 SwitchBot Hub 2 为例，你需要在应用中启用 Matter 配对模式。随后应用会提供配对码，并提示你让实际设备进入配对模式。之后你就可以将这个桥接器设备作为 Matter 设备添加到 Home Assistant。并不能保证该生态的所有设备都能在 Home Assistant 中使用。例如 SwitchBot Hub 2 V1.5 支持通过 Matter 使用窗帘、门锁和百叶，但不支持灯光。

#### 何时不应使用桥接器

在某些场景下，通过 Matter 桥接到 Home Assistant 并不会带来收益。例如目前 Philips Hue Bridge 支持 Matter，但 Matter 只支持有限功能。Home Assistant 的 Philips Hue 原生集成具备更丰富功能，且同样是本地通信。通过 Matter 桥接添加 Philips Hue 设备不会带来额外好处，反而可能损失部分功能。

<lite-youtube videoid="rEugjMk-4II" videoStartAt="4192" videotitle="将 Matter 设备桥接到 Home Assistant"></lite-youtube>

## 跨平台共享设备

如果你已将 Matter 设备添加到 Home Assistant，并希望把它提供给其他平台（如 Google Home 或 Apple Home），请按以下步骤操作。

1. 前往 [**设置** > **Matter**](https://my.home-assistant.io/redirect/config_matter/) 并选择 **设备**
2. 在设备列表中选择要共享的设备
3. 选择 **共享设备**，然后在弹窗中再次选择 **共享设备**
   * 无需按下设备上的硬件按键来进入配网模式
4. 在目标平台的应用中扫描二维码或输入共享码，以加入该设备
5. 按目标应用的指引完成流程。完成后可在 Home Assistant 中确认设备已共享：
   * 在 **共享设备** 按钮旁选择三点菜单 `[mdi:dots-vertical]`，然后选择 **管理 Fabric**
   * 列表中应显示新增平台
   * 例如共享到 Google Home 后，会显示 **Google LLC**
     ![Home Assistant matter share device with other platform](/home-assistant/images/integrations/matter/matter_share-device-with-other-platform.png)

## 从 Matter 控制器中移除设备

如果你希望将设备从某个指定 Matter 控制器中移除，请按以下步骤操作。

1. 前往 [**设置** > **Matter**](https://my.home-assistant.io/redirect/config_matter/) 并选择 **设备**
2. 在设备列表中选择要移除控制器关联的设备
3. 在 **设备信息** 区域中，找到 **共享设备** 旁的三点菜单 `[mdi:dots-vertical]`，然后选择 **管理 Fabric**
4. 在列表中移除目标控制器
   * 如果你要移除 Apple Home，也请同步移除 Apple Keychain 中对应条目
     ![Home Assistant matter remove from network](/home-assistant/images/integrations/matter/matter-remove-from-network.png)
5. 如果你还要把设备从 Home Assistant 本身移除，选择三点菜单 `[mdi:dots-vertical]` 并选择 **删除**

## 关于 Matter 设备信息

设备信息区域会显示设备的一些诊断信息。

1. 要查看设备详情，前往 [**设置** > **Matter**](https://my.home-assistant.io/redirect/config_matter/) 并选择 **设备**
2. 在设备列表中选择你要查看的设备

<p class='img'>
<img src='/home-assistant/images/integrations/matter/matter_device-info.png' alt='Matter 设备信息'>
</p>

本节对其中部分字段做简要说明：

**网络类型**：显示设备所属网络类型，例如 Thread 或 Wi-Fi。

**设备类型**：共有 4 种设备类型：

* **终端设备（End device）**：始终保持无线电开启的终端设备，通常不是电池供电
* **休眠终端设备（Sleepy end device）**：非路由终端设备。通常处于休眠状态，偶尔唤醒检查消息，通常为电池供电
* **路由终端设备（Routing end device）**：始终保持无线电开启，并可为其他路由与非路由终端设备转发流量的终端设备
* **桥接器（Bridge）**

**网络名称**：设备在配网时加入的网络名称。

**IP 地址**：通常会显示多个 IPv6 地址，例如链路本地地址、唯一本地地址和全球单播地址。某些设备也支持 IPv4，此时这里还会列出 IPv4 地址。

## Matter OTA 设备更新

Matter 协议支持 OTA（Over-the-Air）软件更新。但 OTA 更新是 Matter 设备的可选功能，因此并非所有 Matter 设备都实现该能力。对于支持 Matter 更新的设备，Home Assistant 会创建对应的更新实体。

CSA 运营一个分布式合规账本（Distributed Compliance Ledger，DCL），用于提供固件更新元数据。默认情况下，Matter 更新实体每 12 小时检查一次 DCL 更新。如果你想强制检查更新，可使用 `homeassistant.update_entity` [action](/home-assistant/integrations/homeassistant/index.md)，并将更新实体设为目标。目前 Eve 与 Nanoleaf 已通过 DCL 提供更新。预计未来会有越来越多固件更新通过 DCL 提供。

<p class='img'>
<img src='/home-assistant/images/integrations/matter/matter_ota_message.png' alt='Matter 设备 OTA 更新消息'>
Matter 设备 OTA 更新通知
</p>

:::note
目前，当 Thread 网络中使用（任意）Apple 边界路由器时，Home Assistant 的 Matter 更新对 Thread 设备不可用。你通常会看到 “Target node did not process the update file” 错误。原因是 Apple 边界路由器不会转发必要的 mDNS 数据包，导致 Home Assistant 侧无法发现更新提供者。作为替代，Apple Home 生态可能会从其侧提供更新（例如 Eve 设备）。

:::

## 操作

Matter 集成提供以下操作：

* `matter.water_heater_boost`

### 操作：热水器增强（Water heater boost）

`matter.water_heater_boost` 操作用于在指定时长内启用热水器增强模式。

| 数据属性             | 可选     | 说明                                                               |
|----------------------|----------|--------------------------------------------------------------------|
| `duration`           | 否       | 增强持续时间（秒）                                                 |
| `emergency_boost`    | 是       | 是否启用紧急增强模式                                               |
| `temporary_setpoint` | 是       | 增强期间的临时设定温度（摄氏度）                                   |

## 基于按钮按下触发自动化

如果你有一台以按钮按下作为输入的设备（例如 Tuo Smart Button、Inovelli 的 VTM31SN 调光器，或 Innovation Matters 的 Matter Pushbutton Module），并希望基于按键事件触发自动化，请参阅此[教程](/home-assistant/integrations/event/index.md#automating-on-a-button-press)。

## 使用 ESP32 开发板体验 Matter

如果你还没有任何 Matter 兼容硬件，但想先体验或自制 Matter 设备，我们已[准备了一个页面](https://nabucasa.github.io/matter-example-apps/)，你可以轻松为受支持的 ESP32 开发板刷入 Matter 固件。推荐使用运行 Lighting 应用的 M5 Stamp C3 设备。

Android 用户注意：你需要按页面底部说明把测试设备添加到 Google Developer Console，否则配网会失败。iOS 用户通常不会遇到该问题，但在配网期间会看到是否信任开发设备的提示。

1. 确保你使用 Google Chrome 或 Microsoft Edge 浏览器。
2. 打开 https://nabucasa.github.io/matter-example-apps/
3. 使用 USB 数据线连接 ESP32 设备。
4. 在你要设置的示例旁选择单选按钮；如果是 M5 Stamp，请选择 **Lighting app for M5STAMP C3**。
5. 选择 **Connect**。
6. 在弹出的对话框中，选择正确的串口设备，通常名称类似 “cu-usbserial”。
7. 选择 **Install Matter Lighting app example**，并等待其为设备安装固件。该过程需要几分钟。
8. 刷入 Matter 固件后，再次连接设备，这次选择 **Logs & console**。
9. 你会看到一个控制台界面，显示实时日志。这是一个可交互 Shell，可输入命令。要查看所有命令，输入 **matter help** 并按回车。
10. 添加设备需要二维码。在控制台中输入 `matter onboardingcodes ble`，并将输出 URL 复制到浏览器打开。
11. 按上述任一手机流程，使用该二维码添加设备，例如通过 Home Assistant Companion 应用。

## 故障排查

### 一般建议

* 在 Home Assistant 中使用基于 Thread 的 Matter 设备需要 Home Assistant OS 10 及以上版本。使用带 Home Assistant Matter Server 应用的 Home Assistant OS 是受支持方案。以独立 Docker 容器运行 Matter Server 不受支持，但我们提供了[文档](https://github.com/home-assistant-libs/python-matter-server/blob/main/README.md)，其中包含宿主机与网络要求说明。

* 要使用 Thread 设备，你的网络中需要至少一个靠近 Thread 设备的 Thread 边界路由器。例如 Apple 用户需要 Apple TV 4K 或 HomePod Mini，Google 用户需要 Nest Hub（第二代）。可使用 Home Assistant 的 Thread 集成诊断 Thread 网络。

* 从简单场景开始，先保持网络结构简单，比如先添加一个 ESP32 测试设备。确认可用后，再逐步扩展到下一步或更多设备。

* 请意识到你属于早期采用者，无论硬件侧还是软件（控制器）侧，都可能遇到兼容性问题或缺失功能。欢迎反馈你发现的问题；如果你找到规避方案或验证了某设备，也欢迎帮助其他用户。

* 确保 IPv6（组播）流量可以在你的网络与 Home Assistant 主机之间自由传输。你不需要具备支持 IPv6 的互联网连接或 DHCPv6 服务器，但 Home Assistant 必须启用 IPv6。前往 **[设置 > 系统 > 网络](https://my.home-assistant.io/redirect/network/)**，并根据网络设置将 **IPv6** 设为 **Automatic** 或 **static**。如果不确定，请使用 **Automatic**。

* 有关网络配置的更详细信息，请参阅 [Matter server 仓库的 README](https://github.com/home-assistant-libs/python-matter-server/blob/main/README.md)。

### 我看不到“使用 Companion 应用配网”按钮

**使用 Companion 应用配网** 按钮仅存在于 Home Assistant Companion 应用中，浏览器里不可用。

#### 解决方法

如果你在 Companion 应用中看不到该按钮：

1. 确保满足[前提条件](#前提条件)中列出的要求。
2. 其中包括满足最低系统要求：

   * **Android**：
     * 最低版本为 8.1，推荐 12 或更高版本
       * 使用较老 Android 版本的用户报告了更多问题
       * 使用常规、登录 Google 账号的 Android 系统，不使用替代版 Android
       * 确保 Google Play Services 已全部更新到最新
   * **iPhone**：
     * 需要 iOS 16 或更高版本

### Android 配网时报错 “Matter is unavailable”

请参阅[安装故障排查](#安装故障排查)中的步骤。

### Android：卡在 “Checking network connectivity”

#### 现象

你在 Android 手机上尝试 配网 Matter 设备时，会看到 “Checking network connectivity” 提示，并且无法继续。

#### 解决方法

1. 确保满足[前提条件](#前提条件)中列出的要求。
2. 其中包括满足 **Android** 最低系统要求：

   * 最低版本为 8.1，推荐 12 或更高版本
     * 使用较老 Android 版本的用户报告了更多问题
     * 使用常规、登录 Google 账号的 Android 系统，不使用替代版 Android
     * 确保 Google Play Services 已全部更新到最新
3. 如果你添加的是基于 Thread 的 Matter 设备，请确保手机与边界路由器及设备距离足够近。
4. 如果你添加的是基于 Wi-Fi 的 Matter 设备：
   * Matter 设备通常使用 2.4 GHz Wi-Fi
   * 确保手机连接到你计划用于设备运行的同一 2.4 GHz 网络

### 错误 “this device requires a border router”

#### 现象

当你使用 Home Assistant Companion 应用添加 Matter 设备时，出现错误 “this device requires a border router”。

#### 原因

要添加基于 Thread 无线协议的 Matter 设备，你需要在设备附近部署 Thread border router，并且手机需要知道你（新建）Thread 网络的凭据。

#### 解决方法

部署 Thread border router，并将凭据从 Home Assistant 同步到 Android 设备：

1. 按照[将 Home Assistant 变成 Thread 边界路由器](https://www.home-assistant.io/integrations/thread#turning-home-assistant-into-a-thread-border-router)中的步骤操作。
2. 确保完成第 3 步中描述的 Thread 凭据同步。

### 错误 “Target node did not process the update file”

#### 现象

你尝试通过 Home Assistant 更新 Matter over Thread 设备时，看到错误 “Target node did not process the update file”。

#### 原因

通过 Home Assistant 对 Matter 设备执行 OTA 更新，不支持使用 Apple Thread border router 的场景。

#### 解决方法

* 如果你只有 Apple 的 Thread border router，则无法通过 Home Assistant 更新该设备。
  * 如果希望能对这些设备使用 OTA 更新，可增加其他边界路由器，例如[将 Home Assistant 变成 Thread 边界路由器](/home-assistant/integrations/thread.md#turning-home-assistant-into-a-thread-border-router)。

* 如果你同时有 Apple 和其他 Thread border routers（如 Home Assistant [OpenThread border router](/home-assistant/integrations/thread.md#openthread-border-routers)），请按以下步骤操作：
  1. 关闭所有 Apple Thread border routers 电源。
  2. 至少等待 30 分钟。
  3. 再次尝试从 Home Assistant 更新设备。

### 无法配网设备，持续报错或随机失效

#### 现象

初始配网持续失败、设备发现异常，或设备会随机离线。

#### 原因

* Matter 协议依赖（本地）IPv6 与 <abbr title="多播域名系统">mDNS</abbr>（组播流量）在你的网络中自由传输
* Matter 主要面向常规家庭网络设计，和企业级网络方案（如 <abbr title="虚拟局域网">VLANs</abbr>、组播过滤、以及异常的 <abbr title="网际组管理协议">IGMP</abbr> 侦听）可能兼容性不佳

#### 解决方法

1. 确保使用 Wi-Fi 的 Matter 设备（包括 Thread border router）与 Home Assistant 处于相同的 <abbr title="局域网">VLANs</abbr>/<abbr title="虚拟局域网">VLAN</abbr>。
2. 确保仅使用 Thread 的 Matter 设备已加入某个 Thread 网络，并且该网络至少有一个 Thread border router 连接到 Home Assistant 所在 LAN。
3. 排查你的网络拓扑。
   * 例如，路由器或 Wi-Fi AP 上用于“优化”组播流量的设置，可能会影响 Matter 设备的（发现）流量。若你在添加或控制 Matter 设备时遇到问题，请重点检查此类设置。
   * 为减少问题，尽量保持网络拓扑简单、扁平。
