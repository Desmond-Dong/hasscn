# NextDNS

NextDNS 是一项 DNS 服务，可防止各种安全威胁，阻止网站和应用程序中的 ADS 和跟踪器，并在所有设备和所有网络上为儿童提供安全且受监督的互联网。 NextDNS 集成允许您监控 NextDNS 统计数据并控制其配置。

## Prerequisites

要获取 API 密钥，请转至 NextDNS 站点 >> [帐户部分](https://my.nextdns.io/account)。

## Configuration

To add the **NextDNS** service to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nextdns)

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nextdns).
* From the list, select **NextDNS**.
* Follow the instructions on screen to complete the setup.

</details>

```yaml
API Key:
    description: "The API key for your NextDNS account."
Profile:
    description: "The NextDNS configuration profile you want to integrate."
```

## Removing the integration

此集成遵循标准集成删除，不需要额外的步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## Supported functionality

NextDNS 集成提供以下实体。

### Binary sensors

* **设备连接状态**
  * **描述**：指示 Home Assistant 服务器是否使用 NextDNS 进行 DNS 查询
* **设备配置文件连接状态**
  * **描述**：指示 Home Assistant 服务器是否使用配置的 NextDNS 配置文件进行 DNS 查询

### Buttons

* **清除日志**
  * **描述**：触发清除 NextDNS 服务器上的 DNS 查询日志

### Sensors

* **DNS 查询**
  * **描述**：显示 DNS 查询总数
* **DNS 查询被阻止**
  * **描述**：显示被阻止的 DNS 查询的数量
* **DNS 查询被阻止率**
  * **描述**：显示被阻止的 DNS 查询的百分比
* **DNS-over-HTTP/3 查询**
  * **描述**：显示通过 DNS-over-HTTP/3 进行的 DNS 查询数量
  * **备注**：该实体默认禁用
* **DNS-over-HTTP/3 查询比率**
  * **描述**：显示通过 DNS-over-HTTP/3 进行的 DNS 查询的百分比
  * **备注**：该实体默认禁用
* **DNS-over-HTTPS 查询**
  * **描述**：显示通过 DNS-over-HTTPS 进行的 DNS 查询数量
  * **备注**：该实体默认禁用
* **DNS-over-HTTPS 查询比率**
  * **描述**：显示通过 DNS-over-HTTPS 进行的 DNS 查询的百分比
  * **备注**：该实体默认禁用
* **DNS-over-QUIC 查询**
  * **描述**：显示通过 DNS-over-QUIC 进行的 DNS 查询数量
  * **备注**：该实体默认禁用
* **DNS-over-QUIC 查询比率**
  * **描述**：显示通过 DNS-over-QUIC 进行的 DNS 查询的百分比
* **DNS-over-TLS 查询**
  * **描述**：显示通过 DNS-over-TLS 进行的 DNS 查询数量
  * **备注**：该实体默认禁用
* **DNS-over-TLS 查询比率**
  * **描述**：显示通过 DNS-over-TLS 进行的 DNS 查询的百分比
  * **备注**：该实体默认禁用
* **TCP 查询**
  * **描述**：显示通过 TCP 的 DNS 查询数量
  * **备注**：该实体默认禁用
* **TCP 查询比率**
  * **描述**：显示通过 TCP 进行的 DNS 查询的百分比
  * **备注**：该实体默认禁用
* **UDP查询**
  * **描述**：显示通过 UDP 的 DNS 查询数量
  * **备注**：该实体默认禁用
* **UDP查询率**
  * **描述**：显示通过 UDP 的 DNS 查询的百分比
  * **备注**：该实体默认禁用
* **加密查询**
  * **描述**：显示加密 DNS 查询的数量
  * **备注**：该实体默认禁用
* **加密查询比率**
  * **描述**：显示加密 DNS 查询的百分比
  * **备注**：该实体默认禁用
* **未加密的查询**
  * **描述**：显示未加密的 DNS 查询数量
  * **备注**：该实体默认禁用
* **IPv4 查询**
  * **描述**：显示通过 IPv4 的 DNS 查询数量
  * **备注**：该实体默认禁用
* **IPv6 查询**
  * **描述**：显示通过 IPv6 的 DNS 查询数量
  * **备注**：该实体默认禁用
* **IPv6 查询比率**
  * **描述**：显示通过 IPv6 进行的 DNS 查询的百分比
  * **备注**：该实体默认禁用
* **DNSSEC 验证的查询**
  * **描述**：显示 DNSSEC 验证的 DNS 查询数量
  * **备注**：该实体默认禁用
