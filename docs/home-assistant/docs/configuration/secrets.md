---
title: 存储密钥
description: 将密钥存储在 configuration.yaml 之外。
---

**`configuration.yaml`** 文件是一个纯文本文件，因此任何有权访问该文件的人都可以读取它。该文件包含密码和 API 令牌，如果您想分享您的配置，需要对这些信息进行脱敏处理。

通过使用 `!secret`，您可以从配置文件中移除任何私密信息。这种分离还可以帮助您更轻松地跟踪您的密码和 API 密钥，因为它们都存储在一个地方，而不再分散在 **`configuration.yaml`** 文件中，或者如果您[拆分了配置](/home-assistant/docs/configuration/splitting_configuration/)，甚至分散在多个文件中。

## 使用 `secrets.yaml`

将私密信息移至 `secrets.yaml` 的工作流程与[拆分配置](/home-assistant/docs/configuration/splitting_configuration/)非常相似。在您的 Home Assistant [配置目录](/home-assistant/docs/configuration/)中创建一个 `secrets.yaml` 文件。

**`configuration.yaml`** 文件中的密码和 API 密钥条目通常如下例所示。

```yaml
rest:
  - authentication: basic
    username: "admin"
    password: "YOUR_PASSWORD"
    ...
```

这些条目需要替换为 `!secret` 和一个标识符。

```yaml
rest:
  - authentication: basic
    username: "admin"
    password: !secret rest_password
    ...
```

`secrets.yaml` 文件包含与标识符对应的密码。

```yaml
rest_password: "YOUR_PASSWORD"
```

## 调试密钥

当您开始将配置拆分为多个文件时，您可能会在子文件夹中拥有配置。密钥将按以下顺序解析：

- 位于引用密钥的文件所在文件夹中的 `secrets.yaml`，
- 接下来，将在父文件夹中搜索包含该密钥的 `secrets.yaml` 文件，直到包含主 **`configuration.yaml`** 的文件夹为止。

要查看密钥是从哪里加载的，您可以在 `secrets.yaml` 文件中添加一个选项。

通过在 `secrets.yaml` 中添加以下内容，将密钥的获取来源打印到 Home Assistant 日志中：

```yaml
logger: debug
```

这不会将实际的密钥值打印到日志中。