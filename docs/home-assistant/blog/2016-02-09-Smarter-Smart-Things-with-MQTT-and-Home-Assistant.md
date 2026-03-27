---
title: 通过 MQTT 和 Home Assistant 让 SmartThings 更聪明
description: '这是一篇由 Home Assistant 用户 Jeremiah Wuenschel(https://github.com/jer) 和 St. John Johnson(https://github.com/stjohnjohnson) 撰写的客座文章。'
---
# 通过 MQTT 和 Home Assistant 让 SmartThings 更聪明

_这是一篇由 Home Assistant 用户 [Jeremiah Wuenschel](https://github.com/jer) 和 [St. John Johnson](https://github.com/stjohnjohnson) 撰写的客座文章。_

如果你拥有一个 [SmartThings][smartthings] Hub，你很可能是在刚接触家庭自动化爱好时买下它的，因为它几乎什么都能配合使用，而且还能让你自动化 _任何事情_。不过，拥有它一周之后，你可能发现，构建仪表板和编写自动化所需要写的 Groovy 代码比你预想的要多得多。后来有一天，你在浏览 [reddit][r/homeautomation] 时发现了强大的 Home Assistant！它提供了仪表板、图表、可用的 Nest 支持，以及真正容易上手的自动化功能。

你花了整个周末把一切都配置好，也向另一半展示了一番，但最后还是卡在了如何把已有的 SmartThings 设备接入进来。现在该怎么办？要不要再买一个 Hub？还是干脆买一个 Z-Wave 棒？

这正是我们介入的原因。我们想要一个方案，把 Home Assistant 的强大体验，与几乎兼容一切的 SmartThings Hub 连接起来。

@ @ PH0 @ @
  @ @ PH0 @ @
@ @ PH0 @ @

@ @ PH0 @ @

## 术语表

这会是一篇相当详细的教程，介绍如何搭建我们的 SmartThings 桥接方案。不过其中有几个关键术语，你可能还不太熟悉：

- [MQTT][MQTT]：一种轻量级消息协议，用于监听和发布事件。许多家庭自动化平台都内置了对它的支持，[Home Assistant 尤其如此][MQTT-ha]。
- [Docker][Docker]：一种运行自包含应用程序的工具。你无需安装一堆依赖，也不用担心冲突问题。它在 Linux 和 macOS 上都很容易安装。

## 设置桥接

### MQTT

假设你已经运行好了 Home Assistant 和 SmartThings，第一步就是让一个 MQTT broker 跑起来。开源世界里有不少 [MQTT][mosquitto] [broker][emqttd] 可供选择。我们选择 [Mosca][mosca]，因为它足够简单。

要让 Mosca 运行起来，几乎不需要做太多事。最简单的方法是使用 [Docker][Docker]，然后运行下面这样的命令：

```bash
$ docker run \
    -d \
    --name="mqtt" \
    -v /opt/mosca:/db \
    -p 1883:1883 \
    matteocollina/mosca
```

这样会在 Docker 容器中启动 Mosca，同时把 Mosca 的持久化存储保存在 `/opt/mosca`。默认配置已经足够让我们把它运行起来。

如果你不想折腾 Docker，而且安装 node.js 也没有问题，那么按照 [standalone][mosca-standalone] 的说明操作就够了。

### MQTT Bridge

这就是连接 MQTT 和 SmartThings 的那一小块魔法。它是一个 node.js 应用，和 Mosca 一样，最简单的安装方式大概也是 Docker：

```bash
$ docker run \
    -d \
    --name="mqtt-bridge" \
    -v /opt/mqtt-bridge:/config \
    -p 8080:8080 \
    stjohnjohnson/smartthings-mqtt-bridge
```

如果你想独立启动它，这个桥接的代码也已经[放在 GitHub 上][MQTT-bridge]。

MQTT Bridge 只需要知道你的 MQTT broker 在哪里。如果你直接照搬上面的 Docker 命令，请把 `/opt/mqtt-bridge/config.yml` 改成下面这样：

```yaml
---
mqtt:
    host: <IP of the host>
```

重启桥接之后，就可以继续了：

```bash
docker restart mqtt-bridge
```

### SmartThings 设备

下一步是设置设备类型，这一步也许最容易让人困惑。前往 [Smart Things Device IDE][ide-dt]，选择 `Create New Device Handler`。选择 `From Code`，然后把 [MQTT Bridge Device Code][devicetype] 粘贴进去。接着选择 `Save`、`Publish`，然后选择 `For Me`。

现在来安装你新的设备 Handler。回到 IDE 中的 `My Devices`，然后选择 `New Device`。输入一个名称，并为设备 Network Id 随便填写一串字符（之后它会自动更新）。在 Type 中，滚动到列表底部，找到你刚刚创建的 `MQTT Bridge`。其余字段可以按你的喜好填写。

再回到 `My Devices`，然后在列表中选择你刚创建的设备。这会打开一个页面，你可以在这里编辑设备的 Preferences。选择 `edit`，然后填写它要求的 3 项信息。

- MQTT Bridge IP Address: \<IP address of the MQTT Bridge from the previous step>
- MQTT Bridge Port: \<8080 if you have changed nothing in the previous commands>
- MQTT Bridge MAC Address: \<Mac address of machine running the Bridge code>

这样就建立起了 SmartThings 与 MQTT Bridge 之间的连接。

### SmartThings App

最后一步是设置 SmartApp。完成后，所有已注册的设备都会开始把它们的事件发送到 MQTT。

前往 [Smart App IDE][ide-app]。选择 `New SmartApp`，然后选择 `From Code`。把 [MQTT Bridge SmartApp code][smartapp] 粘贴进去，然后选择 `Save`。接着选择 `Publish`，再选择 `For Me`。在 SmartThings 手机应用中，添加这个新的 SmartApp，并用你的设备以及 MQTT Bridge 设备对它进行配置。选择 `done` 之后，SmartThings 就会订阅你的 MQTT broker，并开始双向传播事件。

### 配置 Home Assistant

如果要通过 MQTT 将 SmartThings 设备添加到 Home Assistant，首先要在 Home Assistant 中启用 MQTT：

```yaml
mqtt:
  broker: localhost
```

把 `localhost` 替换成 MQTT broker 实际运行的位置。来自 MQTT Bridge 的设备会发布到路径 `smartthings/<Device Name>/<Attribute>`。

例如，我的调光 Z-Wave 灯在 SmartThings 中叫做 “Fireplace 灯光”。下面这些主题会被发布出来：

| Topic | 描述 |
| ----- | ----------- |
| smartthings/Fireplace 灯光/level | 亮度 (0-99) |
| smartthings/Fireplace 灯光/开关 | 开关状态 (on/off) |

下面是一个 Home Assistant 配置示例：

```yaml
switch:
  platform: mqtt
  name: "Fireplace Lights"
  state_topic: "smartthings/Fireplace Lights/switch"
  command_topic: "smartthings/Fireplace Lights/switch"
  brightness_state_topic: "smartthings/Fireplace Lights/level"
  brightness_command_topic: "smartthings/Fireplace Lights/level"
  payload_on: "on"
  payload_off: "off"
  retain: true
```

我们建议每个 MQTT 设备都设置 `retain: true`，这样当连接中断又恢复时，状态仍然能保持同步。

接下来，你可以深入看看 Home Assistant 中的 [MQTT 组件][MQTT-ha]，找到哪些组件适合映射这些新发布到 MQTT 的事件。

### 使用 Docker-Compose 配置

我们个人最喜欢的启动整套软件的方式，是使用一个统一的 Docker-Compose 文件。你只需要创建一个名为 `docker-compose.yml` 的文件，内容如下：

```yaml
mqtt:
    image: matteocollina/mosca
    ports:
        - 1883:1883

mqttbridge:
    image: stjohnjohnson/smartthings-mqtt-bridge
    volumes:
        - ./mqtt-bridge:/config
    ports:
        - 8080:8080
    links:
        - mqtt

homeassistant:
    image: homeassistant/home-assistant:latest
    ports:
        - 80:80
    volumes:
        - ./home-assistant:/config
        - /etc/localtime:/etc/localtime:ro
    links:
        - mqtt
```

这样会按照依赖顺序启动 home-assistant、MQTT，以及 Bridge。所有配置都可以直接引用 Docker 容器名称，而不用填写 IP 地址（例如，在 Home Assistant 中把 broker 主机直接写成 `mqtt`）。

### 工作原理

**HTTP Endpoint**：我们能找到的与 SmartThings Hub 通信的方法，其实只有两种。最简单的方法，是创建一个基于 OAuth 认证的 RESTful SmartApp，通过 HTTP 直接提供状态变化。这种方式实现起来相当直接，但它需要与 SmartThings 的云服务通信，无法完全在你的局域网内部完成。我们希望把所有通信都留在内网，于是想到了第二种方式。

**自定义设备类型**：SmartThings 的自定义设备类型允许开发者为 SmartThings Hub 在本地网络中直接接收到的 HTTP 事件定义处理器。接收到的消息会通过 MAC 地址进行认证，并且负载中可以包含任意字符串。由于一个设备类型只能绑定到一个设备，我们还需要配合一个 SmartApp，来在各个单独设备与我们这个特殊的 Home Assistant Bridge 设备之间翻译事件。到目前为止，结构如下：

```text
Z-Wave Switch        |
Zigbee motion sensor |<---> Bridge App <---> Bridge Device Type <---> <Local network>
Z-Wave light bulb    |
```

在 Home Assistant 这一侧，有一个基于 MQTT 轻量消息总线协议的强大平台可用。从灯光、开关，到温度传感器，都可以在 Home Assistant 中定义为 MQTT 组件，因此它是一个非常方便的集成点。这需要一个 MQTT broker 来处理消息总线，还需要最后一个组件来负责在 SmartThings 支持的 HTTP 与 MQTT 之间进行转换。

最终的事件流转顺序如下：

@ @ PH0 @ @
  @ @ PH0 @ @
    @ @ PH0 @ @
  @ @ PH0 @ @
  SmartThings Bridge Sequence
@ @ PH0 @ @

这些事件在途中要经过不少节点，但每一层都只是一个简单的翻译层，用来在各个系统之间转送事件。

### 后续改进

- **树莓派**：很多人都希望让这套方案跑在树莓派上。它只需要为 ARM 编译的二进制文件，所以我们计划在未来某个时间点提供兼容 ARM 的容器版本。
- **MQTT 认证**：目前 MQTT bridge 还不知道如何向 MQTT 执行认证，因此现在只支持不带认证的 MQTT。如果你使用了我们的 Docker Compose 配置，这个问题会在一定程度上被缓解，因为 MQTT 的端口实际上并不会公开暴露出去。
- **MQTT Bridge 认证**：目前 bridge 默认认为任何订阅者都是 SmartThings Hub。这部分还需要更完善的认证机制。

[mosquitto]: http://mosquitto.org/
[emqttd]: https://github.com/emqtt/emqttd
[mosca]: http://www.mosca.io/
[Docker]: https://www.Docker.com/
[mosca-standalone]: https://github.com/mcollina/mosca#standalone
[MQTT-bridge]: https://github.com/stjohnjohnson/smartthings-MQTT-bridge
[ide-dt]: https://graph.api.smartthings.com/ide/devices
[devicetype]: https://github.com/stjohnjohnson/smartthings-MQTT-bridge/blob/master/devicetypes/stj/MQTT-bridge.src/MQTT-bridge.groovy
[ide-app]: https://graph.api.smartthings.com/ide/apps
[smartapp]: https://github.com/stjohnjohnson/smartthings-MQTT-bridge/blob/master/smartapps/stj/MQTT-bridge.src/MQTT-bridge.groovy
[MQTT-ha]: /integrations/MQTT/
[smartthings]: http://smartthings.com
[r/homeautomation]: https://www.reddit.com/r/homeautomation
[MQTT]: https://en.wikipedia.org/wiki/MQTT