* **DNSSEC 验证的查询比率**
  * **描述**：显示由 DNSSEC 验证的 DNS 查询的百分比
  * **备注**：该实体默认禁用
* **DNSSEC 未验证查询**
  * **描述**：显示未经 DNSSEC 验证的 DNS 查询数量
  * **备注**：该实体默认禁用
* **转发 DNS 查询**
  * **描述**：显示中继 DNS 查询的数量

### Switches

* **AI-Driven threat detection**
  * **Description**: Controls AI-driven threat detection
* **Allow affiliate & tracking links**
  * **Description**: Controls affiliate and tracking links
* **Anonymized EDNS client subnet**
  * **Description**: Controls anonymized EDNS client subnet
* **Bypass age verification**
  * **Description**: Controls bypass of age verification pages
* **CNAME flattening**
  * **Description**: Controls CNAME flattening
* **Cryptojacking protection**
  * **Description**: Controls cryptojacking protection
* **Domain generation algorithms protection**
  * **Description**: Controls protection against domain generation algorithms
* **DNS rebinding protection**
  * **Description**: Controls DNS rebinding protection
* **Google safe browsing**
  * **Description**: Controls Google Safe Browsing protection
* **IDN homograph attacks protection**
  * **Description**: Controls protection against IDN homograph attacks
* **Logs**
  * **Description**: Controls log collection
* **Force SafeSearch**
  * **Description**: Controls SafeSearch enforcement
* **Typosquatting protection**
  * **Description**: Controls protection against typosquatting domains
* **Web3**
  * **Description**: Controls access to Web3 and crypto domains
* **Force YouTube restricted mode**
  * **Description**: Controls YouTube Restricted Mode enforcement
* **Block newly registered domains**
  * **Description**: Controls blocking of newly registered domains
* **Block bypass methods**
  * **Description**: Controls blocking of filter bypass methods
* **Block child sexual abuse material**
  * **Description**: Controls blocking of child sexual abuse material
* **Block dynamic DNS hostnames**
  * **Description**: Controls blocking of dynamic DNS hostnames
* **Block disguised third-party trackers**
  * **Description**: Controls blocking of disguised third-party trackers
* **Block page**
  * **Description**: Controls the display of the blocking page
* **Block online gaming**
  * **Description**: Controls blocking of online gaming
* **Block parked domains**
  * **Description**: Controls blocking of parked domains
* **Block piracy**
  * **Description**: Controls blocking of piracy websites
  * **Remarks**: This entity is disabled by default
* **Block porn**
  * **Description**: Controls blocking of pornographic content
  * **Remarks**: This entity is disabled by default
* **Block social networks**
  * **Description**: Controls blocking of social networks
  * **Remarks**: This entity is disabled by default
* **Block video streaming**
  * **Description**: Controls blocking of video streaming websites
  * **Remarks**: This entity is disabled by default
* **Block dating**
  * **Description**: Controls blocking of dating websites
  * **Remarks**: This entity is disabled by default
* **Block gambling**
  * **Description**: Controls blocking of gambling websites
  * **Remarks**: This entity is disabled by default
* **Block 9GAG**
  * **Description**: Controls 9GAG access
  * **Remarks**: This entity is disabled by default
* **Block Amazon**
  * **Description**: Controls Amazon access
  * **Remarks**: This entity is disabled by default
* **Block BeReal**
  * **Description**: Controls BeReal access
  * **Remarks**: This entity is disabled by default
* **Block Blizzard**
  * **Description**: Controls Blizzard access
  * **Remarks**: This entity is disabled by default
* **Block ChatGPT**
  * **Description**: Controls ChatGPT access
  * **Remarks**: This entity is disabled by default
* **Block Dailymotion**
  * **Description**: Controls Dailymotion access
  * **Remarks**: This entity is disabled by default
* **Block Discord**
  * **Description**: Controls Discord access
  * **Remarks**: This entity is disabled by default
* **Block Disney Plus**
  * **Description**: Controls Disney Plus access
  * **Remarks**: This entity is disabled by default
* **Block eBay**
  * **Description**: Controls eBay access
  * **Remarks**: This entity is disabled by default
* **Block Facebook**
  * **Description**: Controls Facebook access
  * **Remarks**: This entity is disabled by default
* **Block Fortnite**
  * **Description**: Controls Fortnite access
  * **Remarks**: This entity is disabled by default
* **Block Google Chat**
  * **Description**: Controls Google Chat access
  * **Remarks**: This entity is disabled by default
