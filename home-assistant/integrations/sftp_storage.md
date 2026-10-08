# SFTP Storage

The **SFTP Storage** integration works with the core [Backup](/home-assistant/integrations/backup.md) integration. When you enable **SFTP Storage** in the **Locations** section of your [Backup](/home-assistant/integrations/backup.md) integration settings, Home Assistant automatically stores manual and automatic backups on your remote SSH/SFTP server.

To learn how to create and restore a backup, refer to the backup section under [common tasks](/home-assistant/common-tasks/general/index.md#backups).

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: Hostname or IP address of SSH/SFTP Server to connect to.
  required: true
  type: string
Port:
  description: Port of your SSH/SFTP Server. This is usually 22.
  required: true
  type: integer
  default: 22
Username:
  description: Username to authenticate with.
  required: true
  type: string
Password:
  description: Password to authenticate with. Provide this or a private key file.
  required: true
  type: string
Private Key File:
  description: Upload a private key file used for authentication. Provide this or password.
  required: true
  type: selector
Remote path:
  description: Remote path where to upload backups. Directory must already exist and user provided in `Username` must have write access to it.
  required: true
  type: string
```

If both `Password` and `Private Key File` are provided, service will try to login with private key first, then fallback to password-based authentication if private key authentication fails.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

* After you remove the integration, all Home Assistant backups stored on the remote server are not automatically deleted. You need to manually delete them from the remote filesystem.
