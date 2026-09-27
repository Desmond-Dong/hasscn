# Why Home Assistant doesn't have an external API for 集成

Home Assistant is the world’s largest home 自动化 platform talking with [over 1900 different 设备 and 服务](/home-assistant/integrations/index.md). Home Assistant works with these via “integrations”.

Each 集成 runs inside Home Assistant. They convert the data from the 设备 into data that Home Assistant understands and forward commands from Home Assistant back to the 设备. For this to work a 设备 or 服务 needs to have an application programming interface (API).

It is not possible for a 设备 or 服务 to provide 灯光, 开关 or other 设备 types via the Home Assistant API without an 集成. It can be faked, but it won’t work correctly. We explicitly did not add this feature because of interoperability.

If Home Assistant were to offer this option, 设备 and 服务 would no longer be required to create an API for control – they could just implement ours. This creates vendor 门锁-in, 门锁 other home 自动化 platforms out and hurts the open Internet of Things ecosystem.

You should be able to access your data from your 设备 without any restrictions. Requiring a specific application to get to your data is not the solution.

Our goal is a home where all smart 设备 can be managed locally.

This stance will hurt us in the short term because we get less 集成. It is more work for a manufacturer to create an API and a Home Assistant 集成.

In the long term the user will win. 设备 with local APIs will still work 10 years from now and no one will be held hostage by vendor 门锁-in because some of their 设备 only work with Home Assistant.

*Note about Home Assistant APIs: Home Assistant does have [an API](https://开发者.home-assistant.io/docs/api/websocket/), just not for integrations. It allows you to access all your data in real-time. We also have a [data science portal](https://data.home-assistant.io/) that documents how you can query the historical data stored on disk.*
