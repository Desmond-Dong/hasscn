# Samsung Smart TV

The **Samsung Smart TV** integration allows you to control a [Samsung Smart TV](https://www.samsung.com/uk/tvs/all-tvs/).

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
  host:
    description: The IP address of the TV.
  name:
    description: The friendly name of the TV.
```

## Data updates

The **SamsungTV** integration uses a local REST API with a WebSocket notification channel for immediate state information for media metadata, playback progress, volume etc.

### Turn on action

If the integration knows the MAC address of the TV from discovery, it will attempt to wake it using wake on LAN when calling turn on. Wake on LAN must be enabled on the TV for this to work. If the TV is connected to a smart strip or requires a more complex turn-on process, a `turn_on` action can be provided that will take precedence over the built-in wake on LAN functionality.

You can create an automation from the user interface, from the device create a new automation and select the  **Device is requested to turn on** automation.
Automations can also be created using an automation action:

```yaml
# Example configuration.yaml entry
wake_on_lan: # enables `wake_on_lan` integration

automation:
  - alias: "Turn On Living Room TV with WakeOnLan"
    triggers:
      - trigger: samsungtv.turn_on
        entity_id: media_player.samsung_smart_tv
    actions:
      - action: wake_on_lan.send_magic_packet
        data:
          mac: aa:bb:cc:dd:ee:ff
```

Any other [actions](/home-assistant/docs/automation/action/index.md) to power on the device can be configured.

### Usage

#### Changing channels

Changing channels can be done by calling the `media_player.play_media` action
with the following payload:

```yaml
entity_id: media_player.samsung_tv
media_content_id: 590
media_content_type: channel
```

#### Selecting a source

It's possible to switch between the 2 sources `TV` and `HDMI`.
Some older models also expose the installed applications through the WebSocket, in which case the source list is adjusted accordingly.

### Remote

The integration supports the `remote` platform. The remote allows you to send key commands to your TV with the `remote.send_command` action. The supported keys vary between TV models.

<details>
<summary>Full keycodes list</summary>

#### Power Keys

Key|Description
\---|-----------
KEY\_POWEROFF|PowerOFF
KEY\_POWERON|PowerOn
KEY\_POWER|PowerToggle

***

#### Input Keys

Key|Description
\---|-----------
KEY\_SOURCE|Source
KEY\_COMPONENT1|Component1
KEY\_COMPONENT2|Component2
KEY\_AV1|AV1
KEY\_AV2|AV2
KEY\_AV3|AV3
KEY\_SVIDEO1|SVideo1
KEY\_SVIDEO2|SVideo2
KEY\_SVIDEO3|SVideo3
KEY\_HDMI|HDMI
KEY\_FM\_RADIO|FMRadio
KEY\_DVI|DVI
KEY\_DVR|DVR
KEY\_TV|TV
KEY\_ANTENA|AnalogTV
KEY\_DTV|DigitalTV
KEY\_AMBIENT|AmbientMode

***

#### Number Keys

Key|Description
\---|-----------
KEY\_1|Key1
KEY\_2|Key2
KEY\_3|Key3
KEY\_4|Key4
KEY\_5|Key5
KEY\_6|Key6
KEY\_7|Key7
KEY\_8|Key8
KEY\_9|Key9
KEY\_0|Key0

***

#### Misc Keys

Key|Description
\---|-----------
KEY\_PANNEL\_CHDOWN|3D
KEY\_ANYNET|AnyNet+
KEY\_ESAVING|EnergySaving
KEY\_SLEEP|SleepTimer
KEY\_DTV\_SIGNAL|DTVSignal

***

#### Channel Keys

Key|Description
\---|-----------
KEY\_CHUP|ChannelUp
KEY\_CHDOWN|ChannelDown
KEY\_PRECH|PreviousChannel
KEY\_FAVCH|FavoriteChannels
KEY\_CH\_LIST|ChannelList
KEY\_AUTO\_PROGRAM|AutoProgram
KEY\_MAGIC\_CHANNEL|MagicChannel

***

#### Volume Keys

Key|Description
\---|-----------
KEY\_VOLUP|VolumeUp
KEY\_VOLDOWN|VolumeDown
KEY\_MUTE|Mute

***

#### Direction Keys

Key|Description
\---|-----------
KEY\_UP|NavigationUp
KEY\_DOWN|NavigationDown
KEY\_LEFT|NavigationLeft
KEY\_RIGHT|NavigationRight
KEY\_RETURN|NavigationReturn/Back
KEY\_ENTER|NavigationEnter
KEY\_EXIT|NavigationExit

***

#### Media Keys

Key|Description
\---|-----------
KEY\_REWIND|Rewind
KEY\_STOP|Stop
KEY\_PLAY|Play
KEY\_FF|FastForward
KEY\_REC|Record
KEY\_PAUSE|Pause
KEY\_LIVE|Live
KEY\_QUICK\_REPLAY|fnKEY\_QUICK\_REPLAY
KEY\_STILL\_PICTURE|fnKEY\_STILL\_PICTURE
KEY\_INSTANT\_REPLAY|fnKEY\_INSTANT\_REPLAY

***

#### Picture in Picture

Key|Description
\---|-----------
KEY\_PIP\_ONOFF|PIPOn/Off
KEY\_PIP\_SWAP|PIPSwap
KEY\_PIP\_SIZE|PIPSize
KEY\_PIP\_CHUP|PIPChannelUp
KEY\_PIP\_CHDOWN|PIPChannelDown
KEY\_AUTO\_ARC\_PIP\_SMALL|PIPSmall
KEY\_AUTO\_ARC\_PIP\_WIDE|PIPWide
KEY\_AUTO\_ARC\_PIP\_RIGHT\_BOTTOM|PIPBottomRight
KEY\_AUTO\_ARC\_PIP\_SOURCE\_CHANGE|PIPSourceChange
KEY\_PIP\_SCAN|PIPScan

***

#### Modes

Key|Description
\---|-----------
KEY\_VCR\_MODE|VCRMode
KEY\_CATV\_MODE|CATVMode
KEY\_DSS\_MODE|DSSMode
KEY\_TV\_MODE|TVMode
KEY\_DVD\_MODE|DVDMode
KEY\_STB\_MODE|STBMode
KEY\_PCMODE|PCMode

***

#### Color Keys

Key|Description
\---|-----------
KEY\_GREEN|Green
KEY\_YELLOW|Yellow
KEY\_CYAN|Cyan
KEY\_RED|Red

***

#### Teletext

Key|Description
\---|-----------
KEY\_TTX\_MIX|TeletextMix
KEY\_TTX\_SUBFACE|TeletextSubface

***

#### AspectRatio

Key|Description
\---|-----------
KEY\_ASPECT|AspectRatio
KEY\_PICTURE\_SIZE|PictureSize
KEY\_4\_3|AspectRatio4:3
KEY\_16\_9|AspectRatio16:9
KEY\_EXT14|AspectRatio3:4(Alt)
KEY\_EXT15|AspectRatio16:9(Alt)

***

#### Picture Mode

Key|Description
\---|-----------
KEY\_PMODE|PictureMode
KEY\_PANORAMA|PictureModePanorama
KEY\_DYNAMIC|PictureModeDynamic
KEY\_STANDARD|PictureModeStandard
KEY\_MOVIE1|PictureModeMovie
KEY\_GAME|PictureModeGame
KEY\_CUSTOM|PictureModeCustom
KEY\_EXT9|PictureModeMovie(Alt)
KEY\_EXT10|PictureModeStandard(Alt)

***

#### Menus

Key|Description
\---|-----------
KEY\_MENU|Menu
KEY\_TOPMENU|TopMenu
KEY\_TOOLS|Tools
KEY\_HOME|Home
KEY\_CONTENTS|Contents
KEY\_GUIDE|Guide
KEY\_DISC\_MENU|DiscMenu
KEY\_DVR\_MENU|DVRMenu
KEY\_HELP|Help

***

#### OSD

Key|Description
\---|-----------
KEY\_INFO|Info
KEY\_CAPTION|Caption
KEY\_CLOCK\_DISPLAY|ClockDisplay
KEY\_SETUP\_CLOCK\_TIMER|SetupClock
KEY\_SUB\_TITLE|Subtitle

***

#### Zoom

Key|Description
\---|-----------
KEY\_ZOOM\_MOVE|ZoomMove
KEY\_ZOOM\_IN|ZoomIn
KEY\_ZOOM\_OUT|ZoomOut
KEY\_ZOOM1|Zoom1
KEY\_ZOOM2|Zoom2

***

#### Other Keys

Key|Description
\---|-----------
KEY\_WHEEL\_LEFT|WheelLeft
KEY\_WHEEL\_RIGHT|WheelRight
KEY\_ADDDEL|Add/Del
KEY\_PLUS100|Plus100
KEY\_AD|AD
KEY\_LINK|Link
KEY\_TURBO|Turbo
KEY\_CONVERGENCE|Convergence
KEY\_DEVICE\_CONNECT|DeviceConnect
KEY\_11|Key11
KEY\_12|Key12
KEY\_FACTORY|KeyFactory
KEY\_3SPEED|Key3SPEED
KEY\_RSURF|KeyRSURF
KEY\_FF\_|FF\_
KEY\_REWIND\_|REWIND\_
KEY\_ANGLE|Angle
KEY\_RESERVED1|Reserved1
KEY\_PROGRAM|Program
KEY\_BOOKMARK|Bookmark
KEY\_PRINT|Print
KEY\_CLEAR|Clear
KEY\_VCHIP|VChip
KEY\_REPEAT|Repeat
KEY\_DOOR|Door
KEY\_OPEN|Open
KEY\_DMA|DMA
KEY\_MTS|MTS
KEY\_DNIe|DNIe
KEY\_SRS|SRS
KEY\_CONVERT\_AUDIO\_MAINSUB|ConvertAudioMain/Sub
KEY\_MDC|MDC
KEY\_SEFFECT|SoundEffect
KEY\_PERPECT\_FOCUS|PERPECTFocus
KEY\_CALLER\_ID|CallerID
KEY\_SCALE|Scale
KEY\_MAGIC\_BRIGHT|MagicBright
KEY\_W\_LINK|WLink
KEY\_DTV\_LINK|DTVLink
KEY\_APP\_LIST|ApplicationList
KEY\_BACK\_MHP|BackMHP
KEY\_ALT\_MHP|AlternateMHP
KEY\_DNSe|DNSe
KEY\_RSS|RSS
KEY\_ENTERTAINMENT|Entertainment
KEY\_ID\_INPUT|IDInput
KEY\_ID\_SETUP|IDSetup
KEY\_ANYVIEW|AnyView
KEY\_MS|MS
KEY\_MORE|
KEY\_MIC|
KEY\_NINE\_SEPERATE|
KEY\_AUTO\_FORMAT|AutoFormat
KEY\_DNET|DNET
KEY\_MINUS|Minus

***

#### Auto Arc Keys

Key|Description
\---|-----------
KEY\_AUTO\_ARC\_C\_FORCE\_AGING|
KEY\_AUTO\_ARC\_CAPTION\_ENG|
KEY\_AUTO\_ARC\_USBJACK\_INSPECT|
KEY\_AUTO\_ARC\_RESET|
KEY\_AUTO\_ARC\_LNA\_ON|
KEY\_AUTO\_ARC\_LNA\_OFF|
KEY\_AUTO\_ARC\_ANYNET\_MODE\_OK|
KEY\_AUTO\_ARC\_ANYNET\_AUTO\_START|
KEY\_AUTO\_ARC\_CAPTION\_ON|
KEY\_AUTO\_ARC\_CAPTION\_OFF|
KEY\_AUTO\_ARC\_PIP\_DOUBLE|
KEY\_AUTO\_ARC\_PIP\_LARGE|
KEY\_AUTO\_ARC\_PIP\_LEFT\_TOP|
KEY\_AUTO\_ARC\_PIP\_RIGHT\_TOP|
KEY\_AUTO\_ARC\_PIP\_LEFT\_BOTTOM|
KEY\_AUTO\_ARC\_PIP\_CH\_CHANGE|
KEY\_AUTO\_ARC\_AUTOCOLOR\_SUCCESS|
KEY\_AUTO\_ARC\_AUTOCOLOR\_FAIL|
KEY\_AUTO\_ARC\_JACK\_IDENT|
KEY\_AUTO\_ARC\_CAPTION\_KOR|
KEY\_AUTO\_ARC\_ANTENNA\_AIR|
KEY\_AUTO\_ARC\_ANTENNA\_CABLE|
KEY\_AUTO\_ARC\_ANTENNA\_SATELLITE|

***

#### Panel Keys

Key|Description
\---|-----------
KEY\_PANNEL\_POWER|
KEY\_PANNEL\_CHUP|
KEY\_PANNEL\_VOLUP|
KEY\_PANNEL\_VOLDOW|
KEY\_PANNEL\_ENTER|
KEY\_PANNEL\_MENU|
KEY\_PANNEL\_SOURCE|
KEY\_PANNEL\_ENTER|

***

#### Extended Keys

Key|Description
\---|-----------
KEY\_EXT1|
KEY\_EXT2|
KEY\_EXT3|
KEY\_EXT4|
KEY\_EXT5|
KEY\_EXT6|
KEY\_EXT7|
KEY\_EXT8|
KEY\_EXT11|
KEY\_EXT12|
KEY\_EXT13|
KEY\_EXT16|
KEY\_EXT17|
KEY\_EXT18|
KEY\_EXT19|
KEY\_EXT20|
KEY\_EXT21|
KEY\_EXT22|
KEY\_EXT23|
KEY\_EXT24|
KEY\_EXT25|
KEY\_EXT26|
KEY\_EXT27|
KEY\_EXT28|
KEY\_EXT29|
KEY\_EXT30|
KEY\_EXT31|
KEY\_EXT32|
KEY\_EXT33|
KEY\_EXT34|
KEY\_EXT35|
KEY\_EXT36|
KEY\_EXT37|
KEY\_EXT38|
KEY\_EXT39|
KEY\_EXT40|
KEY\_EXT41|

Please note that some codes are different on the 2016+ TVs. For example, `KEY_POWEROFF` is `KEY_POWER` on the newer TVs.

The code list has been extracted from: <https://github.com/kdschlosser/samsungctl> and <https://github.com/jaruba/ha-samsungtv-tizen/blob/master/Key_codes.md>

</details>

**Example to send sequence of commands:**

```yaml
action: remote.send_command
target:
  device_id: 72953f9b4c9863e28ddd52c87dcebe05
data:
  command:
    - KEY_MENU
    - KEY_RIGHT
    - KEY_UP
    - KEY_UP
    - KEY_ENTER

```

### Known issues and restrictions

#### Subnet/VLAN

Samsung SmartTV does not allow WebSocket connections across different subnets or VLANs. If your TV is not on the same subnet as Home Assistant this will fail.
It may be possible to bypass this issue by using IP masquerading or a proxy.

#### H and J models

Some televisions from the H and J series use an encrypted protocol and require manual pairing with the TV. This should be detected automatically when attempting to send commands using the WebSocket connection, and trigger the corresponding authentication flow.

#### Samsung TV keeps asking for permission

The default setting on newer televisions is to ask for permission on every connection attempt.
To avoid this behavior, please ensure that you adjust this to `First time only` in the `Device connection manager > Access notification` settings of your television.
It is also recommended to cleanup the previous attempts in `Device connection manager > Device list`

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
