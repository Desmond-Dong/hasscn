# EBox

将您的 [EBox](https://client.ebox.ca/) 账户信息集成到 Home Assistant 中。

## 配置

要在您的安装中使用 EBox 传感器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: ebox
    username: MYUSERNAME
    password: MYPASSWORD
    monitored_variables:
     - before_offpeak_download
     - before_offpeak_upload
     - before_offpeak_total
```

```yaml
username:
  description: 您的 EBox 用户名。
  required: true
  type: string
password:
  description: 您的 EBox 密码。
  required: true
  type: string
name:
  description: 传感器的名称。
  required: false
  default: EBox
  type: string
monitored_variables:
  description: 要监控的变量。
  required: true
  type: list
  keys:
    before_offpeak_download:
      description: 低谷前下载使用量
    before_offpeak_upload:
      description: 低谷前上传使用量
    before_offpeak_total:
      description: 低谷前总使用量
    offpeak_download:
      description: 低谷时段下载使用量
    offpeak_upload:
      description: 低谷时段上传使用量
    offpeak_total:
      description: 低谷时段总使用量
    download:
      description: 下载使用量
    upload:
      description: 上传使用量
    total:
      description: 总使用量
    balance:
      description: 账户余额
    limit:
      description: 限额使用量
    usage:
      description: 使用百分比
```
