# Reddit

**Reddit** 集成可接入 [Reddit](https://reddit.com/) 的数据，用于监控您喜爱的子版块。

## 设置

要设置此传感器，您需要为将用于连接的用户账户生成 `client_id` 和 `client_secret`。请按照[此 Wiki 页面](https://github.com/reddit-archive/reddit/wiki/OAuth2-Quick-Start-Example)中的前几个步骤进行操作。

:::important
此集成不支持 Reddit 的双重身份验证。如果您的 Reddit 账户启用了双重身份验证，请另外创建一个未启用双重身份验证的 Reddit 账户供 Home Assistant 使用。

:::

## 配置

要启用此集成，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: reddit
    username: !secret reddit_username
    password: !secret reddit_password
    client_id: !secret reddit_client_id
    client_secret: !secret reddit_client_secret
    subreddits:
      - news
      - worldnews
```

```yaml
username:
  description: 您的 Reddit 账户用户名。
  required: true
  type: string
password:
  description: 您的 Reddit 账户密码。
  required: true
  type: string
client_id:
  description: 您的 Reddit 账户客户端 ID。
  required: true
  type: string
client_secret:
  description: 您的 Reddit 账户客户端密钥。
  required: true
  type: string
subreddits:
  description: 您希望获取数据的子版块列表。
  required: true
  type: list
sort_by:
  description: "按 `new`、`top`、`controversial` 和 `hot` 对 Reddit 帖子排序。"
  required: false
  type: string
  default: hot
```
