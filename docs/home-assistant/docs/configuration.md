---
title: "Configuration.yaml"
description: '虽然您可以在用户界面中完成 Home Assistant 的大部分配置，但某些集成仍需要编辑 configuration.yaml 文件。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
related:
  - docs: /docs/configuration/yaml/
    title: YAML syntax
  - docs: /docs/configuration/secrets
    title: Storing credentials in `secrets.yaml` file
  - docs: /common-tasks/general/#backups
    title: Creating and restoring backups
  - docs: /docs/tools/dev-tools/#reloading-the-yaml-configuration
    title: Reloading the YAML configuration from developer tools
  - docs: /common-tasks/os/#configuring-access-to-files
    title: Configuring file access on the Operating System
  - docs: docs/configuration/troubleshooting/
    title: Troubleshooting the configuration
---
# Configuration.yaml

虽然您可以在用户界面中完成 Home Assistant 的大部分配置，但某些集成仍需要编辑 `configuration.yaml` 文件。

这个文件包含需要加载的 integrations 及其配置。在文档中，您会看到可以添加到配置文件中的片段，用于启用特定功能。

<p class='img'>
<img src='/home-assistant/images/docs/configuration/config-yaml_via-file-editor.png' alt='Screenshot of an example of a configuration.yaml file, accessed using the File editor app on a Home Assistant Operating System installation.'>
`configuration.yaml` 文件示例：通过 Home Assistant Operating System 上的 File editor 应用访问。
</p>

## 编辑 `configuration.yaml`

如何编辑 `configuration.yaml` 取决于您的编辑器偏好，以及您使用的 Home Assistant [installation type](/home-assistant/installation/#about-installation-types)。请按以下步骤操作：

1. [设置文件访问](#to-set-up-access-to-the-files-and-prepare-an-editor)。
2. [找到配置目录](#to-find-the-configuration-directory)。
3. [编辑 `configuration.yaml` 文件](#to-edit-the-configuration-file)。
4. 保存更改后，执行[重新加载配置](#reloading-the-configuration-to-apply-changes)以应用更改。

### 设置文件访问并准备编辑器

在编辑文件前，您需要先了解如何访问 Home Assistant 的文件，并准备一个编辑器。
文件访问方式取决于您的 [installation type](/home-assistant/installation/#about-installation-types)。例如，使用 Home Assistant Operating System 时可用编辑器应用；使用 Home Assistant Container 时则无法使用此类应用。

在 Home Assistant Operating System 上设置文件访问时，请参考以下方式：

- 如果您不确定该选哪个，建议安装 [file editor app](/home-assistant/common-tasks/os/#installing-and-using-the-file-editor-app)。
  - 也可以使用 [Studio Code Server app](/home-assistant/common-tasks/os/#installing-and-using-the-visual-studio-code-vsc-app)。它支持实时语法检查和 Home Assistant 实体自动补全，但界面相对更复杂。
  - 如果您更喜欢在电脑本地编辑文件，可使用 [Samba app](/home-assistant/common-tasks/os/#installing-and-using-the-samba-app)。

### 找到配置目录

1. 要查看配置目录路径，请前往 [**Settings** > **System** > **Repairs**](https://my.home-assistant.io/redirect/system_health/)。
   - 打开右上角三点菜单，选择 **System information**。

    ![Show system information option](/home-assistant/images/screenshots/System_information_menu.png)

2. 找到 **Configuration directory** 的位置。

    ![Screenshot showing the top of the system information panel](/home-assistant/images/screenshots/system_information.png)
   - 如果您没有修改文件结构，默认位置如下：
     - Home Assistant Operating System：`configuration.yaml` 位于安装环境中的 `/config` 文件夹。
     - Home Assistant Container：`configuration.yaml` 位于容器挂载的 config 文件夹中。

### 编辑配置文件

找到 config 文件夹后，您就可以编辑 `configuration.yaml` 文件。具体方式取决于您在步骤 1 选择的编辑器：

- **如果您使用 File editor app**：打开应用后，在左侧文件浏览器进入 `/config` 文件夹，选择 `configuration.yaml` 并打开。
- **如果您使用 Studio Code Server app**：打开应用后，在左侧资源管理器中定位 `configuration.yaml` 并打开。
- **如果您使用 Samba 访问文件**：在电脑共享目录中找到 `configuration.yaml`，使用您偏好的文本编辑器打开，例如 [Notepad++](https://notepad-plus-plus.org/) 或 [Visual Studio Code](https://code.visualstudio.com/)。

:::note
如果您看过使用 `configuration.yaml` 配置 Home Assistant 的视频（尤其是较早期的视频），可能会发现您当前的默认配置文件比视频里的短很多。请不用担心，这并不代表您操作有误。旧视频中默认配置里的许多项目现在已经包含在 `default_config:` 这一行中。更多内容请参阅 [default config integration](/home-assistant/integrations/default_config/)。


:::
## 验证配置

修改配置或自动化文件后，您可以检查配置是否有效。重新加载配置或重启 Home Assistant 时，也会自动执行配置检查。

执行配置检查的方法取决于您的 [installation type](/home-assistant/installation/#about-installation-types)。请查看对应安装类型的常见任务说明：

- [Configuration check on Operating System](/home-assistant/common-tasks/os/#configuration-check)
- [Configuration check on Container](/home-assistant/common-tasks/container/#configuration-check)

## 重新加载配置以应用更改

要让配置更改生效，需要重新加载配置。Home Assistant 中多数不直接与 devices 或 services 交互的集成，都可以在不重启 Home Assistant 的情况下重新加载 `configuration.yaml` 里的改动。

1. 在 **Settings** 中，点击右上角三点菜单 `[mdi:dots-vertical]`，选择 **Restart Home Assistant** > **Quick reload**。

   ![Settings, three dot menu, restart Home Assistant](/home-assistant/images/docs/configuration/settings_restart_ha.png)

2. 如果您发现更改未生效，则需要重启。
   - 选择 **Restart Home Assistant**。
   - 注意：这会中断自动化和脚本。

   ![Reload and restart buttons](/home-assistant/images/docs/configuration/reload_restart.png)

## 配置故障排查

如果您在配置 Home Assistant 时遇到问题，请参阅 [configuration troubleshooting page](/home-assistant/docs/configuration/troubleshooting/)。
