# Version

**Version** 集成可以显示当前的 Home Assistant Core 版本信息。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 版本来源

通过此集成，您可以选择多个来源来获取版本信息。

```yaml
Local installation:
  description: 获取您当前正在运行的版本。
Home Assistant Versions:
  description: 使用与 Supervisor 相同的来源，根据您选择的更新通道和镜像检查版本更新。
Home Assistant Website:
  description: 通过您当前浏览的 Home Assistant 网站查询最新版本。
Docker Hub:
  description: 根据您选择的更新通道和镜像，查询 Docker Hub 上发布的最新标签。
Python Package Index (PyPI):
  description: 查询 PyPI 上最新发布的软件包版本。
```

## 实体

此集成创建的实体取决于您配置时选择的来源（您也可以多次添加该集成以使用更多来源）。

### 传感器

对于所有来源，该集成都会创建一个 [sensor](/home-assistant/integrations/sensor.md) 实体，用于显示该来源发布的最新版本。

### 二进制传感器

对于所有来源（“[本地安装](#local-installation)”来源除外），该集成都将创建一个 [binary\_sensor](/home-assistant/integrations/binary_sensor.md) 实体，用于显示该来源是否发布了比您当前运行版本更高的新版本。
