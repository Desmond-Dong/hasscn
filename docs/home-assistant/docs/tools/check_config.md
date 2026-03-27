---
title: 检查配置
description: '在启动 Home Assistant 之前测试您的 configuration.yaml 文件所做的任何更改。此脚本允许您测试更改而无需重启 Home Assistant。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 检查配置

在启动 Home Assistant 之前测试您的 **`configuration.yaml`** 文件所做的任何更改。此脚本允许您测试更改而无需重启 Home Assistant。

```bash
hass --script check_config
```

该脚本还有更多选项，例如检查不在默认目录中的配置文件，或显示您的密钥信息以进行调试。

```bash
$ hass --script check_config -h
usage: hass [-h] [--script {check_config}] [-c CONFIG] [-i [INFO]] [-f] [-s] [--json] [--fail-on-warnings]

Check Home Assistant configuration.

optional arguments:
  -h, --help            show this help message and exit
  --script {check_config}
  -c CONFIG, --config CONFIG
                        Directory that contains the Home Assistant
                        configuration
  -i [INFO], --info [INFO]
                        Show a portion of the config
  -f, --files           Show used configuration files
  -s, --secrets         Show secret information
  --json                Output JSON format
  --fail-on-warnings    Exit non-zero if warnings are present
```
