# One-Time Password (OTP)

**One-Time Password (OTP)** 集成会按照 [RFC6238](https://tools.ietf.org/html/rfc6238) 生成一次性密码，并兼容大多数 OTP 生成器，包括 Google Authenticator。当您构建自定义安全方案并希望使用每 30 秒变化一次的“滚动验证码”时，可以使用此集成。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 生成令牌

为新传感器生成 `token` 的一个简单方法，是在您的 Home Assistant 虚拟环境中运行下面这段 Python 代码：

```bash
$ pip3 install pyotp
$ python3 -c 'import pyotp; print("Token:", pyotp.random_base32())'
Token: IHEDPEBEVA2WVHB7
```

如需在 Docker 容器中运行：

```bash
$ docker exec -it home-assistant python -c 'import pyotp; print("Token:", pyotp.random_base32())'
Token: IHEDPEBEVA2WVHB7
```

将该令牌复制并粘贴到 Home Assistant 配置中，并添加到您的 OTP 生成器里。请确认两者生成的验证码相同。

:::important
请务必确保您的 Home Assistant 实例和 OTP 生成器设备（例如手机）上的系统时钟都正确无误。否则，生成的验证码将无法匹配！在提交问题之前，请先确认 NTP 正在运行并正确同步时间。

:::
