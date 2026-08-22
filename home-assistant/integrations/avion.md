# Avi-on

支持 Avi-on 蓝牙调光开关 [Avi-on](https://avi-on.com/)。

## 设置

如果您想手动添加设备（如下例所示），则需要获取 API 密钥。可以通过执行以下命令获取 API 密钥：

```bash
$ curl -X POST -H "Content-Type: application/json" \
    -d '{"email": "fakename@example.com", "password": "password"}' \
    https://api.avi-on.com/sessions | jq
```

将电子邮件和密码字段替换为通过移动应用程序注册设备时使用的字段。输出的 pass phrase 字段应用作配置中的 API 密钥。

## 配置

要启用这些灯，请将以下行添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
light:
  - platform: avion
```

有两种配置此集成的方式：用户名和密码，或设备列表。您必须选择其中一种。

```yaml
username:
  description: Avion 应用程序中使用的用户名。如果同时提供了用户名和密码，所有关联的开关将自动添加到您的配置中。
  required: false
  type: string
password:
  description: Avion 应用程序中使用的密码。
  required: false
  type: string
devices:
  description: 带有蓝牙地址的设备可选列表。
  required: false
  type: list
  keys:
    name:
      description: 在前端使用的自定义名称。
      required: false
      type: string
    api_key:
      description: API 密钥。
      required: true
      type: string
    id:
      description: 调光开关的 ID。仅在独立控制多个设备时需要。
      required: true
      type: string
```

## 完整示例

如果未提供用户名和密码，则必须手动配置设备，如下所示：

```yaml
# 手动设备 configuration.yaml 条目
light:
  - platform: avion
    devices:
      00:21:4D:00:00:01:
        name: Light 1
        api_key: YOUR_API_KEY
```

要独立控制多个设备，必须指定每个设备的 ID（从 1 开始的整数）。每个开关的 ID 可以从 Avi-on API 猜测或检测。

```yaml
# 手动设备 configuration.yaml 条目
light:
  - platform: avion
    devices:
      00:21:4D:00:00:01:
        name: Light 1
        api_key: YOUR_API_KEY
        id: 1
      00:21:4D:00:00:02:
        name: Light 1
        api_key: YOUR_API_KEY
        id: 2
```
