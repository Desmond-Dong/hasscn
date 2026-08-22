---
author: Paulus Schoutsen
authorURL: https://twitter.com/balloob
authorImageURL: /img/profile/paulus.jpg
authorTwitter: balloob
title: 我能拥有用户权限吗？
---

Home Assistant 从 0.82 版本（2018 年 11 月发布）开始就拥有用户权限系统。权限附加到 groups 上，一个用户可以属于多个 group，用户权限基于合并其所有 group 的权限策略。更详细的信息可以在[我们的文档](/developers/auth_permissions)中找到。用户可以创建自己的 group，但也有三个系统 group："admin"、"users"（0.90 新增）和 "read-only"。三者都可以访问所有 entity，但 read-only 无法控制其中任何一个。只有属于 admin group 的用户才能访问管理用户和 integrations 等管理选项。

在 Home Assistant 0.90 之前，我们没有使用其中任何功能。相反，所有用户都属于 admin group，因为该 group 提供了与权限出现之前相同的访问权限。从 0.90 开始，我们将允许在系统 group "admin" 和 "users" 之间切换用户 group。当用户属于 "users" group 时，他们将无法管理 Home Assistant。UI 将隐藏用于打开配置面板或 developer tools 的菜单项。

![显示 users group 中用户的截图](/img/en/blog/2019-03-user-permissions/screenshot.png)

然而，此功能尚未完成。我们需要审查 Home Assistant 代码，确保所有 API 和 service 调用都检查了用户权限。因此，虽然用户将无法通过 UI 进行更改，但可能仍然存在无需权限即可访问的 API。而且我们不仅需要检查 Home Assistant 代码，注册了 services 或 APIs 的 custom components 也需要进行更新。

所以这里就是你可以帮助的地方！如果你正在维护某个 integration（无论是 custom 还是内置的），请阅读[如何检查权限的文档](/developers/auth_permissions#checking-permissions)。然后检查你的 integration 是否正确检查了权限。检查完自己的之后，帮助别人检查他们的，并帮助我们审查 Home Assistant 中的所有 services 和 API 调用。

## 那 custom groups 呢？

虽然我们支持创建 custom groups，但暂时不要期望它会公开提供。原因是这需要大量工作来处理与 custom policies 交互的 API。最困难的部分是，custom policy 可能只允许读取几个 entity 的权限，并且只允许对其中一部分进行控制访问。我们需要逐一检查每个 API 以确保它们支持这一点。Lovelace 也需要进行更新，以支持用户拥有自己的配置视图。

话虽如此，如果你确实想试用它，这是可能的。

:::danger
这是有风险的。请做好备份等。
:::

关闭 Home Assistant，并打开 `<config>/.storage/auth`。找到键 `"groups"`，并添加一个新 group：

```json
{
  "id": "my-custom-group",
  "name": "My Custom Group",
  "policy": {
    "entities": {
      "entity_ids": {
        "light.kitchen": true,
        "switch.ac": {
          "read": true
        }
      }
    }
  }
}
```

现在在文件中向下滚动到 `"users"` 键，找到你想要应用 custom group 的用户。对于该用户，将其 `"group_ids"` 值更新为你的 custom group。注意，你不应更新 `"owner": true` 的用户，因为他们将始终拥有所有权限。

```json
"group_ids": [
    "my-custom-group"
],
```

现在启动 Home Assistant 并使用更新后的用户登录。如果一切顺利，你应该只能看到厨房灯和空调开关。控制空调将失败。

一个用户可以属于任意多个 group。只有 `system-admin` group 的成员才能管理系统。要了解有关 policy 格式的更多信息，请查看[文档](/developers/auth_permissions)。