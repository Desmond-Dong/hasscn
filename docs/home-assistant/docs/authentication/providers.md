---
title: 认证提供商
description: 配置不同认证提供商的指南。
---

这是一个高级功能。

当您登录时，_认证提供商_ 会检查您的凭据以确保您是已授权的用户。

## 配置认证提供商

:::warning

Home Assistant 会自动配置标准认证提供商，因此除非您要配置多个提供商，否则不需要在 **`configuration.yaml`** 文件中指定 `auth_providers`。指定 `auth_providers` 将禁用所有未列出的认证提供商，因此如果配置不正确，可能会降低安全性或造成登录困难。

如果您决定使用 `trusted_networks` 作为您的 `auth_provider`，那么在列出的受信任网络之外的设备将无法进行身份验证。要解决这个问题，请确保手动添加默认的 `auth_provider`（类型为 `type: homeassistant`）。这样当从局域网外部访问时，受信任网络认证失败后会显示默认的认证登录界面。

:::

认证提供商在 **`configuration.yaml`** 文件的 `homeassistant:` 配置块下配置。
如果您正在将配置迁移到 packages，此项配置必须保留在 `configuration.yaml` 中。请参阅本页底部警告块中的 Issue 16441。

您可以提供多个认证提供商，例如：

```yaml
homeassistant:
  auth_providers:
    - type: homeassistant
    - type: trusted_networks
      trusted_networks:
        - 192.168.0.0/24
```

## 可用的认证提供商

### Home Assistant 认证提供商

这是默认的认证提供商。第一个创建的用户被指定为_所有者_，可以创建其他用户。

用户详细信息存储在 `[您的配置目录]/.storage` 目录中。所有密码都以加盐哈希形式存储，即使攻击者有权访问该文件，也几乎不可能破解密码。

