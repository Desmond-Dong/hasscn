# Melissa

**Melissa** 集成是用于连接 [Melissa Climate](https://seemelissa.com/) 空调控制系统的主集成。

Home Assistant 目前支持以下设备类型：

* Climate

如果已配置 Melissa 集成，climate 平台会自动完成配置。

## 配置

要设置 Melissa 集成，请将以下信息添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
melissa:
  username: YOUR_MELISSA_USERNAME
  password: YOUR_PASSWORD
```

```yaml
  username:
    description: 用于访问您的 Melissa 账户的用户名。
    required: true
    type: string
  password:
    description: 用于访问您的 Melissa 账户的密码。
    required: true
    type: string
```
