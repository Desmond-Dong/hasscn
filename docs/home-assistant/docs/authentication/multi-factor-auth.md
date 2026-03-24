---
title: 多因素认证
description: 配置不同多因素认证模块的指南。
---

多因素认证（MFA）模块要求您在提供密码后解决第二个挑战。

密码可能通过多种方式被泄露，例如，如果是简单密码，可能会被猜到。MFA 通过要求以下内容提供第二层防护：

- 您知道的东西，如用户名和密码，以及
- 您拥有的东西，如发送到您手机的一次性密码。

您可以将 MFA 与任何其他认证提供程序一起使用。如果启用了多个 MFA 模块，您可以在登录时选择其中一个。

您可以在用户账户的[个人资料页面](/home-assistant/docs/authentication/#your-account-profile)中开启或关闭 MFA。

## 可用的 MFA 模块

### 基于时间的一次性密码 MFA 模块

[基于时间的一次性密码](https://en.wikipedia.org/wiki/Time-based_One-time_Password_algorithm)（TOTP）在现代认证系统中被广泛采用。

Home Assistant 生成一个密钥，该密钥与您手机上的应用程序同步。大约每三十秒，手机应用程序会生成一个随机的六位数字。因为 Home Assistant 知道密钥，所以它知道将生成哪个数字。如果您输入正确的数字，就可以登录。

#### 设置 TOTP

在您的 **`configuration.yaml`** 中启用 TOTP，如下所示：

```yaml
homeassistant:
  auth_mfa_modules:
    - type: totp
```

如果 `configuration.yaml` 中没有定义 `auth_mfa_modules` 配置部分，则会自动加载一个名为 **Authenticator app** 的 TOTP 模块。

您需要在手机上安装一个认证器应用程序。我们推荐 [Google Authenticator](https://support.google.com/accounts/answer/1066447) 或 [Authy](https://authy.com/)。这两个应用都支持 iOS 和 Android。

1. 重启 Home Assistant。
2. 前往您的[**用户资料**](https://my.home-assistant.io/redirect/profile/)并选择 **安全** 选项卡。
3. 在 **多因素认证模块** 部分，选择 **启用**，系统将生成一个新的密钥。
4. 打开您手机上的应用程序，通过扫描二维码或手动输入二维码下方的密钥来输入密钥。

    <img src='/home-assistant/images/docs/authentication/mfa.png' alt='Screenshot of setting up multi-factor authentication' style='border: 0;box-shadow: none;'>

    
    请像对待密码一样对待密钥——切勿泄露给他人。
    

5. 您的手机应用程序现在将大约每三十秒生成一个不同的六位数验证码。在 Home Assistant 中二维码下方的 **代码** 输入框中输入其中一个验证码。
   - **结果**：Home Assistant 和您的手机应用程序现已同步，您现在可以使用应用程序中显示的验证码登录。

#### 使用 TOTP

启用 TOTP 后，Home Assistant 要求您提供手机应用程序中的最新验证码才能登录。

:::note
TOTP 是_基于时间_的，因此它依赖于您的 Home Assistant 时钟准确。如果验证持续失败，请确保 Home Assistant 上的时钟正确。
:::

### 通知多因素认证模块

通知 MFA 模块使用 [notify 集成](/home-assistant/integrations/notify/)向您发送 [基于 HMAC 的一次性密码](https://en.wikipedia.org/wiki/HMAC-based_One-time_Password_algorithm)。该密码通常会发送到您的手机，但也可以发送到 `notify` 动作支持的任何目标。您使用此密码登录。

#### 设置 MFA 通知

将通知 MFA 添加到您的 **`configuration.yaml`** 文件中，如下所示：

```yaml
homeassistant:
  auth_mfa_modules:
    - type: notify
      include:
        - notify_entity
```

exclude:
  description: 要排除的通知实体列表。
  required: false
  type: list
include:
  description: 要包含的通知实体列表。
  required: false
  type: list
message:
  description: 消息模板。
  required: false
  type: template

```yaml
# 示例配置，带有消息模板。
homeassistant:
  auth_mfa_modules:
    - type: totp
      name: "Authenticator app"
    - type: notify
      message: "我差点忘了，要进入我的俱乐部，你需要说 {}"
```

重启 Home Assistant 后，前往[**用户资料**](https://my.home-assistant.io/redirect/profile/)并选择 **安全** 选项卡。在 **多因素认证模块** 部分中，于 **通知一次性密码** 下方选择 **启用**。

尝试注销，然后再次登录。系统会要求您输入发送到通知实体的六位数一次性密码。输入密码即可登录。

如果验证失败，将再次发送新的一次性密码。

:::note
通知 MFA 模块无法判断一次性密码是否成功送达。如果您没有收到通知，将无法登录。

您可以通过编辑或删除文件 `[您的配置目录]/.storage/auth_module.notify` 来禁用通知 MFA 模块。
:::
