# Linode

**Linode** 集成可让您在 Home Assistant 中访问 [Linode](https://linode.com) 系统的信息。

目前在 Home Assistant 中支持以下设备类型：

* [Binary sensor](#binary-sensor)
* [Switch](#switch)

## 设置

从您的 Linode 账户获取 OAuth2 Access Token。

* <https://cloud.linode.com>
* 登录
* 选择 API Tokens
* 创建 Personal Access Token
* 分配权限范围（请选择完成任务所需的最小权限）

## 配置

要将 Linode 与 Home Assistant 集成，请将以下部分添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
linode:
  access_token: YOUR_ACCESS_TOKEN
```

```yaml
  access_token:
    description: Linode 访问令牌。
    required: true
    type: string
```

## 二进制传感器

`linode` 二进制传感器平台可让您监控 Linode 节点。

请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# configuration.yaml 示例条目
binary_sensor:
  - platform: linode
    nodes:
      - 'myvpsname'
```

```yaml
nodes:
  description: 您要控制的 VPS 列表。
  required: true
  type: string
```

## 开关

`linode` 开关平台可让您开启或关闭 Linode 节点。

请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# configuration.yaml 示例条目
switch:
  - platform: linode
    nodes:
      - 'myvpsname'
```

### Configuration variables for `linode`

nodes:
description: 您要控制的 VPS 列表。
required: true
type: string