用户可以由所有者在 Home Assistant 中管理。选择 [**设置** > **人员**](https://my.home-assistant.io/redirect/users/) 并打开 **用户** 选项卡。

这是 Home Assistant 认证在 **`configuration.yaml`** 中的配置条目：

```yaml
homeassistant:
  auth_providers:
    - type: homeassistant
```

如果您没有在 **`configuration.yaml`** 文件中指定任何 `auth_providers` 部分，则此提供商将自动设置。

### 受信任网络

受信任网络认证提供商定义了一系列不需要身份验证的 IP 地址范围（也称为"白名单"）。例如，您可以将本地网络加入白名单，这样当您在家中访问 Home Assistant 时就不会被要求输入密码。

当您从这些网络之一登录时，系统会询问您要使用哪个用户账户，而不需要输入密码。

:::note
如果您使用此认证提供商，[多因素认证模块](/home-assistant/docs/authentication/multi-factor-auth/) 将不会参与登录过程。
:::

:::important
您不能信任您在任何 [trusted_proxies](/home-assistant/integrations/http/#reverse-proxies) 中使用的网络。`trusted_networks` 认证将失败，并显示消息：您的计算机不被允许
:::

以下是在 **`configuration.yaml`** 中设置受信任网络的示例：

```yaml
homeassistant:
  auth_providers:
    - type: trusted_networks
      trusted_networks:
        - 192.168.0.0/24
        - fd00::/8
```

trusted_networks:
  description: 您要加入白名单的 IP 地址或 IP 网络列表。它接受 IPv4 和 IPv6 IP 地址或网络
  required: true
  type: list
trusted_users:
  description: 您还可以指定当用户从特定 IP 地址或网络访问登录页面时可以选择哪些用户。
  required: false
  type: map
  keys:
    USER_ID:
      description: 在此 IP 地址或网络上可供选择的用户 ID 列表。
      required: false
      type: [list, string]
allow_bypass_login:
  description: 如果您只有一个用户可供选择，可以跳过登录页面。
  required: false
  default: false
  type: boolean

#### 受信任用户示例

```yaml
homeassistant:
  auth_providers:
    - type: trusted_networks
      trusted_networks:
        - 192.168.0.0/24
        - 192.168.10.0/24
        - fd00::/8
      trusted_users:
        192.168.0.1: user1_id
        192.168.0.0/24:
          - user1_id
          - user2_id
        "fd00::/8":
          - user1_id
          - group: system-users
```

首先注意，对于 `trusted_users` 配置，您需要使用 `user id`。

1. 要查找用户 ID，在浏览器中确保您的 Home Assistant URL 以 `config/users/` 结尾。
   - 例如：`homeassistant:8123/config/users`。
2. 从列表中选择用户，并复制 ID。
   - 例如：`acbbff56461748718f3650fb914b88c9`。
3. `trusted_users` 配置不会验证用户是否存在，因此请确保您输入了正确的用户 ID。
4. 使用 IPv6 地址的受信任用户必须将 IPv6 地址放在引号中，如下所示。

在上面的示例中，如果用户尝试从 192.168.0.1 访问 Home Assistant，他们将只有一个用户可供选择。如果从 192.168.0.38（来自 192.168.0.0/24 网络）访问，他们会有两个用户可供选择。如果从 192.168.10.0/24 网络访问，他们可以从所有可用用户中进行选择（非系统用户和活跃用户）。

特别地，您可以使用 `group: GROUP_ID` 将某个用户组中的所有用户指定为可供选择。组和用户可以混合使用。

#### 跳过登录页面示例

这是一个功能，允许您恢复用户系统实施之前的一些体验。如果您从受信任网络访问，`allow_bypass_login` 已开启，并且登录表单中只有一个可用用户可供选择，则可以直接跳转到主页面。

如果您允许跳过登录，那么您的 cookie 将不会被存储，每次刷新 Home Assistant 中的页面时都会创建一个新的登录。这是因为跳过登录不会给您保存登录的选项。

```yaml
# 假设您只有一个非系统用户
homeassistant:
  auth_providers:
    - type: trusted_networks
      trusted_networks:
        - 192.168.0.0/24
        - 127.0.0.1
        - ::1
      allow_bypass_login: true
    - type: homeassistant
```

假设您只有通过引导流程创建的所有者用户，从未创建过其他用户。上面的示例配置将允许您在从内部网络（192.168.0.0/24）或从本地主机（127.0.0.1）访问时直接访问 Home Assistant 主页面。如果您遇到登录中止错误，那么您可以改用 Home Assistant 认证提供商进行登录，前提是您从外部网络访问您的 Home Assistant 实例。

:::note
`auth_providers` 的顺序至关重要，因为提供商会从上到下进行评估。
要按预期启用跳过登录功能，`trusted_networks` 提供商必须列在 `homeassistant` 提供商之前。如果 `type: homeassistant` 先配置，Home Assistant 将立即显示登录页面，即使客户端位于受信任网络上，跳过登录逻辑也不会被执行。
:::

### 命令行

命令行认证提供商执行一个可配置的 shell 命令来执行用户身份验证。两个环境变量 `username` 和 `password` 会传递给该命令。当命令成功退出（退出代码为 0）时，授予访问权限。

此提供商可用于将 Home Assistant 与任意外部身份验证服务集成，从纯文本数据库到 LDAP 再到 RADIUS。

以下是一个配置示例：

```yaml
homeassistant:
  auth_providers:
    - type: command_line
      command: /absolute/path/to/command
      # 可选，定义传递给命令的参数列表。
      #args: ["--first", "--second"]
      # 取消注释以启用元变量解析（见下文）。
      #meta: true
```

当在认证提供商的配置中设置 `meta: true` 时，您的命令可以将一些变量写入标准输出，以使用附加数据填充在 Home Assistant 中创建的用户账户。这些变量必须以以下形式打印：

```text
name = John Doe
group = system-users
local_only = true
```

前导和尾随空格以及以 `#` 开头的行将被忽略。支持以下变量。将来可能会添加更多变量。

- `name`：要在用户个人资料中显示的用户真实姓名。
- `group`：用户组使用值 `system-admin` 表示管理员（这是默认值），或使用 `system-users` 表示普通用户。
- `local_only`：如果您将值设置为 `true`，则用户只能从本地网络登录。如果您不定义此变量，则用户可以从任何地方登录。

标准错误输出完全不会被读取，只是直接传递给 Home Assistant 进程的标准错误输出，因此您可以将其用于状态消息或类似用途。

:::note
用户名在传递给配置的命令之前，会去除任何前导和尾随空格。例如，" hello  " 将被重写为仅 "hello"。
:::

:::note
目前，元变量仅在首次验证特定用户时生效。在后续验证同一用户时，将重用之前创建的用户对象及其旧值。
:::
