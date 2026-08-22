# NYT Games

The [NYT Games](https://www.nytimes.com/crosswords) integration fetches data about your progress on their daily puzzles.

## Prerequisites

在设置集成之前，您需要从浏览器的开发工具中获取令牌。

1. 在您的计算机上，转到 [NYT Games](https://www.nytimes.com/crosswords)。
2. 使用您的帐户登录。
3. 通过右键单击或按 F12 打开开发人员工具。
4. 打开网络选项卡并刷新页面。
5. 选择名称中包含“.json”的请求，然后转到 cookie 选项卡。
6. 可以在“NYT-S”cookie 中找到该令牌。

## Configuration

To add the **NYT Games** service to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nyt_games)

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nyt_games).
* From the list, select **NYT Games**.
* Follow the instructions on screen to complete the setup.

</details>
