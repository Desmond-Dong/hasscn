---
title: ESP8266 与 MicroPython - 第 2 部分
description: '<img src=''/home-assistant/images/blog/2016-07-micropython/micropython.png'' style=''clear: right; border:none; box-shadow: none; float: right。'
---
# ESP8266 与 MicroPython - 第 2 部分

<img src='/home-assistant/images/blog/2016-07-micropython/micropython.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' />
那么，[ESP8266 与 MicroPython](/home-assistant/blog/2016/07/28/esp8266-and-micropython-part1/) 的第 1 部分是不是有点不过瘾？这次我们更进一步：不再只是从 Home Assistant 取数据，而是创建我们自己的传感器，把它的状态详情主动发送到 Home Assistant 实例。

<!--more-->

除了 [HTTP POST](https://en.wikipedia.org/wiki/POST_(HTTP)) 请求，从作者视角看，MQTT 是 DIY 设备发布信息最快捷的方式。

你需要做一个选择：传感器数据是由系统去拉取，还是通过 [轮询](https://en.wikipedia.org/wiki/Polling_(computer_science)) 获取？对于温度这种变化较慢的值，隔几秒读取一次完全没问题。但如果是人体移动传感器，状态变化就应该立刻在 Home Assistant 中可见，否则可能会漏掉事件。这意味着传感器必须主动把数据发送给 Home Assistant。

“拉取”模式的一个示例是 [aREST](/home-assistant/integrations/arest#sensor)。这是一种让 ESP8266 设备配合 Arduino IDE 工作的好方法。

## MQTT

你可以在 [MicroPython](https://github.com/micropython/micropython-lib) 库概览中的 [umqtt](https://github.com/micropython/micropython-lib/tree/master/micropython/umqtt.simple) 章节找到 MQTT 发布与订阅的简单示例。

下面的示例改编自 [@davea](https://github.com/davea) 的工作成果，我们不想重复造轮子。这个配置方案很巧妙：通过 `/config.json` 文件保存配置细节，从而简化代码。ESP8266 设备会每 5 秒发送一次某个引脚的值。

```python
import machine
import time
import ubinascii
import webrepl

from umqtt.simple import MQTTClient

# These defaults are overwritten with the contents of /config.json by load_config()
CONFIG = {
    "broker": "192.168.1.19",
    "sensor_pin": 0,
    "client_id": b"esp8266_" + ubinascii.hexlify(machine.unique_id()),
    "topic": b"home",
}

client = None
sensor_pin = None

def setup_pins():
    global sensor_pin
    sensor_pin = machine.ADC(CONFIG['sensor_pin'])

def load_config():
    import ujson as json
    try:
        with open("/config.json") as f:
            config = json.loads(f.read())
    except (OSError, ValueError):
        print("Couldn't load /config.json")
        save_config()
    else:
        CONFIG.update(config)
        print("Loaded config from /config.json")

def save_config():
    import ujson as json
    try:
        with open("/config.json", "w") as f:
            f.write(json.dumps(CONFIG))
    except OSError:
        print("Couldn't save /config.json")

def main():
    client = MQTTClient(CONFIG['client_id'], CONFIG['broker'])
    client.connect()
    print("Connected to {}".format(CONFIG['broker']))
    while True:
        data = sensor_pin.read()
        client.publish('{}/{}'.format(CONFIG['topic'],
                                          CONFIG['client_id']),
                                          bytes(str(data), 'utf-8'))
        print('Sensor state: {}'.format(data))
        time.sleep(5)

if __name__ == '__main__':
    load_config()
    setup_pins()
    main()
```

订阅 `home/#` 主题，或者创建一个 [MQTT sensor](/home-assistant/integrations/sensor.MQTT/)，即可检查传感器值是否已发布。

```bash
mosquitto_sub -h 192.168.1.19 -v -t "home/#"
```

```yaml
sensor:
  - platform: mqtt
    state_topic: "home/esp8266_[last part of the MAC address]"
    name: "MicroPython"
```

[@davea](https://github.com/davea) 还创建了 [sonoff-MQTT](https://github.com/davea/sonoff-MQTT)。这份代码同样适用于基于 ESP8622 的设备，并展示了如何用按钮控制继电器。
