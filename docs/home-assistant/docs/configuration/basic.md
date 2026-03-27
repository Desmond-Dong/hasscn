---
title: 设置基本信息
description: '作为默认引导流程的一部分，Home Assistant 可以通过 IP 地址地理定位检测您的位置。Home Assistant 将根据此位置自动选择单位系统和时区。如果您在引导过程中没有直接调整此设置，可以稍后再进行设置。 本页属于 Home Assistant 中文文档。'
---
# 设置基本信息

作为默认引导流程的一部分，Home Assistant 可以通过 IP 地址地理定位检测您的位置。Home Assistant 将根据此位置自动选择单位系统和时区。如果您在引导过程中没有直接调整此设置，可以稍后再进行设置。

<p class='img'>
    <img class="no-shadow" src='/home-assistant/images/docs/configuration/general-settings.png' alt='显示常规设置页面的截图'>
    显示常规设置页面的截图。
</p>

这里描述的常规设置由 [Home Assistant 核心集成](/home-assistant/integrations/homeassistant/) 管理。如果您对此集成提供的动作感兴趣，请查看集成文档。

## 编辑常规设置

要更改引导过程中定义的常规设置，请按照以下步骤操作：

1. 转到 [**设置** > **系统** > **常规**](https://my.home-assistant.io/redirect/general/)。
   - 进行更改。
   - 要更改位置或半径，在 **编辑位置** 下，选择编辑。
   - 然后，调整位置和半径。
      <img class="no-shadow" src='/home-assistant/images/docs/configuration/change_location_radius.webp' alt='显示如何在编辑主页上缩放和平移以更改位置和半径的屏幕录制'>
   - 要添加新区域，选择 **添加区域**。
   - 要保存更改，选择 **更新**。
2. 要更改网络相关配置，如网络名称，转到 [**设置** > **系统** > **网络**](https://my.home-assistant.io/redirect/network/)。
3. 如果某些设置不可见，您可能需要启用 **高级模式**。
   - 在左下角，选择您的用户名以进入您的 [**用户资料**](https://my.home-assistant.io/redirect/profile/)，然后启用 **高级模式**。
4. **故障排除**：如果任何设置显示为灰色且无法编辑，这是因为它们在 **`configuration.yaml`** 文件中定义。
   - 如果您希望在 UI 中编辑这些设置，必须从 **`configuration.yaml`** 文件中删除这些条目。
   - 有关 YAML 中常规设置的更多信息，请参阅 [Home Assistant 核心集成文档](/home-assistant/integrations/homeassistant/)。

    ![设置字段显示为灰色，因为配置设置存储在 configuration.yaml 文件中](/home-assistant/images/docs/configuration/general-settings-stored-in-config-yaml.png)

5. 要应用更改，请按照 [重新加载配置](/home-assistant/docs/configuration/#reloading-configuration-changes) 上的步骤操作。

## 更改人员的显示名称

显示名称是在 Home Assistant 中显示的名称。它可以与用于登录的用户名不同。

### 前提条件

- 您需要管理员权限才能更改显示名称。

## 更改显示名称

1. 要编辑使用 Home Assistant 的人员的显示名称，转到 [**设置** > **人员**](https://my.home-assistant.io/redirect/people/)，然后选择您要更改显示名称的人员。
2. 更改显示名称，然后选择 **更新** 以保存更改。

## 更改用户名

用户名是用于登录的名称。它可以与显示名称不同。

### 前提条件

- 您需要所有者权限才能更改用户名。

### 更改用户名

1. 要编辑使用 Home Assistant 的人员的用户名，转到 [**设置** > **人员**](https://my.home-assistant.io/redirect/people/)，然后选择您要更改显示名称的人员。
2. 更改用户名，然后选择 **更新** 以保存更改。
   - 用户名必须小写且不能包含空格。
   - 登录时区分大小写。

## 更改认证设置

要了解如何编辑认证设置（如密码或多因素认证），请参阅以下主题：

- [认证](/home-assistant/docs/authentication/)
- [多因素认证](/home-assistant/docs/authentication/multi-factor-auth/)
- [帮助，我被锁定了](/home-assistant/docs/locked_out/)
