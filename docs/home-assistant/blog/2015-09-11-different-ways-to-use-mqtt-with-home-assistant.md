---
title: Using MQTT with Home Assistant
description: This post describes three different ways to use MQTT with Home Assistant.
---
# Using MQTT with Home Assistant

{::options coderay_line_numbers="table" /}

<img src='/home-assistant/images/supported_brands/mqtt.png' style='border:none; box-shadow: none; float: right;' height='80' /> 最近 Home Assistant 新增了 [MQTT](https://en.wikipedia.org/wiki/MQTT) 支持。[MQTT component](/home-assistant/integrations/MQTT/) 可以让你实现很多功能。最常见的用法是和你的设备通信。但只要支持 MQTT，Home Assistant 并不关心数据来源，也不局限于真实硬件。这意味着数据无论来自人、网络服务，还是设备，都可以使用。

一个很好的例子是本博客中的 [Laundry automation](/home-assistant/blog/2015/08/26/laundry-automation-with-moteino-MQTT-and-home-assistant/) 文章。

这篇文章会简要介绍一些在 Home Assistant 中使用 MQTT 的其他方式。

<!--more-->

## 手动使用

作为人工交互 Home Assistant 传感器，最简单但不算酷的方法就是手动执行命令。我们来创建一个“心情”传感器。为简化演示，Home Assistant 和 MQTT broker 都运行在同一台主机上。需要添加到 `configuration.yaml` 的配置片段分为两部分：一部分用于 broker，另一部分用于传感器。

```yaml
mqtt:
  broker: 127.0.0.1

sensor:
  - platform: mqtt
    name: "Fabian's Mood"
    state_topic: "home-assistant/fabian/mood"
```

重启 Home Assistant 后，“心情”传感器就会出现在前端。有关 MQTT 本身和传感器配置的更多细节，请参考 [MQTT component](/home-assistant/integrations/MQTT/) 或 [MQTT sensor](/home-assistant/integrations/sensor.MQTT/) 文档。

现在我们可以设置心情了。这里使用 `mosquitto` 自带的命令行工具 `mosquitto_pub` 来发送 MQTT 消息。

```bash
mosquitto_pub  -h 127.0.0.1 -t "home-assistant/fabian/mood" -m "bad"
```

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-mqtt/mood.png' />
  心情传感器
</p>

这是一个很差的示例。实际使用中不要这样做，因为你无法绘制历史数据图表。更好的做法是使用数值。

## Python MQTT 绑定

上一节确实有点无聊，我知道。桌上有电脑时，没人想手工发 MQTT 消息。如果你买彩票，这一节很适合你；如果不买也可以继续看，因为彩票只是示例 :-)。

这个示例使用 [Paho MQTT Python binding](https://eclipse.org/paho/clients/python/)，因为运行 Home Assistant 的主机上通常可以直接使用它。如果你想在另一台机器上运行这个示例，请先确认已安装该绑定（`pip3 install paho-mqtt`）。

第一步是在 `configuration.yaml` 中新增一个 MQTT 传感器。这个传感器命名为“Lottery”，计量单位为“No.”。

```yaml
  - platform: mqtt
    name: "Lottery"
    state_topic: "home-assistant/lottery/number"
    unit_of_measurement: "No."
```

别忘了重启 Home Assistant 以使配置生效。

要“选号”，我们需要 1 到 49 的数字，并在 Home Assistant 前端显示随机结果。下面这段 Python 脚本是另一个从命令行发送 MQTT 消息的简单示例，这次通过循环持续发送。更多信息和示例请查看 [Paho MQTT](https://eclipse.org/paho/clients/python/docs/) 文档。

```python
#!/usr/bin/python3
#
import time
import random
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish

broker = '127.0.0.1'
state_topic = 'home-assistant/lottery/number'
delay = 5

# Send a single message to set the mood
publish.single('home-assistant/fabian/mood', 'good', hostname=broker)

# Send messages in a loop
client = mqtt.Client("ha-client")
client.connect(broker)
client.loop_start()

while True:
    client.publish(state_topic, random.randrange(0, 50, 1))
    time.sleep(delay)
```

每 5 秒会向 broker 发送一条新数字消息，随后由 Home Assistant 接收。顺便说一句，我现在心情好多了。

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-mqtt/lottery.png' />
  彩票传感器
</p>

只需几行 Python 和一个 MQTT broker，你就可以创建自己的“智能设备”，或者把你想到的任意信息发送给 Home Assistant。当然这不限于 Python。只要有可用的 MQTT 库，这个设备就可以和 Home Assistant 配合使用。

## Arduino

如果你想从可发送 MQTT 消息的真实硬件入手，Arduino 平台是一个低成本选择。本节使用 Arduino UNO、以太网扩展板和一个光敏电阻。光敏电阻连接到模拟引脚 0（A0），输出范围为 0 到 1024。

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-mqtt/arduino-shield.png' />
  带以太网扩展板和光敏电阻的 Arduino UNO
</p>

你需要先在 Arduino IDE 中安装可用的 [MQTT client](http://knolleary.github.io/pubsubclient/)。下面这段 sketch 可以作为起点。请按需修改 IP 地址、MAC 地址和引脚，然后将 sketch 上传到你的 Arduino。

```c
/*
  This sketch is based on the basic MQTT example by
  http://knolleary.github.io/pubsubclient/
*/

#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>

#define DEBUG 1 // Debug output to serial console

// Device settings
IPAddress deviceIp(192, 168, 0, 43);
byte deviceMac[] = { 0xAB, 0xCD, 0xFE, 0xFE, 0xFE, 0xFE };
char* deviceId  = "sensor01"; // Name of the sensor
char* stateTopic = "home-assistant/sensor01/brightness"; // MQTT topic where values are published
int sensorPin = A0; // Pin to which the sensor is connected to
char buf[4]; // Buffer to store the sensor value
int updateInterval = 1000; // Interval in milliseconds

// MQTT server settings
IPAddress mqttServer(192, 168, 0, 12);
int mqttPort = 1883;

EthernetClient ethClient;
PubSubClient client(ethClient);

void reconnect() {
  while (!client.connected()) {
#if DEBUG
    Serial.print("Attempting MQTT connection...");
#endif
    if (client.connect(deviceId)) {
#if DEBUG
      Serial.println("connected");
#endif
    } else {
#if DEBUG
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
#endif
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(57600);
  client.setServer(mqttServer, mqttPort);
  Ethernet.begin(deviceMac, deviceIp);
  delay(1500);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  int sensorValue = analogRead(sensorPin);
#if DEBUG
  Serial.print("Sensor value: ");
  Serial.println(sensorValue);
#endif
  client.publish(stateTopic, itoa(sensorValue, buf, 10));
  delay(updateInterval);
}
```

Arduino 会每秒发送一次传感器值。要在 Home Assistant 中使用这些数据，请在 `configuration.yaml` 中再添加一个 MQTT 传感器。

```yaml
  - platform: mqtt
    name: "Brightness"
    state_topic: "home-assistant/sensor01/brightness"
    unit_of_measurement: "cd"
```

重启 Home Assistant 后，就可以看到来自 Arduino 的数值。

<p class='img'>
  <img src='/home-assistant/images/blog/2015-09-mqtt/arduino.png' />
  亮度传感器
</p>

希望这篇文章能给你一些关于 Home Assistant 与 MQTT 结合使用的灵感。如果你正在做包含 Home Assistant 的有趣项目，欢迎告诉我们。
