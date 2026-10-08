以下调试技巧和诀窍适用于正在运行 Home Assistant 镜像并处理基础镜像的开发者。如果你使用的是通用 Linux 安装脚本，你应该可以按照主机的方式访问主机和日志。

## 调试 Supervisor

在使用 Python debugger 之前，你需要在 Supervisor 中启用 debug 选项：

```shell
ha su options --debug=true
ha su reload
```

如果你在远程主机上运行 Supervisor，你将无法直接访问 Supervisor 容器。"Remote ptvsd debugger" add-on（可从 [Development Add-On Repository](https://github.com/home-assistant/addons-development) 获取）会在你的主机 IP 地址上暴露调试端口，从而允许远程调试 Supervisor。

下面是一个 Visual Studio Code 配置示例，用于将 Python debugger 附加到 Home Assistant Supervisor。此配置旨在通过 Run> Start Debugging 或按 F5 作为默认配置使用。你需要将 "IP" 更改为匹配 Supervisor 在 Docker 环境中的 IP（在 Supervisor 容器内使用 `ip addr`），或者如果你远程调试，则使用主机 IP。

`.vscode/launch.json`

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Supervisor remote debug",
            "type": "python",
            "request": "attach",
            "port": 33333,
            "host": "IP",
            "pathMappings": [
                {
                    "localRoot": "${workspaceFolder}",
                    "remoteRoot": "/usr/src/supervisor"
                }
            ]
        }
    ]
}
```
