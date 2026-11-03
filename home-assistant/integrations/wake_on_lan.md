# Wake on LAN

**Wake on LAN** 集成可让您向支持 [Wake on LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) 的设备发送 *magic packets*，以将其唤醒开机。

Home Assistant 目前支持以下设备类型：

* [Button](#button) enabled from the UI
* [Switch](#switch) enabled from YAML configuration

:::tip
如果您想在不使用 YAML 的情况下实现一个开关，可以考虑使用 [template switch helper](/home-assistant/integrations/template/index.md#switch)。将 Wake on LAN 按钮作为开机操作，使用 [ping](/home-assistant/integrations/ping.md) 传感器表示状态，再用第三个服务作为关机操作。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Mac address:
  description: "The MAC address to send the wake-up command to. For example, `00:01:02:03:04:05`."
Broadcast address:
  description: 要发送 magic packet 的主机 IP 地址。
Broadcast port:
  description: 要发送 magic packet 的端口。
```

### 集成服务

可用服务：`send_magic_packet`。

如果您只想使用此服务，请将以下内容添加到 `configuration.yaml` 文件中

```yaml
# Example configuration.yaml entry
wake_on_lan:
```

### 操作

可用操作：`send_magic_packet`。

#### 操作：发送 magic packet

`wake_on_lan.send_magic_packet` 操作用于向支持 'Wake on LAN' 的设备发送 *magic packet* 以唤醒设备。

| Data attribute | Optional | Description                                           |
| ---------------------- | -------- | ----------------------------------------------------- |
| `mac`                  | no       | MAC address of the device to wake up.                 |
| `broadcast_address`    | yes      | Optional broadcast IP where to send the magic packet. |
| `broadcast_port`       | yes      | Optional port where to send the magic packet.         |

示例操作数据：

```json
{
   "mac":"00:40:13:ed:f1:32"
}
```

:::note
这通常仅在目标设备连接到同一网络时有效。要将 magic packet 路由到其他子网，需要在路由器上进行特殊配置，或者可能根本无法实现。
用于转发该数据包的功能通常叫做 `IP Helper`。它可能支持 Wake on LAN，但并非所有路由器都支持。

:::

## Button

`wake_on_lan` (WOL) 按钮集成可让您打开支持 [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) 的计算机。

WOL 按钮只能用于开机。
它会向配置中指定的 MAC 地址发送 magic packet。由于它是按钮，因此没有状态。这意味着它无法监控支持 WOL 的计算机是否真的收到了唤醒请求并已启动。

## Switch

`wake_on_lan` (WOL) 开关集成可让您打开支持 [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) 的计算机。

WOL 开关只能用于开机和监控状态。目前并不存在通用的远程关机方式。`turn_off` 变量是为了让您在找到适合自己计算机的远程关机方法后，能够调用相应脚本。下方提供了一些建议做法。

要求二进制程序 `ping` 位于您的 `$PATH` 中。

要在安装环境中启用此开关，请将以下内容添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
switch:
  - platform: wake_on_lan
    mac: MAC_ADDRESS
```

```yaml
mac:
  description: "The MAC address to send the wake up command to, e.g, `00:01:02:03:04:05`."
  required: true
  type: string
name:
  description: 开关名称。
  required: false
  default: Wake on LAN
  type: string
host:
  description: 用于检查设备状态（开/关）的 IP 地址或主机名。如果未提供，则开关状态将根据最后一次执行的操作进行推断。
  required: false
  type: string
turn_off:
  description: 定义当开关关闭时要运行的 [action](/home-assistant/getting-started/automation/)。
  required: false
  type: string
broadcast_address:
  description: The IP address of the host to send the magic packet to.
  required: false
  default: 255.255.255.255
  type: string
broadcast_port:
  description: The port to send the magic packet to.
  required: false
  type: integer
```

### 示例

以下是一些实际使用 **turn\_off** 变量的示例。

#### 挂起 Linux

下面是一种建议做法：让运行在另一台 Linux 计算机（**server**）上的 Home Assistant，通过 `turn_off` 脚本挂起目标 Linux 计算机（**target**）。

1. On the **server**, log in as the user account Home Assistant is running under. In this example it's `hass`.
2. On the **server**, create a `.ssh` directory in `/config`. This is necessary to avoid a 255 error that prevents the SSH command from executing.
3. On the **server**, create SSH keys by running `ssh-keygen`. Just press enter on all questions.
4. On the **target**, create a new account that Home Assistant can ssh into: `sudo adduser hass`. Just press enter on all questions except password. It's recommended using the same username as on the server. If you do, you can leave out `hass@` in the SSH commands below.
5. On the **server**, transfer your public SSH key by `ssh-copy-id hass@TARGET` where TARGET is your target machine's name or IP address. Enter the password you created in step 4.
6. On the **server**, verify that you can reach your target machine without password by `ssh TARGET`.
7. On the **target**, we need to let the `hass` user execute the program needed to suspend/shut down the target computer. Here it is `pm-suspend`, use `poweroff` to turn off the computer. First, get the full path: `which pm-suspend`. On my system, this is `/usr/sbin/pm-suspend`.
8. On the **target**, using an account with sudo access (typically your main account), `sudo visudo`. Add this line last in the file: `hass ALL=NOPASSWD:/usr/sbin/pm-suspend`, where you replace `hass` with the name of your user on the target, if different, and `/usr/sbin/pm-suspend` with the command of your choice, if different.
9. On the **server**, add the following to your configuration, replacing TARGET with the target's name:

```yaml
switch:
  - platform: wake_on_lan
    name: "TARGET"
    mac: XX:XX:XX:XX:XX:XX
    turn_off:
      action: shell_command.turn_off_TARGET

shell_command:
  turn_off_TARGET: "ssh hass@TARGET sudo pm-suspend"
```

## 结合自动化的辅助按钮

使用 `wake_on_lan` 平台定义的开关，在 UI 中会同时显示可点击的 `on` 和 `off` 操作。如果您不打算使用 `turn_off` 功能，那么使用虚拟按钮配合自动化会更简洁，也更不容易引起误解，因为它只会有一个操作。

1. First, define a new helper button.

   * Go to **[Settings > Devices & services > Helpers](https://my.home-assistant.io/redirect/helpers/)** and select the **+ Create helper** button. Choose **Button** and give it a name. A button named "Wake PC" will render like this:

   ![Home Assistant 10e468a0 45c8 4ee7 b69d 596db3845b14](https://github.com/home-assistant/home-assistant.io/assets/252209/10e468a0-45c8-4ee7-b69d-596db3845b14)

2. Then, create a new automation. Go to **[Settings > Automations & scenes](https://my.home-assistant.io/redirect/automations/)** and select **+ Create Automation**.
   * The trigger will be on `State` and the entity will be the button you created.
   * Continuing your example, the trigger YAML will look like this:

     ```yaml
     trigger: state
     entity_id:
       - input_button.wake_pc
     ```

3. For the action, select **Perform action** and choose **Wake on LAN: Send magic packet**.

4. Type in the target MAC address.
   * Do not change the broadcast port unless you've configured your device to listen to a different port.
   * Continuing our example, the action YAML looks like this:

     ```yaml
     action: wake_on_lan.send_magic_packet
     data:
       broadcast_port: 9
       mac: 00:11:22:33:44:55
     ```

5. Save the automation. Now, when you activate `PRESS` on the helper button in the UI, Home Assistant will send a wake packet to the configured MAC.
