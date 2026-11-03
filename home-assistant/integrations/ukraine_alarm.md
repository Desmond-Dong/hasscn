# Ukraine Alarm

The **Ukraine Alarm** integration uses the siren.pp.ua API - public wrapper for [Ukraine Alarm](https://www.ukrainealarm.com/) web service to offer air-raid siren notifications. The integration will create 6 binary sensors for your selected region in Ukraine:

* Air
* Artillery
* Chemical
* Nuclear
* Urban Fights
* Unknown

Siren check interval is set to 10 seconds to avoid overloading the API and still be able to react fast enough.

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Limitations

You can monitor up to 5 regions to not hit the API rate limit.
