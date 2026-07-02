# TRIGGERcmd

The **TRIGGERcmd** integration allows you to run commands on computers via [TRIGGERcmd](https://triggercmd.com/) with Home Assistant.

## Prerequisites

To use TRIGGERcmd, you need the following:

* A [TRIGGERcmd account](https://www.triggercmd.com/user/auth/signup)
* A computer with the TRIGGERcmd agent running on it
* For instructions on installing and using TRIGGERcmd itself, refer to the [TRIGGERcmd Quick Start Guide](https://docs.triggercmd.com/#/./QuickStart).
* After adding the TRIGGERcmd integration, you will be prompted for your **user token**. This can be found at the bottom of your TRIGGERcmd profile page or the instructions page.

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Using TRIGGERcmd with Home Assistant

All of your TRIGGERcmd commands should show up as **switch** devices. You can change the rooms of your devices, or select **Finish** to leave them without rooms.

Using the switch will trigger the respective command. If you have **Allow parameters** enabled, your command will run with an "on" or "off" parameter, depending on whether you flip the switch in Home Assistant on or off.
