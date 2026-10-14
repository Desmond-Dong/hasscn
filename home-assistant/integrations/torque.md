# Torque

**Torque** 集成可让你监控通过 Torque 移动应用从蓝牙 OBD2 适配器转发的 [Torque](https://torque-bhp.com/) 数据。

## 设置

要在你的安装中使用 Torque 传感器，你必须同时配置 Torque 移动应用和 Home Assistant。

### Torque 应用

在 **Settings** > **Data Logging & Upload** 中：

在 **Logging Preferences** 部分下：

* 轻触 **Select what to log**，打开右上角菜单，然后选择 **Add PID to log**。
* 选择你感兴趣的项目。

在 **Realtime Web Upload** 部分下：

* 勾选 **Upload to web-server**。
* 在 **Web-server URL** 中输入 `https://HOST/api/torque` 或 `https://@/HOST:PORT/api/torque`，其中 `HOST` 和 `PORT` 是可从外部访问的 Home Assistant HTTP 主机地址。若要使用 Bearer Token，必须启用 [SSL/TLS](/home-assistant/docs/ecosystem/certificates/)。
* 启用 **Send HTTPS: Bearer Token**（自 Torque Pro 1.12.46 起可用）。
* 在 **Set Bearer Token** 字段中粘贴任意 Home Assistant 用户的长期访问令牌。
* 在 **User Email Address** 中输入一个电子邮件地址（可以是任意非空字符串）。
* 可选设置 **Web Logging Interval**。默认 2 秒的间隔可能会很快填满 Home Assistant 的历史数据库。

### 配置

将以下内容添加到你的 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
sensor:
  - platform: torque
    email: your_configured@email.com
```

```yaml
name:
  description: 车辆名称（可自行命名）。
  required: false
  default: vehicle
  type: string
email:
  description: 在 Torque 应用中配置的 Email address 字段的值，不一定要符合电子邮件格式。
  required: true
  type: string
```
