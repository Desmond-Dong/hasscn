# Brother Printer

**Brother Printer** 集成允许您读取本地 Brother 打印机的当前数据。

它通常提供有关设备状态、剩余墨水或碳粉量以及硒鼓或打印机其他部件剩余寿命的信息。
集成监控每个受支持的部件。

## 前提条件

* 要启用 SNMP，请导航到打印机的网页界面（例如：`http://192.168.5.6`）并在 **Network** > **Protocol** > **SNMP** 下将其开启。

* 对于某些型号，访问网页界面受密码保护。
  * 对于某些打印机，默认密码印在打印机背面的贴纸上，前面有 **Pwd**。
  * 如果打印机贴纸上没有密码，默认密码为 `initpass`。

* 对于某些 Brother 设备，**SNMPv3 read-write access and v1/v2c read-only access** 是必需的选项（在高级设置下）。

![Brother Printer 网页界面上的 SNMP 设置](/home-assistant/images/integrations/brother/brother-printer-webui.png)

## 不支持的设备

以下设备不受集成支持：

* MFC-8660DN
* MFC-8860DN

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
    description: "要控制的 Brother 打印机的主机名或 IP 地址。"
Port:
    description: "Brother 打印机的 SNMP 端口。"
SNMP Community:
    description: "设备之间相互通信的简单密码。"
Type of the printer:
    description: "Brother 打印机类型：ink 或 laser。"
```

## 支持的功能

Brother 集成提供以下实体。

### 传感器

* **Belt unit remaining lifetime**
  * **描述**：传送带单元的剩余寿命百分比
* **Black drum page counter**
  * **描述**：使用黑色硒鼓打印的总页数
* **Black drum remaining lifetime**
  * **描述**：黑色硒鼓的剩余寿命百分比
* **Black drum remaining pages**
  * **描述**：黑色硒鼓的估计剩余页数
* **Black ink remaining**
  * **描述**：黑色墨水剩余百分比
* **Black toner remaining**
  * **描述**：黑色碳粉剩余百分比
* **B/W pages**
  * **描述**：打印的黑白总页数
* **Color pages**
  * **描述**：打印的彩色总页数
* **Cyan drum page counter**
  * **描述**：使用青色硒鼓打印的总页数
* **Cyan drum remaining lifetime**
  * **描述**：青色硒鼓的剩余寿命百分比
* **Cyan drum remaining pages**
  * **描述**：青色硒鼓的估计剩余页数
* **Cyan ink remaining**
  * **描述**：青色墨水剩余百分比
* **Cyan toner remaining**
  * **描述**：青色碳粉剩余百分比
* **Drum page counter**
  * **描述**：使用主硒鼓打印的总页数
* **Drum remaining lifetime**
  * **描述**：主硒鼓的剩余寿命百分比
* **Drum remaining pages**
  * **描述**：主硒鼓的估计剩余页数
* **Duplex unit page counter**
  * **描述**：使用双面打印单元打印的总页数
* **Fuser remaining lifetime**
  * **描述**：定影器单元的剩余寿命百分比
* **Laser remaining lifetime**
  * **描述**：激光单元的剩余寿命百分比
* **Last restart**
  * **描述**：上次打印机重启的日期和时间
  * **备注**：此实体默认禁用
* **Magenta drum page counter**
  * **描述**：使用品红硒鼓打印的总页数
* **Magenta drum remaining lifetime**
  * **描述**：品红硒鼓的剩余寿命百分比
* **Magenta drum remaining pages**
  * **描述**：品红硒鼓的估计剩余页数
* **Magenta ink remaining**
  * **描述**：品红墨水剩余百分比
* **Magenta toner remaining**
  * **描述**：品红碳粉剩余百分比
* **Page counter**
  * **描述**：打印机打印的总页数
* **PF Kit 1 remaining lifetime**
  * **描述**：送纸组件 1 的剩余寿命百分比
* **PF Kit MP remaining lifetime**
  * **描述**：多用途托盘送纸组件的剩余寿命百分比
* **Status**
  * **描述**：当前打印机状态或条件
* **Yellow drum page counter**
  * **描述**：使用黄色硒鼓打印的总页数
* **Yellow drum remaining lifetime**
  * **描述**：黄色硒鼓的剩余寿命百分比
* **Yellow drum remaining pages**
  * **描述**：黄色硒鼓的估计剩余页数
* **Yellow ink remaining**
  * **描述**：黄色墨水剩余百分比
* **Yellow toner remaining**
  * **描述**：黄色碳粉剩余百分比

:::note
并非所有打印机型号都支持所有列出的实体，实体集是针对特定打印机型号定制的。

:::

## 数据更新

默认情况下，集成每 30 秒从设备polls数据。

## 可能的用例

* 监控打印机状态，当卡纸或其他意外事件发生时发送通知。

## 示例

您可以配置 Home Assistant 在打印机卡纸或缺纸时提醒您，如下所示。首先，在 `template:` 部分下将以下内容添加到 "`configuration.yaml`" 中。
将 `sensor.hl_l2340d_status` 替换为您传感器的实际名称。

```yaml
template:
  - binary_sensor:
    - name: '激光打印机缺纸'
      state: >
        {{ is_state('sensor.hl_l2340d_status', 'no paper') }}

  - binary_sensor:
    - name: '激光打印机卡纸'
      state: >
        {{ is_state('sensor.hl_l2340d_status', 'paper jam') }}
```

然后，在 `alert:` 部分下添加：

```yaml
  laser_out_of_paper:
    name: 激光打印机缺纸
    done_message: 激光打印机有纸了
    entity_id: binary_sensor.laser_printer_out_of_paper
    can_acknowledge: true
    notifiers:
      - my_phone_notify

  laser_paper_jam:
    name: 激光打印机卡纸
    done_message: 激光打印机卡纸已清除
    entity_id: binary_sensor.laser_printer_paper_jam
    can_acknowledge: true
    notifiers:
      - my_phone_notify
```

以上内容将在检测到条件时发送卡纸或缺纸提醒，假设您已在手机上配置了 Home Assistant 应用，以便可以直接向其发送提醒。如果您不使用 Home Assistant 应用，则需要设置其他通知器。

将 `my_phone_notify` 更改为您使用的实际通知器。

## 已知限制

* 一些非常旧的 Brother 打印机使用不同的数据格式。这些型号不受支持。集成将在配置期间显示有关信息。

## 故障排除

### 更改 SNMP community 后打印机不可用

在打印机配置中更改 SNMP community 后，您需要在 Home Assistant 中重新配置设备。为此：

1. 转到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 选择 **Brother Printer**。
3. 点击 `[mdi:dots-vertical]`。
4. 选择 **重新配置**。

### 集成报告通信或数据更新问题

1. 检查打印机是否在线并在本地网络上可用。
2. 在打印机的网页界面中检查 SNMP 是否已启用。
3. 在打印机的网页界面中，如果可用，验证是否启用了 **SNMPv3 read/write access and v1/v2c read-only access**。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
