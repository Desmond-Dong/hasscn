# Digital Ocean

**Digital Ocean** 集成允许您从 Home Assistant 访问有关您的 [Digital Ocean](https://www.digitalocean.com/) droplets 的信息。

目前 Home Assistant 支持以下设备类型：

* [二值传感器](/home-assistant/integrations/digital_ocean/index.md#binary-sensor)
* [开关](/home-assistant/integrations/digital_ocean/index.md#switch)

## 设置

从您的 [Digital Ocean 控制面板](https://cloud.digitalocean.com/settings/api/tokens) 获取 API 密钥。

## 配置

要将您的 Digital Ocean droplets 与 Home Assistant 集成，请将以下部分添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
digital_ocean:
  access_token: YOUR_API_KEY
```

```yaml
access_token:
  description: 您的 Digital Ocean API 访问令牌。
  required: true
  type: string
```

## 二值传感器

`digital_ocean` 二进制传感器平台允许您监控自己的 Digital Ocean droplets。

### 配置

要使用您的 Digital Ocean droplets，您首先需要设置您的 [Digital Ocean 集线器](/home-assistant/integrations/digital_ocean/index.md)，然后将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  - platform: digital_ocean
    droplets:
      - 'fedora-512mb-nyc3-01'
      - 'coreos-512mb-nyc3-01'
```

```yaml
droplets:
  description: 您要监控的 droplets 列表。
  required: true
  type: list
```

## 开关

`digital_ocean` 开关平台允许您控制（启动/停止）您的 Digital Ocean droplets。

### 配置

要使用您的 Digital Ocean droplets，您首先需要设置您的 [Digital Ocean 集线器](/home-assistant/integrations/digital_ocean/index.md)，然后将以下内容添加到您的 "`configuration.yaml`" 文件中：

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: digital_ocean
    droplets:
      - 'fedora-512mb-nyc3-01'
      - 'coreos-512mb-nyc3-01'
```

```yaml
droplets:
  description: 您要控制的 droplets 列表。
  required: true
  type: list
```
