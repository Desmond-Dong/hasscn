# Sony Songpal

The **Sony Songpal** integration allows you to control Sony's Songpal ("[Audio Control API](https://developer.sony.com/develop/audio-control-api/)") compatible devices such as soundbars, AV receivers and wireless speakers from Home Assistant.

Even when the API officially supports only a few devices (HT-ST5000, HT-MT500, HT-CT800, SRS-ZR5 and STR-DN1080), it has also been confirmed to work on others. [The list of supported devices](https://vssupport.sony.net/en_ww/device.html) from Sony's Songpal website lists devices which are likely to be compatible with this platform.

If the platform works with your non-listed device, or you encounter bugs, please feel free to [report them upstream](https://github.com/rytilahti/python-songpal).

A few notes:

* The quick start-up mode has to be enabled in order to turn the device on.
* Supports currently only one output terminal, i.e., the volume control works only on the first volume controller as reported by the backend library.
* Some devices, e.g., HT-XT3, do not support decreasing the volume step-by-step correctly.
* Feel free to improve the available actions!

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

See [python-songpal's documentation](https://github.com/rytilahti/python-songpal#locating-the-endpoint) how to get your API endpoint.

## Actions

In addition to the general [media player actions](/home-assistant/integrations/media_player/index.md#actions), the following actions are provided:

### Action: Set sound setting

The `songpal.set_sound_setting` action sets a sound setting. For a list of available settings and their values use the [`songpal sound`](https://github.com/rytilahti/python-songpal#sound-settings) command.

| Data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `entity_id`            |      yes | Target entity. To target all songpal devices, use `all` |
| `name`                 |       no | Configuration variable, e.g., `nightmode`         |
| `value`                |       no | New configuration value, e.g., `on`               |
