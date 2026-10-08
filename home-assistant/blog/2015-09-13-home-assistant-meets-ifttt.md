# Home Assistant meets IFTTT

今天我们发布 Home Assistant v0.7.2，其中包含由 [@sfam][github-sfam] 带来的全新 [IFTTT][ifttt] 集成支持。IFTTT 的全称是 If This, Then That，它是一个几乎能连接所有网络服务的 Web 服务。把 Home Assistant 加入这个生态后，Home Assistant 就能通过 IFTTT 与这些服务互联。

现在你可以在明天预报多云时禁用灌溉系统，或者在烟雾报警触发时自动发推。

[github-sfam]: https://github.com/sfam

[ifttt]: https://ifttt.com

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-ifttt/splash.png'>
</p>

前往 [设置说明](/home-assistant/integrations/ifttt/index.md) 即可开始使用 IFTTT。点击“阅读更多”按钮可查看一些示例配方。

<!--more-->

在下面每个示例中，请将 URL 里的 XXX 替换为你正确的主机地址和 API 密码。

## 不需要时关闭灌溉系统

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-ifttt/recipe-weather.png' />
</p>

Maker channel 设置：

| Field | Value |
| ----- | ----- |
| URL   |  `http://xxx.xxx.xxx.xxx:8123/api/services/switch/turn_off?api_password=xxxxxxxx`
| METHOD | POST
| CONTENT TYPE | application/json
| BODY | { "entity\_id": "开关.irrigation" }

## 重要事件发生时发推

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-ifttt/recipe-twitter.png' />
</p>

当收到表示烟雾报警已触发的 MQTT 消息时，这个配方会发出一条推文。请将 Maker channel 的事件名设置为 `HA_FIRE_ALARM`，并让 Twitter channel 发出 `value1` 中的消息。

```yaml
# Configuration.yaml entry
automation:
- alias: "Post a tweet when fire alarm is triggered"
  trigger:
    platform: mqtt
    mqtt_topic: home/alarm/fire
    mqtt_payload: "on"

  action:
    service: ifttt.trigger
    data: {"event":"HA_FIRE_ALARM", "value1":"The fire alarm just triggered!"}
```

## 我回家时打开灯光

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-ifttt/recipe-geo.png' />
</p>

Maker channel 设置：

| Field | Value |
| ----- | ----- |
| URL   |  `http://xxx.xxx.xxx.xxx:8123/api/services/light/turn_on?api_password=xxxxxxxx`
| METHOD | POST
| CONTENT TYPE | application/json
| BODY | { "entity\_id": "灯光.kitchen" }

## Home Assistant 有新 PR 时闪烁灯光

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-ifttt/recipe-github.png' />
</p>

Maker channel 设置：

| Field | Value |
| ----- | ----- |
| URL   |  `http://xxx.xxx.xxx.xxx:8123/api/services/light/turn_on?api_password=xxxxxxxx`
| METHOD | POST
| CONTENT TYPE | application/json
| BODY | { "entity\_id": "group.all\_lights", "flash":"yes" }

## 按下 DO 按钮时触发事件

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-ifttt/recipe-do.png' />
</p>

Maker channel 设置：

| Field | Value |
| ----- | ----- |
| URL   |  http://xxx.xxx.xxx.xxx:8123/api/events/do\_button\_pressed?api\_password=xxxxxxxx
| METHOD | POST
| CONTENT TYPE | application/json
