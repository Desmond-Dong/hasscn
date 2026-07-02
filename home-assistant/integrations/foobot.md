# Foobot

**Foobot** 集成将从您或您的 [Foobot device(s)](https://foobot.io/features/) 获取空气质量数据。

该传感器需要 API 令牌。请通过 [Foobot API site](https://api.foobot.io/apidoc/index.html) 获取。

## 配置平台

要启用此传感器，请将以下行添加到“`configuration.yaml`”文件中：

```yaml
sensor:
  - platform: foobot
    token: FOOBOT_SECRET_KEY
    username: FOOBOT_USERNAME
```

```yaml
令牌：
描述：Foobot API 的令牌。
必填：真实
类型：字符串
用户名：
描述：您的 Foobot 用户名，用于获取与帐户关联的设备。
必填：真实
类型：字符串
```

## 可用指标

每十分钟，它将获取以下测量值的最后十分钟平均值：

* 温度
* 湿度
  * Co2
* 挥发性有机化合物
  * PM2.5
* [Index](https://help.foobot.io/hc/en-us/articles/204814371-What-does-central-number-mean-)
