# Introducing Hass.io Ingress

Today we are proud to introduce a new feature for Hass.io called Ingress. Ingress allows Hass.io 插件 to seamlessly integrate their 用户 interface with Home Assistant. Home Assistant will take care of the 认证 and the secure connection, so 用户 can start using the 插件 directly, without any 配置 necessary by the 用户. It just works. Even with Nabu Casa’s Home Assistant Cloud 遥控器 UI!

<p class='img'>
<img src='/home-assistant/images/blog/2019-04-hassio-ingress/ingress-demo.gif' alt='Ingress demo on Hass.io'>
Demo with an 插件 on Ingress.
</p>

## 插件 that already support Ingress

Some 插件 already have been upgraded to support the new Ingress feature. Here are a couple of 插件 that support Ingress and are available on the 插件 store right now:

核心 插件:

* [Configurator](/home-assistant/addons/configurator/)
* [deCONZ](https://github.com/home-assistant/hassio-addons/tree/master/deconz#readme)

Community 插件:

* [Node-RED](https://github.com/hassio-addons/addon-node-red#readme)
* [Visual Studio Code](https://github.com/hassio-addons/addon-vscode#readme)
* [InfluxDB](https://github.com/hassio-addons/addon-influxdb#readme)
* [SSH & Web Terminal](https://github.com/hassio-addons/addon-ssh#readme)
* [AdGuard Home](https://github.com/hassio-addons/addon-adguard-home#readme)

You can recognize 插件 that support the Ingress feature by the Ingress icon on the 插件 information tab:

<p class='img'>
<img src='/home-assistant/images/blog/2019-04-hassio-ingress/ingress_sign.png' alt='插件 view with Ingress support'>
Screenshot of an 插件 view with ingress support.
</p>

Please note, that in order to 升级 or 安装 these Ingress enabled 插件, you need to be running Home Assistant 0.91.3.

## What’s next

Releasing the Ingress feature is just a start. It allows us to make even better 集成 in the future. For the upcoming Home Assistant 0.92 发布, we will be adding support to add links to your 插件 to the Home Assistant 侧边栏 via a 切换 on the 插件 details page. The link will open the 插件 Ingress interface, embedding the 插件 in the Home Assistant UI. This will make it look and feel like a single system.

## Other new things

While adding Ingress support, we have tweaked and polished some other things in the Hass.io 用户 interface:

* Network ports in the 插件 view now have a description, so you know what they are being used for.
* Reloading the 插件 store will now show a spinner to indicate that reloading is being done.

## For 插件 开发者

Ingress is added as an additional feature that 插件 authors can choose to support starting today, granted that the application in the 插件 supports it. The old approach of exposing 插件 on different ports will remain available. It will be up to 插件 authors to choose what to support, including an option to support both.

If an 插件 is going to support both, you should not have the 插件 exposed on a port enabled by default. Instead, allow 用户 to enable the port access by assigning a port number in the “Network” section of the 插件 配置 面板.

Are you an 插件 developer looking to support Ingress on your 插件? [Check the developer 文档][dev-docs].

## 常见问题 & 已知问题

Hass.io Ingress is a new and complex technology. Without a doubt, now that everybody starts using it, we will discover new issues. Here are some frequently asked questions and some currently 已知问题 with the Ingress feature.

* **After upgrading the 插件, I’m unable to access it directly.**<br>
  Direct access to the 插件 might now be disabled by default by the 插件 developer. If the 插件 supports running Ingress + direct access, you can re-enable direct access by setting a port number in the “Network” section of the 插件 配置.

* **After upgrading the 插件, my `panel_iframe` doesn’t work anymore.**<br>
  This is related to the question above. Once you enable direct access again, your iFrame 面板 will start working again. Until the automated 面板 集成 lands in 0.92, you can also manually add a 面板 that points at Ingress.

* **I cannot 升级 my 插件: “This 更新 is no longer compatible with your system.”**<br>
  Please 更新 your Home Assistant 安装 to 0.91.3 or higher.

* **I cannot access the 插件 via Ingress using the Tor Browser or Firefox.**<br>
  We found a last minute issue impacting Firefox based browsers (including the Tor Browser). There are some issues accessing 插件 that use WebSockets. We have identified the issue and expect it to be solved with the 发布 of Home Assistant 0.91.4.

[Configurator]: /插件/configurator/

[deCONZ]: https://github.com/home-assistant/hassio-addons/tree/master/deconz#readme

[Node-RED]: https://github.com/hassio-addons/addon-node-red#readme

[Visual Studio Code]: https://github.com/hassio-addons/addon-vscode#readme

[InfluxDB]: https://github.com/hassio-addons/addon-influxdb#readme

[SSH & Web Terminal]: https://github.com/hassio-addons/addon-ssh#readme

[AdGuard Home]: https://github.com/hassio-addons/addon-adguard-home#readme

[dev-docs]: https://开发者.home-assistant.io/docs/apps/presentation/#ingress
