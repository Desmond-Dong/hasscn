# Pterodactyl

[Pterodactyl](https://www.pterodactyl.io) is a game server management panel designed to simplify the administration of game servers. It offers a user-friendly interface  which allows users to manage multiple game servers from a single dashboard, supporting popular games like Minecraft. Its key features include an intuitive web-based control panel, automated server installation, real-time server monitoring, scheduled backups and more. Each game server runs in an isolated Docker container, ensuring security and stability.

The Pterodactyl integration allows you to monitor your game servers of your Pterodactyl server within Home Assistant.

## Prerequisites

To access your Pterodactyl server, an account API key is required. Follow these steps to create a new one:

* Access your **Pterodactyl Panel** and log in with your user account.
* From the main dashboard, click your **username** or **profile icon** in the top-right corner, then select **API Credentials**.
* Enter a **Description** to identify the key (for example, "Home Assistant").
* Optionally, specify **Allowed IPs** to restrict where the key can be used (leave blank to allow all IPs).
* Click **Create**. The panel will generate and display your new account API key.
* Copy the **account API key** immediately and store it securely. You won’t be able to view it again after leaving the page.

:::important
Pterodactyl has two different types of API keys: Account and Application. Application API keys are not supported, an account API key as described above is required instead.

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

During setup, you will be prompted to enter the **URL** and the **account API key** of the server.

```yaml
URL:
    description: "The URL of your Pterodactyl server, including the protocol (`http://` or `https://`) and optionally the port number. Example: `http://192.168.0.123:8080`"
Account API key:
    description: "The account API key for accessing your Pterodactyl server (see prerequisites)."
```

## Binary sensors

This integration provides a binary sensor with the following information for each game server of your Pterodactyl server:

* Status: `Running` or `Not running`

## Buttons

This integration provides the following buttons for each game server of your Pterodactyl server:

* Start server
* Stop server
* Restart server

The following button is provided as well, but disabled by default:

* Force stop server

:::warning
Using **force stop** will terminate the server immediately and may lead to game server file corruption.

:::

## Sensors

This integration provides the following sensors for each game server of your Pterodactyl server:

* CPU utilization
* Memory usage
* Disk usage
* Uptime

The following sensors are provided as well, but disabled by default:

* CPU limit
* Memory limit
* Disk limit
* Network inbound
* Network outbound

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
