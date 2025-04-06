## 如何与官方系统互转

### **Home Assistant 官方系统** 转到 **Home Assistant 极速版**

> **重要提示：** 所有操作都是在系统终端，请注意，不是网页上那个 Terminal

>而是连接显示器的那个界面；如果是在虚拟机中，请使用虚拟机控制台的界面。

**<span style="color:red;">在运行命令之前，请务必做好备份，以防万一，并在备份配置的底部保存好恢复密码。</span>**

[![备份](./images/backup.svg)](https://my.home-assistant.io/redirect/backup/) [![备份配置](./images/backup_config.svg)](https://my.home-assistant.io/redirect/backup_config/)

运行如下命令（命令如果运行成功，将会自动启启）：

```bash
curl -fsSL ota.hasscn.top/upgrade.sh | bash
```
