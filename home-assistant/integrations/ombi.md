# Ombi

The **Ombi** integration monitors data from your [Ombi](https://ombi.io) instance.

## Setup

This integration needs to authenticate to your Ombi instance with either a user `password` or an `api_key`.

要查找您的“api\_key”，请打开 Ombi Web 界面。导航到 **Settings**，然后导航到 **Ombi**，然后您应该能够看到您的“api\_key”。

如果您想使用“密码”身份验证，只需使用您通常用于登录 Ombi 的相同“密码”即可。或者，您可以在 Ombi 中设置一个专门用于 Home Assistant 的单独本地帐户。为此，请打开 Ombi Web 界面。导航到 **用户管理**，然后按 **将用户添加到 Ombi**。输入您所需的用户详细信息，并在配置此集成时使用相同的详细信息。

## Configuration

If you want to enable this integration, add the following lines to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/index.md#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# Example configuration.yaml entry
ombi:
  host: OMBI_HOST
  username: OMBI_USERNAME
  password: OMBI_PASSWORD
```

```yaml
host:
  description: The hostname or IP Address Ombi is running on.
  required: true
  type: string
username:
  description: Your Ombi username.
  required: true
  type: string
password:
  description: Your Ombi password. [`password`](#password) and [`api_key`](#api_key) cannot be specified concurrently.
  required: exclusive
  type: string
api_key:
  description: Your Ombi API key. [`password`](#password) and [`api_key`](#api_key) cannot be specified concurrently.
  required: exclusive
  type: string
port:
  description: The port Ombi is running on.
  required: false
  default: 5000
  type: integer
urlbase:
  description: The Base URL path of your Ombi instance.
  required: false
  type: string
ssl:
  description: Whether or not to use SSL when connecting to Ombi.
  required: false
  default: false
  type: boolean
```

## 配置的完整示例

```yaml
# Example configuration.yaml entry
ombi:
  host: OMBI_HOST
  username: OMBI_USERNAME
  api_key: OMBI_API_KEY
  port: OMBI_PORT
  urlbase: ombi/
  ssl: true
```

## Actions

### Submit request actions

可用操作：`submit_movie_request`、`submit_music_request`、`submit_tv_request`

#### 操作`submit_movie_request`

搜索并请求最接近的匹配电影。

| Data attribute | Optional | Description       |
| ---------------------- | -------- | ----------------- |
| `name`                 | no       | Search parameter. |

#### 操作`submit_music_request`

搜索并请求最接近匹配的音乐专辑。

| Data attribute | Optional | Description       |
| ---------------------- | -------- | ----------------- |
| `name`                 | no       | Search parameter. |

#### 操作`submit_tv_request`

搜索并请求最接近的匹配电视节目。

| Data attribute | Optional | Description                                                                                |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `name`                 | no       | Search parameter.                                                                          |
| `season`               | yes      | Which season(s) to request. Must be one of `first`, `latest` or `all`. Defaults to latest. |
