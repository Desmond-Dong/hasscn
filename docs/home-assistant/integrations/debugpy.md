---
title: Remote Python Debugger
description: 'Remote Python debugger 集成允许您将 Visual Studio Code Python 调试工具与远程 Home Assistant 实例一起使用。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Utility
ha_release: 0.112
ha_codeowners:
  - '@frenck'
ha_domain: debugpy
ha_quality_scale: internal
ha_iot_class: Local Push
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
---
# Remote Python Debugger

**Remote Python debugger** 集成允许您将 Visual Studio Code Python 调试工具与远程 Home Assistant 实例一起使用。

它使用 Microsoft 的 `debugpy` 库，这是 `ptvsd` 的后续版本，也是 Visual Studio Code 使用的默认库。

这对于在本地开发安装上测试更改或连接到生产服务器调试问题非常有用。可以在不激活调试器的情况下加载集成，但通过动作注入它。这在开发者的生产系统上特别有用，因为在不注入时不会影响性能。

## 配置

要启用远程 Python 调试器集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
debugpy:
```

默认情况下，它将监听所有本地接口的 5678 端口，不会等待连接，并在 Home Assistant 启动时启动。

```yaml
host:
  description: 要监听的本地接口。
  required: false
  default: 0.0.0.0（所有接口）。
  type: string
port:
  description: 要监听的端口。
  required: false
  default: 5678
  type: integer
start:
  description: "如果为 `true`，调试器将在 Home Assistant 启动时注入。设置为 false 以使用 `debugpy.start` 动作按需注入。"
  required: false
  default: true
  type: boolean
wait:
  description: "如果为 `true`，在启动 Home Assistant 之前等待调试器连接。当 `start` 设置为 `false` 时，此选项将被忽略。"
  required: false
  default: false
  type: boolean
```

## 安全

如果这是一个面向公众的服务器，请确保端口安全。任何能够访问调试器端口的人都可以在 Home Assistant 实例上*执行任意代码*，这非常不安全。

如果 Home Assistant 实例位于防火墙后面，仅暴露 http(s) 端口，则对外部连接是安全的。

## 性能和内存使用

使用调试器（即使未附加）会增加内存使用并降低性能。不建议在持久（生产）服务器上配置调试器，除非绝对必要。

或者，可以通过将 `start` 选项设置为 `false` 来加载集成。这将防止调试器被注入，相反，它将通过调用 `debugpy.start` 动作按需注入。

## 在启动时等待

如果要调试启动序列中的某些内容，请将集成配置为先等待连接：

```yaml
# 示例 configuration.yaml 条目
debugpy:
  start: true
  wait: true
```

调试器在启动序列中加载得很早，早于任何其他集成。这将允许您在 `async_setup` 或类似位置设置断点并调试集成的加载。

## 备用主机和端口

您也可以监听不同的服务器地址或端口：

```yaml
# 示例 configuration.yaml 条目
debugpy:
  host: localhost
  port: 6789
```

这对于多宿主服务器或仅本地主机访问很有用

## 动作 `debugpy.start`

当集成的 `start` 选项设置为 `false` 时，可以使用 `debugpy.start` 动作在运行时注入并启动远程 Python 调试器。

请注意：一旦启动就无法停止，这需要重启 Home Assistant。

## Visual Studio Code 配置示例

这可以复制到您 Visual Studio Code 项目 `.vscode` 子目录中的 `launch.json` 以连接到调试器。

```json
{
    // 更多信息，请访问：https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            // 附加到本地调试服务器的示例
            "name": "Python: Attach Local",
            "type": "debugpy",
            "request": "attach",
            "connect": {
                "port": 5678,
                "host": "localhost",
            },
            "pathMappings": [
                {
                    "localRoot": "${workspaceFolder}",
                    "remoteRoot": "."
                }
            ],
        },
        {
            // 附加到我的生产服务器的示例
            "name": "Python: Attach Remote",
            "type": "debugpy",
            "request": "attach",
            "connect": {
                "port": 5678,
                "host": "homeassistant.local",
            },
            "pathMappings": [
                {
                    "localRoot": "${workspaceFolder}",
                    "remoteRoot": "/usr/src/homeassistant"
                }
            ],
        }
    ]
}
```