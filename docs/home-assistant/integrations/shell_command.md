---
title: Shell Command
description: 有关如何将 Shell 命令集成到 Home Assistant 中的说明。
ha_category:
  - Automation
ha_iot_class: Local Push
ha_release: 0.7.6
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: shell_command
ha_integration_type: integration
---

此集成可以将普通的 shell 命令公开为操作。这些操作可以在[脚本][script]或[自动化][automation]中调用。
Shell 命令名称不允许使用驼峰命名，请仅使用小写字母，并用下划线分隔名称。

请注意，shell 命令进程会在 60 秒后被终止，没有例外。此行为无法修改，这是设计使然，因为 Home Assistant 并不用于管理长时间运行的外部进程。

[script]: /integrations/script/
[automation]: /getting-started/automation/

## 配置

```yaml
# Example configuration.yaml entry
# Exposes action shell_command.restart_pow
shell_command:
  restart_pow: touch ~/.pow/restart.txt
```

```yaml
alias:
  description: 为 shell 命令指定一个名称（别名）作为变量，并在冒号后设置要执行的命令。例如，`alias`:`the shell command you want to execute`。
  required: true
  type: string
```

这些命令可以是动态的，使用模板为参数插入值。使用模板时，`shell_command` 会在一个更安全的环境中运行，因此不允许使用某些 shell 辅助功能，比如自动展开主目录符号（`~`）、使用管道符（`|`）执行多个命令，或使用重定向运算符（如 `>` 和 `>>`）输出内容。同样，只有第一个空格之后的内容可以由模板生成。这意味着命令名称本身不能通过模板生成，而必须显式写出。

传递给该操作、用于触发 shell 命令的任何操作数据，都会作为模板中的变量可用。

命令的 `stdout` 和 `stderr` 输出都会被捕获，并在将[日志级别](/home-assistant/integrations/logger/)设为 debug 时写入日志。

:::note
添加或编辑命令后，请重启 Home Assistant。新命令在重启前无法使用，已有命令的更改也要在重启后才会生效。

:::
## 执行与运行环境

当你运行 Home Assistant OS（HAOS）时，shell 命令会以该容器内的 root 用户身份，在 `homeassistant` Docker 容器**内部**执行。这个 root 账户并不等同于 HAOS 系统本身的 root。

`command` 会在[配置目录](/home-assistant/docs/configuration/)中执行，该目录在容器内对应 `/config`。

主要特性：

- **工作目录：** `/config`
- **持久化存储：** 持久化文件请使用 `/config`。`/root` 和 `/tmp` 不是持久化存储。
- **网络模式：** `host` —— `shell_command` 的网络访问与主机共享网络。
- **可用工具：** 仅限容器镜像中包含的工具（如 `ssh`、`curl`、`sh`）
- **超时：** 运行超过 60 秒的命令会被停止。

在单独的 [Home Assistant Container](/home-assistant/installation/linux#install-home-assistant-container) 安装中测试命令，有助于确认哪些工具和二进制文件可用。不过请记住，对于 Home Assistant OS 用户，实际执行环境始终是受管理的 `homeassistant` 容器。

## 响应

Shell 命令会返回一个包含 `stdout`、`stderr` 和 `returncode` 的字典作为操作响应。你可以在自动化中结合 [`response_variable`](/home-assistant/docs/scripts/perform-actions#use-templates-to-handle-response-data) 根据命令结果执行后续操作。

## 示例

### 定义多个 shell 命令

你也可以一次定义多个 shell 命令。下面的示例定义了三个不同且彼此无关的 shell 命令。

```yaml
# Example configuration.yaml entry
shell_command:
  restart_pow: touch ~/.pow/restart.txt
  call_remote: curl http://example.com/ping
  my_script: bash /config/shell/script.sh
```

### 自动化示例

这是一个将 shell 命令与输入助手和自动化配合使用的示例。


```yaml
# Apply value of a GUI slider to the shell_command
automation:
  - alias: "run_set_ac"
    triggers:
      - trigger: state
        entity_id: input_number.ac_temperature
    actions:
      - action: shell_command.set_ac_to_slider

input_number:
  ac_temperature:
    name: A/C Setting
    initial: 24
    min: 18
    max: 32
    step: 1

shell_command:
  set_ac_to_slider: 'irsend SEND_ONCE DELONGHI AC_{{ states("input_number.ac_temperature") }}_AUTO'
```


下面的示例展示了如何在自动化中使用 shell 命令的响应。


```yaml
# Create a ToDo notification based on file contents
automation:
  - alias: "run_get_file_contents"
    triggers:
      - ...
    actions:
      - action: shell_command.get_file_contents
        data:
          filename: "todo.txt"
        response_variable: todo_response
      - if: "{{ todo_response['returncode'] == 0 }}"
        then:
          - action: notify.mobile_app_iphone
            data:
              title: "ToDo"
              message: "{{ todo_response['stdout'] }}"
        else:
          - action: notify.mobile_app_iphone
            data:
              title: "ToDo file error"
              message: "{{ todo_response['stderr'] }}"


shell_command:
  get_file_contents: "cat {{ filename }}"
```


### 在 shell_command 中使用 SSH

容器中的 `/root/.ssh` 目录不是持久化存储。请将密钥保存在 `/config/.ssh` 中。

要生成新的 SSH 密钥对，你可以在[终端](https://github.com/home-assistant/addons/tree/master/ssh)中运行以下命令：

```bash
ssh-keygen -t ed25519 -f /config/.ssh/id_ed25519 -C "homeassistant"
```

这会创建两个文件：

- `id_ed25519`（私钥）
- `id_ed25519.pub`（公钥）

将公钥添加到目标系统的 `~/.ssh/authorized_keys` 文件中。

要根据主机指纹创建 `known_hosts` 文件，请运行：

```bash
# Replace <host> with your target hostname or IP address
ssh-keyscan -H "<host>" >> /config/.ssh/known_hosts
```

有关 `ssh-keygen` 的更多信息，请参阅 [OpenSSH 手册](https://man.openbsd.org/ssh-keygen)。

配置示例：


```yaml
# Example configuration.yaml entry
# Replace <host> with your target hostname or IP address
shell_command:
  read_remote_hostname: |
    ssh -i /config/.ssh/id_ed25519 \
      -o UserKnownHostsFile=/config/.ssh/known_hosts \
      user@<host> 'hostname'
```


这样可确保 SSH 即使在系统更新后也继续使用持久化文件。