* **Block HBO Max**
  * **Description**: Controls HBO Max access
  * **Remarks**: This entity is disabled by default
* **Block Hulu**
  * **Description**: Controls Hulu access
  * **Remarks**: This entity is disabled by default
* **Block Imgur**
  * **Description**: Controls Imgur access
  * **Remarks**: This entity is disabled by default
* **Block Instagram**
  * **Description**: Controls Instagram access
  * **Remarks**: This entity is disabled by default
* **Block League of Legends**
  * **Description**: Controls League of Legends access
  * **Remarks**: This entity is disabled by default
* **Block Mastodon**
  * **Description**: Controls Mastodon access
  * **Remarks**: This entity is disabled by default
* **Block Messenger**
  * **Description**: Controls Facebook Messenger access
  * **Remarks**: This entity is disabled by default
* **Block Minecraft**
  * **Description**: Controls Minecraft access
  * **Remarks**: This entity is disabled by default
* **Block Netflix**
  * **Description**: Controls Netflix access
  * **Remarks**: This entity is disabled by default
* **Block Pinterest**
  * **Description**: Controls Pinterest access
  * **Remarks**: This entity is disabled by default
* **Block PlayStation Network**
  * **Description**: Controls PlayStation Network access
  * **Remarks**: This entity is disabled by default
* **Block Prime Video**
  * **Description**: Controls Prime Video access
  * **Remarks**: This entity is disabled by default
* **Block Reddit**
  * **Description**: Controls Reddit access
  * **Remarks**: This entity is disabled by default
* **Block Roblox**
  * **Description**: Controls Roblox access
  * **Remarks**: This entity is disabled by default
* **Block Signal**
  * **Description**: Controls Signal access
  * **Remarks**: This entity is disabled by default
* **Block Skype**
  * **Description**: Controls Skype access
  * **Remarks**: This entity is disabled by default
* **Block Snapchat**
  * **Description**: Controls Snapchat access
  * **Remarks**: This entity is disabled by default
* **Block Spotify**
  * **Description**: Controls Spotify access
  * **Remarks**: This entity is disabled by default
* **Block Steam**
  * **Description**: Controls Steam access
  * **Remarks**: This entity is disabled by default
* **Block Telegram**
  * **Description**: Controls Telegram access
  * **Remarks**: This entity is disabled by default
* **Block TikTok**
  * **Description**: Controls TikTok access
  * **Remarks**: This entity is disabled by default
* **Block Tinder**
  * **Description**: Controls Tinder access
  * **Remarks**: This entity is disabled by default
* **Block Tumblr**
  * **Description**: Controls Tumblr access
  * **Remarks**: This entity is disabled by default
* **Block Twitch**
  * **Description**: Controls Twitch access
  * **Remarks**: This entity is disabled by default
* **Block X (formerly Twitter)**
  * **Description**: Controls X (formerly Twitter) access
  * **Remarks**: This entity is disabled by default
* **Block Vimeo**
  * **Description**: Controls Vimeo access
  * **Remarks**: This entity is disabled by default
* **Block VK**
  * **Description**: Controls VK access
  * **Remarks**: This entity is disabled by default
* **Block WhatsApp**
  * **Description**: Controls WhatsApp access
  * **Remarks**: This entity is disabled by default
* **Block Xbox Network**
  * **Description**: Controls Xbox Network access
  * **Remarks**: This entity is disabled by default
* **Block YouTube**
  * **Description**: Controls YouTube access
  * **Remarks**: This entity is disabled by default
* **Block Zoom**
  * **Description**: Controls Zoom access
  * **Remarks**: This entity is disabled by default

## Data updates

By default, the integration polls data from the NextDNS API:

* Every 5 minutes for connection status data
* Every 10 minutes for analytics data
* Every 1 minute for settings

## Possible use-cases

* 监控来自本地网络或单个设备的 DNS 查询。
* 跟踪 DNS 查询协议以了解连接安全性。
* 通过安排对社交媒体、游戏和流媒体服务的访问来管理儿童的屏幕时间。

## Examples

### 阻止儿童社交媒体

这些自动化功能会在晚上阻止孩子个人资料的社交媒体访问，并在放学后解锁。

```yaml
automation:
  - alias: Block social media for kids in the evening
    triggers:
      - trigger: time
        at: "20:00:00"
    actions:
      - action: switch.turn_off
        target:
          entity_id: switch.kids_block_social_networks
  - alias: Unblock social media for kids after school
    triggers:
      - trigger: time
        at: "16:00:00"
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.kids_block_social_networks
```

## Known limitations

没有已知的限制。
