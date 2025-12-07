---
layout: doc
---

# 🏠 HACS China [![stars](https://img.shields.io/github/stars/hacs-china/integration)](https://github.com/hacs-china/integration/stargazers)
:::info Copyright
Version modified by: [Alone](https://anlo.ng/), if you are already using `Home Assistant OS Turbo`, no need to reinstall, it's built-in
:::



[HACS](https://hacs.xyz) is an excellent [Home Assistant](https://www.home-assistant.io) integration store, however, it's difficult for Chinese users to download plugins or frontend cards from it, mainly due to the domestic network environment.
This project uses Github proxy services provided by [gitmirror.com](https://gitmirror.com) and [fastgit.org](https://fastgit.org), allowing everyone to download plugins from the store more quickly.

:::tip We need your help
HACS China relies on players with GitHub accounts sharing tokens to enable account-free usage. If you're willing to share your token, please [click here](https://tokenhub.hacs.vip/) to help those in need
:::



### Installation/Update

:::tip
This project is a modified version of the official HACS integration. Installing this project will overwrite the official integration, but no need to reconfigure the integration (shares the same configuration), so you can install with confidence. If you want to switch to the official version, simply reinstall using the official shell command.
:::

:::warning
Choose any one of the following methods!
:::


#### Method 1️⃣: Install using command

```shell
wget -O - https://get.hacs.vip | bash -

# or

curl -fsSL get.hacs.vip | bash
```

- If you're using haos/hassio/supervised version of HA, you can directly execute the above command on the host machine or in the `Terminal & SSH` add-on
- If you're using core/docker version of HA, need to ssh into the host machine, cd into the HA configuration directory, then execute the installation command

#### Method 2️⃣: [`Add-on Installer: https://hacs.vip/get-addon`](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgitee.com%2Fhacs-china%2Faddons)

> Requires HAOS or Supervised version of HA

1. Add add-on repository [`https://gitee.com/hacs-china/addons`](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgitee.com%2Fhacs-china%2Faddons)
2. Find `HACS China Installer` and install the add-on
3. Start the add-on and observe the logs
4. Restart HA

#### Method 3️⃣: [`upgrade`](https://my.home-assistant.io/redirect/developer_call_service/?service=hacs.upgrade) service

> Requires HACS China v1.33.0.3 or higher already installed

1. Execute service [`service: hacs.upgrade`](https://my.home-assistant.io/redirect/developer_call_service/?service=hacs.upgrade) in Developer Tools
2. Restart HA to make the updated HACS take effect

#### Method 4️⃣: [`shell_command`](https://my.home-assistant.io/redirect/developer_call_service/?service=shell_command.update_hacs_china) service

1. Copy code to HA configuration file `configuration.yaml`
    ```yaml
    shell_command:
      update_hacs_china: |-
        wget -O - https://get.hacs.vip | bash -
    ```
2. Restart HA to make configuration take effect
3. Execute action [`action: shell_command.update_hacs_china`](https://my.home-assistant.io/redirect/developer_call_service/?service=shell_command.update_hacs_china) in Developer Tools
4. Restart HA again to make the updated HACS take effect

#### Method 5️⃣: [`Docker Installation`](https://hub.docker.com/r/hacn/hacn)

> Only for **Docker** version of HA without HACS installed

1. Install using command
    ```bash
    docker run -d \
      --name homeassistant \
      --privileged \
      --restart=unless-stopped \
      -e TZ=Asia/Shanghai \
      -v /PATH_TO_YOUR_CONFIG:/config \
      -v /run/dbus:/run/dbus:ro \
      --network=host \
      hacn/hacn:stable
    ```
2. Install using Compose
    ```yaml
    services:
      homeassistant:
        container_name: homeassistant
        image: hacn/hacn:stable
        volumes:
          - /PATH_TO_YOUR_CONFIG:/config
          - /etc/localtime:/etc/localtime:ro
          - /run/dbus:/run/dbus:ro
        restart: unless-stopped
        privileged: true
        network_mode: host
    ```
3. After startup, [add HACS integration](https://my.home-assistant.io/redirect/config_flow_start/?domain=hacs)

#### Method 6️⃣: Manual Installation

- [Click here to download](https://github.com/hacs-china/integration/releases/latest/download/hacs.zip) installation package and unzip (if download fails, please click [here](https://ghproxy.com/github.com/hacs-china/integration/releases/latest/download/hacs.zip) or [here](https://hub.fastgit.xyz/hacs-china/integration/releases/latest/download/hacs.zip))
- Access HA configuration directory via samba/ftp, usually the following directories:
  - `/usr/share/hassio/homeassistant` haos/hassio host machine
  - `/config` haos/hassio's `Samba` or `Terminal & SSH` add-on
  - `$HOME/.homeassistant` default configuration directory for HA installed in core mode
  - For HA installed with docker, it's the directory mapped after the `-v` parameter
- Create `custom_components` folder in HA configuration directory (ignore if already exists)
- Create `hacs` folder in `custom_components` directory (delete and recreate if already exists)
- Copy the unzipped files to the newly created `hacs` folder
- Restart HA
- [Add HACS integration](https://my.home-assistant.io/redirect/config_flow_start/?domain=hacs) (only for first-time installation)