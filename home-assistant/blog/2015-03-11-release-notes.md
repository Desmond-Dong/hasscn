# 2015 年 3 月 11 日发布说明

距离 Theodor 为 Home Assistant 引入 YAML 支持才刚过一周多，但已经发生了很多变化，是时候总结一下近期更新了。在介绍亮点之前，先感谢 [andythigpen](https://github.com/andythigpen)、[jamespcole](https://github.com/jamespcole) 和 [theolind](https://github.com/theolind) 提交了大量 bug 修复、功能增强和新贡献！

**监控本地资源**<br>
Theodor 贡献了一个新的传感器平台，可用于监控磁盘占用、内存占用、CPU 占用和运行进程。该平台已取代 process 组件，后者现已被视为弃用。

```yaml
# Example configuration.yaml entry
sensor:
  - platform: systemmonitor
    resources:
      - type: disk_use_percent
        arg: /home
      - type: memory_free
      - type: process
        arg: kodi
```

**实验性 Z-Wave 支持**<br>
现在已提供通过 Z-Wave USB 棒连接 Z-Wave 网络的实验性支持。目前仅集成 Z-Wave 传感器到 Home Assistant。我们的目标是在更多人测试后，再逐步加入其他 Z-Wave 设备支持。

新组件构建在 [python-openzwave](https://code.google.com/p/python-openzwave/) 之上。该包目前未在 PyPI 发布，因此我们新增了脚本 `scripts/build_python_openzwave`，用于在你的机器上安装。你也可以直接使用开箱即用的 Docker 镜像。

开发测试使用的是 AEON Z-Wave USB 棒和 AEON Z-Wave MultiSensor。

```yaml
# Example configuration.yaml entry
zwave:
  usb_path: /dev/ttyUSB0
```

**语音控制**<br>
Home Assistant 的语音控制首个版本已上线。当前实现分为两个部分。

第一部分是名为 `conversation` 的组件，暴露服务 `conversation/process`。该服务可以处理文本并将其转换为设备命令。当前仅支持 `Turn <Friendly Name> <on/off>` 格式的指令。

第二部分是对前端的升级：利用 Chrome 的语音转文本能力，让用户可以直接说出命令。如果你使用 Chrome，可以在 [demo](/home-assistant/demo/) 中体验。

```yaml
# Example configuration.yaml entry
conversation:
```
