---
title: MySensors
description: 关于如何将 MySensors 集成到 Home Assistant 的说明。

ha_category:
  - DIY
ha_iot_class: Local Push
ha_release: 0.73
ha_codeowners:
  - '@MartinHjelmare'
  - '@functionpointer'
ha_domain: mysensors
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - device_tracker
  - light
  - remote
  - sensor
  - switch
  - text
ha_config_flow: true
ha_integration_type: hub
---

[MySensors](https://www.mysensors.org) 项目将 Arduino、ESP8266、Raspberry Pi、NRF24L01+ 和 RFM69 等设备组合起来，用于构建低成本传感器网络。完成[presentation](#presentation) 后，此集成会自动将所有可用设备添加到 Home Assistant。也就是说，你无需为这些设备额外添加任何配置。你可以前往开发者工具中的 **states** 部分，查看已经识别出的设备。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

配置方式取决于你使用的 Gateway 类型：

### 串口网关

如果你使用原版 Arduino 作为串口网关，端口名称通常为 `ttyACM*`。具体编号可通过下方命令确定。

```bash
ls /dev/ttyACM*
```

除了串口设备外，你还需要输入波特率。

### MQTT 网关

如果你使用 MQTT 网关，则需要输入输入和输出的主题前缀。这些值需要与网关中的设置互换。也就是说，Home Assistant 的输入主题应当对应网关的输出（发布）主题。

:::note
MQTT 网关要求使用 MySensors 2.0 及以上版本，并且仅支持 MQTT client gateway。

:::
### 以太网网关

若要使用以太网网关，你需要配置该网关的 IP 地址和端口。

### 通用选项

所有网关都提供以下几个选项：

- persistence file:
  Home Assistant 会将已检测到的节点存储在一个文件中。这意味着重启 Home Assistant 后，无需重新发现所有节点。通过 persistence file 选项可以设置该文件路径。若留空，Home Assistant 会在配置目录中自动生成文件名。

- version:
  输入你的网关所使用的 MySensors 版本。

## Presentation

按照以下步骤来呈现一个 MySensors 传感器或执行器：

1. 启动 Home Assistant，并配置 MySensors 集成。
2. 编写并上传 MySensors sketch 到传感器。请确保你：
    - 发送 sketch 名称。
    - 呈现传感器的 `S_TYPE`。
    - 为每个 `V_TYPE` 至少发送一个初始值。在 MySensors 2.x 中，这必须在 `loop` 函数内完成。下面提供了一个 2.0 的示例，说明如何确保控制器已经接收到初始值。
3. 启动传感器。

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/relay
 */

#define MY_DEBUG
#define MY_RADIO_NRF24
#define MY_REPEATER_FEATURE
#define MY_NODE_ID 1
#include <SPI.h>
#include <MySensors.h>
#include <Bounce2.h>

#define RELAY_PIN  5
#define BUTTON_PIN  3
#define CHILD_ID 1
#define RELAY_ON 1
#define RELAY_OFF 0

Bounce debouncer = Bounce();
bool state = false;
bool initialValueSent = false;

MyMessage msg(CHILD_ID, V_STATUS);

void setup()
{
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  debouncer.attach(BUTTON_PIN);
  debouncer.interval(10);

  // Make sure relays are off when starting up
  digitalWrite(RELAY_PIN, RELAY_OFF);
  pinMode(RELAY_PIN, OUTPUT);
}

void presentation()  {
  sendSketchInfo("Relay+button", "1.0");
  present(CHILD_ID, S_BINARY);
}

void loop()
{
  if (!initialValueSent) {
    Serial.println("Sending initial value");
    send(msg.set(state?RELAY_ON:RELAY_OFF));
    Serial.println("Requesting initial value from controller");
    request(CHILD_ID, V_STATUS);
    wait(2000, C_SET, V_STATUS);
  }
  if (debouncer.update()) {
    if (debouncer.read()==LOW) {
      state = !state;
      // Send new state and request ack back
      send(msg.set(state?RELAY_ON:RELAY_OFF), true);
    }
  }
}

void receive(const MyMessage &message) {
  if (message.isAck()) {
     Serial.println("This is an ack from gateway");
  }

  if (message.type == V_STATUS) {
    if (!initialValueSent) {
      Serial.println("Receiving initial value from controller");
      initialValueSent = true;
    }
    // Change relay state
    state = (bool)message.getInt();
    digitalWrite(RELAY_PIN, state?RELAY_ON:RELAY_OFF);
    send(msg.set(state?RELAY_ON:RELAY_OFF));
  }
}
```

## SmartSleep

在使用 MySensors 2.0 至 2.1 时，从 MySensors 设备向 Home Assistant 发送心跳 `I_HEARTBEAT_RESPONSE` 会激活 Home Assistant 中的 SmartSleep 功能。这意味着消息会被缓冲，只有在收到设备心跳后才会发送到设备。状态更改会被保存，因此只会将最后一次请求的状态变更发送给设备。其他类型的消息则会进入 FIFO 队列。SmartSleep 非常适合等待命令的电池供电执行器。有关如何发送心跳以及让设备进入睡眠的信息，请参阅 MySensors library API。

在 MySensors 2.2 中，串口 API 不再使用 `I_HEARTBEAT_RESPONSE` 来表示 SmartSleep，而改用 `I_PRE_SLEEP_NOTIFICATION` 和 `I_POST_SLEEP_NOTIFICATION`。Home Assistant 已升级以支持这些新消息类型；如果你使用的是 MySensors 2.2.x 或更高版本，那么在收到 `I_PRE_SLEEP_NOTIFICATION` 类型的消息时就会启用 SmartSleep。如果 Home Assistant 配置为使用 MySensors 2.0 至 2.1，则会保留旧版 SmartSleep 行为。

## 消息验证

Home Assistant 与 MySensors 设备之间双向发送的消息，会根据 MySensors [serial API](https://www.mysensors.org/download/serial_api_20) 进行验证。如果消息未通过验证，它会被丢弃，并且不会继续在 Home Assistant 与设备之间传递。编写 Arduino sketch 时，请确保遵循你所用 MySensors 版本对应的 serial API。

日志会针对验证失败的消息发出警告；如果某个子设备类型所需的 child value 缺失，也会给出提示。例如，如果某个平台已收到某个必需值类型，但其他必需值类型缺失，Home Assistant 会以 warning 级别记录 child value 验证失败。

消息验证是在 Home Assistant 0.52 版本中引入的。

## 调试日志

如果你遇到消息被丢弃，或者设备未添加到 Home Assistant 的情况，请为 `mysensors` 集成和 `mysensors` 软件包启用调试日志。这将帮助你了解具体发生了什么。如果你要在 GitHub issue tracker 中反馈 `mysensors` 集成的问题，请务必使用这些日志设置来收集日志样本。

```yaml
logger:
  default: info
  logs:
    homeassistant.components.mysensors: debug
    mysensors: debug
```

更多信息请参阅 MySensors 的 [library API][MySensors library api]。

[MySensors library API]: https://www.mysensors.org/download

## 二进制传感器

支持以下二进制传感器类型：

### MySensors 1.4 及更高版本

| S_TYPE   | V_TYPE    |
| -------- | --------- |
| S_DOOR   | V_TRIPPED |
| S_MOTION | V_TRIPPED |
| S_SMOKE  | V_TRIPPED |

### MySensors 1.5 及更高版本

| S_TYPE       | V_TYPE    |
| ------------ | --------- |
| S_SPRINKLER  | V_TRIPPED |
| S_WATER_LEAK | V_TRIPPED |
| S_SOUND      | V_TRIPPED |
| S_VIBRATION  | V_TRIPPED |
| S_MOISTURE   | V_TRIPPED |

### 二进制传感器示例 sketch

```cpp
/**
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/binary
 */


#include <MySensor.h>
#include <SPI.h>
#include <Bounce2.h>

#define SN "BinarySensor"
#define SV "1.0"
#define CHILD_ID 1
#define BUTTON_PIN 3  // Arduino Digital I/O pin for button/reed switch.

MySensor gw;
Bounce debouncer = Bounce();
MyMessage msg(CHILD_ID, V_TRIPPED);

void setup()
{
  gw.begin();
  gw.sendSketchInfo(SN, SV);
  // Setup the button.
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  // After setting up the button, setup debouncer.
  debouncer.attach(BUTTON_PIN);
  debouncer.interval(5);
  gw.present(CHILD_ID, S_DOOR);
  gw.send(msg.set(0));
}

void loop()
{
  if (debouncer.update()) {
    // Get the update value.
    int value = debouncer.read();
    // Send in the new value.
    gw.send(msg.set(value == LOW ? 1 : 0));
  }
}
```

## 气候

支持以下执行器类型：

### MySensors 1.5 及更高版本

| S_TYPE | V_TYPE                                                                               |
| ------ | ------------------------------------------------------------------------------------ |
| S_HVAC | V_HVAC_FLOW_STATE*, V_HVAC_SETPOINT_HEAT, V_HVAC_SETPOINT_COOL, V_HVAC_SPEED, V_TEMP |

`V_HVAC_FLOW_STATE` 与 Home Assistant 中 Climate 集成的状态映射关系如下：

| Home Assistant State | MySensors State |
| -------------------- | --------------- |
| HVAC_MODE_COOL       | CoolOn          |
| HVAC_MODE_HEAT       | HeatOn          |
| HVAC_MODE_AUTO       | AutoChangeOver  |
| HVAC_MODE_OFF        | Off             |

目前尚不支持 humidity、away_mode、aux_heat 和 swing_mode。若可行，将在后续版本中加入。

在 Heat 模式下，使用 `V_HVAC_SETPOINT_HEAT` 设置目标温度；在 Cool 模式下，使用 `V_HVAC_SETPOINT_COOL`。如果处于 Auto Change Over 模式，则可以同时使用 `V_HVAC_SETPOINT_HEAT` 和 `V_HVAC_SETPOINT_COOL` 来设置设备温度范围的下限和上限。

你可以使用 `V_HVAC_SPEED` 来控制 HVAC 中风扇的速度设置。

你可以使用 `V_TEMP` 将节点当前温度发送到 Home Assistant。

### MySensors 2.x 的 Climate 示例 sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <MySensors.h> // sketch tested with version 2.3.2

#define SENSOR_NAME "Heatpump Sensor"
#define SENSOR_VERSION "2.3"

#define CHILD_ID_HVAC 0

#define IR_PIN  3  // Arduino pin tied to the IR led using Arduino PWM


// Uncomment your heatpump model
//#include <FujitsuHeatpumpIR.h>
//#include <PanasonicCKPHeatpumpIR.h>
//#include <PanasonicHeatpumpIR.h>
//#include <CarrierHeatpumpIR.h>
//#include <MideaHeatpumpIR.h>
//#include <MitsubishiHeatpumpIR.h>
//#include <SamsungHeatpumpIR.h> // sketch tested with version 1.0.15, see http://librarymanager#HeatpumpIR by Toni Arte
//#include <SharpHeatpumpIR.h>
//#include <DaikinHeatpumpIR.h>

//Some global variables to hold the numeric states sent to the airco unit
int POWER_STATE;
int TEMP_STATE;
int FAN_STATE;
int MODE_STATE;
int VDIR_STATE;
int HDIR_STATE;

//Some global variables to hold the text states sent to the home assistant controller
String FAN_STATE_TXT;  // possible values ("Min", "Normal", "Max", "Auto")
String MODE_STATE_TXT; // possible values ("Off", "HeatOn", "CoolOn", or "AutoChangeOver")


IRSenderPWM irSender(IR_PIN);

//Change to your own Heatpump
//HeatpumpIR *heatpumpIR = new SamsungAQV12MSANHeatpumpIR();
/*
new PanasonicDKEHeatpumpIR()
new PanasonicJKEHeatpumpIR()
new PanasonicNKEHeatpumpIR()
new CarrierHeatpumpIR()
new MideaHeatpumpIR()
new FujitsuHeatpumpIR()
new MitsubishiFDHeatpumpIR()
new MitsubishiFEHeatpumpIR()
new SamsungAQVHeatpumpIR()
new SamsungFJMHeatpumpIR()
// new SamsungHeatpumpIR() is a protected generic method, cannot be created directly
new SharpHeatpumpIR()
new DaikinHeatpumpIR()
*/

MyMessage msgHVACSetPointC(CHILD_ID_HVAC, V_HVAC_SETPOINT_COOL);
MyMessage msgHVACSpeed(CHILD_ID_HVAC, V_HVAC_SPEED);
MyMessage msgHVACFlowState(CHILD_ID_HVAC, V_HVAC_FLOW_STATE);

bool initialValueSent = false;

void presentation() {
  // Send the sketch version information to the gateway and Controller
  sendSketchInfo(SENSOR_NAME, SENSOR_VERSION);

  // Register all sensors to gw (they will be created as child devices) by their ID and S_TYPE
  present(CHILD_ID_HVAC, S_HVAC, "Thermostat");
}

void setup() {
}

void loop() {
  // put your main code here, to run repeatedly:
  if (!initialValueSent) {
    FAN_STATE_TXT = "Auto"; // default fan start state
    TEMP_STATE = 20; // default start temperature
    MODE_STATE_TXT = "Off"; // default mode state

    send(msgHVACSetPointC.set(TEMP_STATE));
    send(msgHVACSpeed.set(FAN_STATE_TXT.c_str()));
    send(msgHVACFlowState.set(MODE_STATE_TXT.c_str()));

    initialValueSent = true;
  }
}

void receive(const MyMessage &message) {
  if (message.isAck()) {
     Serial.println("This is an ack from gateway");
     return;
  }

  Serial.print("Incoming message for: ");
  Serial.print(message.sensor);

  String recvData = message.data;
  recvData.trim();

  Serial.print(", New status: ");
  Serial.println(recvData);
  switch (message.type) {
    case V_HVAC_SPEED:
      Serial.println("V_HVAC_SPEED");

      if(recvData.equalsIgnoreCase("auto")) FAN_STATE = 0;
      else if(recvData.equalsIgnoreCase("min")) FAN_STATE = 1;
      else if(recvData.equalsIgnoreCase("normal")) FAN_STATE = 2;
      else if(recvData.equalsIgnoreCase("max")) FAN_STATE = 3;
      FAN_STATE_TXT = recvData;
    break;

    case V_HVAC_SETPOINT_COOL:
      Serial.println("V_HVAC_SETPOINT_COOL");
      TEMP_STATE = message.getFloat();
      Serial.println(TEMP_STATE);
    break;

    case V_HVAC_FLOW_STATE:
      Serial.println("V_HVAC_FLOW_STATE");
      if (recvData.equalsIgnoreCase("coolon")) {
        POWER_STATE = 1;
        MODE_STATE = MODE_COOL;
      }
      else if (recvData.equalsIgnoreCase("heaton")) {
        POWER_STATE = 1;
        MODE_STATE = MODE_HEAT;
      }
      else if (recvData.equalsIgnoreCase("autochangeover")) {
        POWER_STATE = 1;
        MODE_STATE = MODE_AUTO;
      }
      else if (recvData.equalsIgnoreCase("off")){
        POWER_STATE = 0;
      }
      MODE_STATE_TXT = recvData;
      break;
  }
  sendHeatpumpCommand();
  sendNewStateToGateway();
}

void sendNewStateToGateway() {
  Serial.println("Status update send to HA:");
  Serial.println("*************************");
  Serial.println("Mode = " + MODE_STATE_TXT + "(" + (String)MODE_STATE + ")");
  Serial.println("Fan = " + FAN_STATE_TXT + "(" + (String)FAN_STATE + ")");
  Serial.println("Temp = " + (String)TEMP_STATE);
  send(msgHVACFlowState.set(MODE_STATE_TXT.c_str()));
  send(msgHVACSpeed.set(FAN_STATE_TXT.c_str()));
  send(msgHVACSetPointC.set(TEMP_STATE));
}

void sendHeatpumpCommand() {
  Serial.println("Heatpump commands send to airco:");
  Serial.println("********************************");
  Serial.println("Power = " + (String)POWER_STATE);
  Serial.println("Mode = " + (String)MODE_STATE);
  Serial.println("Fan = " + (String)FAN_STATE);
  Serial.println("Temp = " + (String)TEMP_STATE);

  heatpumpIR->send(irSender, POWER_STATE, MODE_STATE, FAN_STATE, TEMP_STATE, VDIR_AUTO, HDIR_AUTO);
}
```

## 窗帘

支持以下执行器类型：

### MySensors 1.4

| S_TYPE  | V_TYPE                                      |
| ------- | ------------------------------------------- |
| S_COVER | V_UP, V_DOWN, V_STOP, [V_DIMMER or V_LIGHT] |

### MySensors 1.5 及更高版本

| S_TYPE  | V_TYPE                                           |
| ------- | ------------------------------------------------ |
| S_COVER | V_UP, V_DOWN, V_STOP, [V_PERCENTAGE or V_STATUS] |

以上所有 `V_TYPE` 都是必需的。如果你知道窗帘的精确百分比位置，请使用 `V_PERCENTAGE`（或 `V_DIMMER`）；如果不知道，请使用 `V_STATUS`（或 `V_LIGHT`）。

### 窗帘示例 sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <MySensors.h>

#define SN "Cover"
#define SV "1.1"

// Actuators for moving the cover up and down respectively.
#define COVER_UP_ACTUATOR_PIN 2
#define COVER_DOWN_ACTUATOR_PIN 3
// Sensors for finding out when the cover has reached its up/down position.
// These could be simple buttons or linear hall sensors.
#define COVER_UP_SENSOR_PIN 4
#define COVER_DOWN_SENSOR_PIN 5

#define CHILD_ID 0

// Internal representation of the cover state.
enum State {
  IDLE,
  UP, // Window covering. Up.
  DOWN, // Window covering. Down.
};

static int state = IDLE;
static int status = 0; // 0=cover is down, 1=cover is up
static bool initial_state_sent = false;
MyMessage upMessage(CHILD_ID, V_UP);
MyMessage downMessage(CHILD_ID, V_DOWN);
MyMessage stopMessage(CHILD_ID, V_STOP);
MyMessage statusMessage(CHILD_ID, V_STATUS);

void sendState() {
  // Send current state and status to gateway.
  send(upMessage.set(state == UP));
  send(downMessage.set(state == DOWN));
  send(stopMessage.set(state == IDLE));
  send(statusMessage.set(status));
}

void setup() {
  pinMode(COVER_UP_SENSOR_PIN, INPUT);
  pinMode(COVER_DOWN_SENSOR_PIN, INPUT);
}

void presentation() {
  sendSketchInfo(SN, SV);

  present(CHILD_ID, S_COVER);
}

void loop() {
  if (!initial_state_sent) {
    sendState();
    initial_state_sent = true;
  }

  if (state == IDLE) {
    digitalWrite(COVER_UP_ACTUATOR_PIN, LOW);
    digitalWrite(COVER_DOWN_ACTUATOR_PIN, LOW);
  }

  if (state == UP && digitalRead(COVER_UP_SENSOR_PIN) == HIGH) {
    Serial.println("Cover is up.");
    // Update status and state; send it to the gateway.
    status = 1;
    state = IDLE;
    sendState();
    // Actuators will be disabled in next loop() iteration.
  }

  if (state == DOWN && digitalRead(COVER_DOWN_SENSOR_PIN) == HIGH) {
    Serial.println("Cover is down.");
    // Update status and state; send it to the gateway.
    status = 0;
    state = IDLE;
    sendState();
    // Actuators will be disabled in next loop() iteration.
  }
}

void receive(const MyMessage &message) {
  if (message.type == V_UP) {
    // Set state to covering up and send it back to the gateway.
    state = UP;
    sendState();
    Serial.println("Moving cover up.");

    // Activate actuator until the sensor returns HIGH in loop().
    digitalWrite(COVER_UP_ACTUATOR_PIN, HIGH);
  }

  if (message.type == V_DOWN) {
    // Set state to covering up and send it back to the gateway.
    state = DOWN;
    sendState();
    Serial.println("Moving cover down.");
    // Activate actuator until the sensor returns HIGH in loop().
    digitalWrite(COVER_DOWN_ACTUATOR_PIN, HIGH);
  }

  if (message.type == V_STOP) {
    // Set state to idle and send it back to the gateway.
    state = IDLE;
    sendState();
    Serial.println("Stopping cover.");

    // Actuators will be switched off in loop().
  }
}
```

#### 基于电机运行时间进行位置测量的窗帘 sketch 示例

此 sketch 非常适合星型拓扑布线。你可以使用一块 Arduino Mega 和一些继电器来控制最多 12 个窗帘。你只需为每个窗帘设置一行参数即可。不过，你也可以将它用于基于 Arduino Nano 甚至 ESP8266 的单个窗帘。

[在 GitHub 上查看代码。](https://github.com/gryzli133/RollerShutterSplit)

## 设备追踪器

支持以下传感器类型：

### MySensors 2.0 及更高版本

| S_TYPE | V_TYPE     |
| ------ | ---------- |
| S_GPS  | V_POSITION |

### MySensors 2.x 的设备追踪器示例 sketch

```cpp
/**
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/gps
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <MySensors.h>

#define SN "GPS Sensor"
#define SV "1.0"

// GPS position send interval (in milliseconds)
#define GPS_SEND_INTERVAL 30000
// The child id used for the gps sensor
#define CHILD_ID_GPS 1

MyMessage msg(CHILD_ID_GPS, V_POSITION);

// Last time GPS position was sent to controller
unsigned long lastGPSSent = -31000;

// Some buffers
char latBuf[11];
char lngBuf[11];
char altBuf[6];
char payload[30];

// Dummy values. Implementation of real GPS device is not done.
float gpsLocationLat = 40.741895;
float gpsLocationLng = -73.989308;
float gpsAltitudeMeters = 12.0;

void setup() {

}

void presentation() {
  sendSketchInfo(SN, SV);
  present(CHILD_ID_GPS, S_GPS);
}

void loop()
{
  unsigned long currentTime = millis();

  // Evaluate if it is time to send a new position
  bool timeToSend = currentTime - lastGPSSent > GPS_SEND_INTERVAL;

  if (timeToSend) {
    // Send current gps location
    // Build position and altitude string to send
    dtostrf(gpsLocationLat, 1, 6, latBuf);
    dtostrf(gpsLocationLng, 1, 6, lngBuf);
    dtostrf(gpsAltitudeMeters, 1, 0, altBuf);
    sprintf(payload, "%s,%s,%s", latBuf, lngBuf, altBuf);

    Serial.print(F("Position: "));
    Serial.println(payload);

    send(msg.set(payload));
    lastGPSSent = currentTime;
  }
}
```

## 灯光

支持以下执行器类型：

### MySensors 1.4

| S_TYPE   | V_TYPE                |
| -------- | --------------------- |
| S_DIMMER | V_DIMMER\*, V_LIGHT\* |

### MySensors 1.5 及更高版本

| S_TYPE       | V_TYPE                                                         |
| ------------ | -------------------------------------------------------------- |
| S_DIMMER     | [V_DIMMER\* or V_PERCENTAGE\*], [V_LIGHT\* or V_STATUS\*]      |
| S_RGB_LIGHT  | V_RGB*, [V_LIGHT\* or V_STATUS\*], [V_DIMMER or V_PERCENTAGE]  |
| S_RGBW_LIGHT | V_RGBW*, [V_LIGHT\* or V_STATUS\*], [V_DIMMER or V_PERCENTAGE] |

带星号（\*）的 `V_TYPE` 表示应在 sketch 启动时发送的值类型。对于 `S_DIMMER`，请同时发送 `V_DIMMER`/`V_PERCENTAGE` 和 `V_LIGHT`/`V_STATUS` 消息。对于 `S_RGB_LIGHT`，请同时发送 `V_RGB` 和 `V_LIGHT`/`V_STATUS` 消息，`V_DIMMER`/`V_PERCENTAGE` 消息为可选。对于 `S_RGBW_LIGHT` 和 `V_RGBW` 也是同样的原则。

Sketch 应使用相同类型来确认控制器发出的命令。如果命令导致设备切换为关闭状态（包括 `V_PERCENTAGE`、`V_RGB` 或 `V_RGBW` 为零的消息），则只应发送 `V_STATUS` 为零的消息。下面的示例 sketch 展示了具体做法。

#### MySensors 2.x 的灯光示例 sketch

```cpp
/*
 * Example Dimmable Light
 * Code adapted from https://github.com/mysensors/MySensors/tree/master/examples/DimmableLight
 *
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 */

// Enable debug prints
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <MySensors.h>

#define CHILD_ID_LIGHT 1

#define LIGHT_OFF 0
#define LIGHT_ON 1

#define SN "Dimmable Light"
#define SV "1.0"

int16_t last_state = LIGHT_ON;
int16_t last_dim = 100;

MyMessage light_msg( CHILD_ID_LIGHT, V_STATUS );
MyMessage dimmer_msg( CHILD_ID_LIGHT, V_PERCENTAGE );

void setup()
{
  update_light();
  Serial.println( "Node ready to receive messages..." );
}

void loop()
{
  //In MySensors2.x, first message must come from within loop()
  static bool first_message_sent = false;
  if ( first_message_sent == false ) {
    Serial.println( "Sending initial state..." );
    send_dimmer_message();
    send_status_message();
    first_message_sent = true;
  }
}

void presentation()
{
  // Send the sketch version information to the gateway
  sendSketchInfo( SN, SV );
  present( CHILD_ID_LIGHT, S_DIMMER );
}

void receive(const MyMessage &message)
{
  //When receiving a V_STATUS command, switch the light between OFF
  //and the last received dimmer value
  if ( message.type == V_STATUS ) {
    Serial.println( "V_STATUS command received..." );

    int lstate = message.getInt();
    if (( lstate < 0 ) || ( lstate > 1 )) {
      Serial.println( "V_STATUS data invalid (should be 0/1)" );
      return;
    }
    last_state = lstate;

    //If last dimmer state is zero, set dimmer to 100
    if (( last_state == LIGHT_ON ) && ( last_dim == 0 )) {
      last_dim=100;
    }

    // Update controller status
    send_status_message();

  } else if ( message.type == V_PERCENTAGE ) {
    Serial.println( "V_PERCENTAGE command received..." );
    int dim_value = constrain( message.getInt(), 0, 100 );
    if ( dim_value == 0 ) {
      last_state = LIGHT_OFF;

      // Update controller with dimmer value & status
      send_dimmer_message();
      send_status_message();
    } else {
      last_state = LIGHT_ON;
      last_dim = dim_value;

      // Update controller with dimmer value
      send_dimmer_message();
    }

  } else {
    Serial.println( "Invalid command received..." );
    return;
  }

  //Here you set the actual light state/level
  update_light();
}

void update_light()
{
  //For this example, just print the light status to console.
  if ( last_state == LIGHT_OFF ) {
    Serial.println( "Light state: OFF" );
  } else {
    Serial.print( "Light state: ON, Level: " );
    Serial.println( last_dim );
  }
}

void send_dimmer_message()
{
  send( dimmer_msg.set( last_dim ) );
}

void send_status_message()
{
  if ( last_state == LIGHT_OFF ) {
    send( light_msg.set( (int16_t)0) );
  } else {
    send( light_msg.set( (int16_t)1) );
  }
}
```

## 遥控器

支持以下类型组合：

### MySensors 1.4 及更高版本

| S_TYPE | V_TYPE             |
| ------ | ------------------ |
| S_IR   | V_IR_SEND, V_LIGHT |

### MySensors 1.5 及更高版本

| S_TYPE | V_TYPE              |
| ------ | ------------------- |
| S_IR   | V_IR_SEND, V_STATUS |

需要使用 `V_LIGHT` 或 `V_STATUS` 来报告遥控器的开/关状态。具体使用哪一个取决于库版本。

### 红外收发器示例 sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/ir
 */

#include <MySensor.h>
#include <SPI.h>
#include <IRLib.h>

#define SN "IR Sensor"
#define SV "1.0"
#define CHILD_ID 1

MySensor gw;

char code[10] = "abcd01234";
char oldCode[10] = "abcd01234";
MyMessage msgCodeRec(CHILD_ID, V_IR_RECEIVE);
MyMessage msgCode(CHILD_ID, V_IR_SEND);
MyMessage msgSendCode(CHILD_ID, V_LIGHT);

void setup()
{
  gw.begin(incomingMessage);
  gw.sendSketchInfo(SN, SV);
  gw.present(CHILD_ID, S_IR);
  // Send initial values.
  gw.send(msgCodeRec.set(code));
  gw.send(msgCode.set(code));
  gw.send(msgSendCode.set(0));
}

void loop()
{
  gw.process();
  // IR receiver not implemented, just a dummy report of code when it changes
  if (String(code) != String(oldCode)) {
    Serial.print("Code received ");
    Serial.println(code);
    gw.send(msgCodeRec.set(code));
    strcpy(oldCode, code);
  }
}

void incomingMessage(const MyMessage &message) {
  if (message.type==V_LIGHT) {
    // IR sender not implemented, just a dummy print.
    if (message.getBool()) {
      Serial.print("Sending code ");
      Serial.println(code);
    }
    gw.send(msgSendCode.set(message.getBool() ? 1 : 0));
    // Always turn off device
    gw.wait(100);
    gw.send(msgSendCode.set(0));
  }
  if (message.type == V_IR_SEND) {
    // Retrieve the IR code value from the incoming message.
    String codestring = message.getString();
    codestring.toCharArray(code, sizeof(code));
    Serial.print("Changing code to ");
    Serial.println(code);
    gw.send(msgCode.set(code));
  }
}
```

## 传感器

支持以下传感器类型：

### MySensors 1.4 及更高版本

| S_TYPE             | V_TYPE                                 |
| ------------------ | -------------------------------------- |
| S_TEMP             | V_TEMP                                 |
| S_HUM              | V_HUM                                  |
| S_BARO             | V_PRESSURE, V_FORECAST                 |
| S_WIND             | V_WIND, V_GUST, V_DIRECTION            |
| S_RAIN             | V_RAIN, V_RAINRATE                     |
| S_UV               | V_UV                                   |
| S_WEIGHT           | V_WEIGHT, V_IMPEDANCE                  |
| S_POWER            | V_WATT, V_KWH                          |
| S_DISTANCE         | V_DISTANCE                             |
| S_LIGHT_LEVEL      | V_LIGHT_LEVEL                          |
| S_IR               | V_IR_RECEIVE                           |
| S_WATER            | V_FLOW, V_VOLUME                       |
| S_AIR_QUALITY      | V_DUST_LEVEL                           |
| S_CUSTOM           | V_VAR1, V_VAR2, V_VAR3, V_VAR4, V_VAR5 |
| S_DUST             | V_DUST_LEVEL                           |
| S_SCENE_CONTROLLER | V_SCENE_ON, V_SCENE_OFF                |

#### MySensors 1.5 及更高版本

| S_TYPE         | V_TYPE                            |
| -------------- | --------------------------------- |
| S_COLOR_SENSOR | V_RGB                             |
| S_MULTIMETER   | V_VOLTAGE, V_CURRENT, V_IMPEDANCE |
| S_SOUND        | V_LEVEL                           |
| S_VIBRATION    | V_LEVEL                           |
| S_MOISTURE     | V_LEVEL                           |
| S_LIGHT_LEVEL  | V_LEVEL                           |
| S_AIR_QUALITY  | V_LEVEL (replaces V_DUST_LEVEL)   |
| S_DUST         | V_LEVEL (replaces V_DUST_LEVEL)   |

### MySensors 2.0 及更高版本

| S_TYPE          | V_TYPE                    |
| --------------- | ------------------------- |
| S_INFO          | V_TEXT                    |
| S_GAS           | V_FLOW, V_VOLUME          |
| S_GPS           | V_POSITION                |
| S_IR            | V_IR_RECORD               |
| S_WATER_QUALITY | V_TEMP, V_PH, V_ORP, V_EC |

### 自定义计量单位

某些传感器值类型并不专属于特定的传感器类型，因此它们在 Home Assistant 中没有默认计量单位。例如，`V_LEVEL` 可用于多种传感器类型，如粉尘、声音、震动等。

通过使用 `V_UNIT_PREFIX`，你可以为任意传感器设置自定义单位。对于已定义的传感器，发送给 `V_UNIT_PREFIX` 的字符串值会优先于其他计量单位。`V_UNIT_PREFIX` 不能单独作为传感器值类型使用，你仍需发送上表中支持的值类型和值。`V_UNIT_PREFIX` 可用于 MySensors 1.5 及更高版本。

### MySensors 2.x 的传感器示例 sketch

```cpp
/**
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/light
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <BH1750.h>
#include <Wire.h>
#include <MySensors.h>

#define SN "LightLuxSensor"
#define SV "1.0"
#define CHILD_ID 1
unsigned long SLEEP_TIME = 30000; // Sleep time between reads (in milliseconds)

BH1750 lightSensor;
MyMessage msg(CHILD_ID, V_LEVEL);
MyMessage msgPrefix(CHILD_ID, V_UNIT_PREFIX);  // Custom unit message.
uint16_t lastlux = 0;
bool initialValueSent = false;

void setup()
{
  sendSketchInfo(SN, SV);
  present(CHILD_ID, S_LIGHT_LEVEL);
  lightSensor.begin();
}

void loop()
{
  if (!initialValueSent) {
    Serial.println("Sending initial value");
    send(msgPrefix.set("custom_lux"));  // Set custom unit.
    send(msg.set(lastlux));
    Serial.println("Requesting initial value from controller");
    request(CHILD_ID, V_LEVEL);
    wait(2000, C_SET, V_LEVEL);
  }
  uint16_t lux = lightSensor.readLightLevel();  // Get Lux value
  if (lux != lastlux) {
      send(msg.set(lux));
      lastlux = lux;
  }

  sleep(SLEEP_TIME);
}

void receive(const MyMessage &message) {
  if (message.type == V_LEVEL) {
    if (!initialValueSent) {
      Serial.println("Receiving initial value from controller");
      initialValueSent = true;
    }
  }
}
```

## 开关

支持以下执行器类型：

### MySensors 1.4 及更高版本

| S_TYPE   | V_TYPE        |
| -------- | ------------- |
| S_DOOR   | V_ARMED       |
| S_MOTION | V_ARMED       |
| S_SMOKE  | V_ARMED       |
| S_LIGHT  | V_LIGHT       |
| S_LOCK   | V_LOCK_STATUS |

### MySensors 1.5 及更高版本

| S_TYPE       | V_TYPE                |
| ------------ | --------------------- |
| S_LIGHT      | V_STATUS              |
| S_BINARY     | [V_STATUS or V_LIGHT] |
| S_SPRINKLER  | V_STATUS              |
| S_WATER_LEAK | V_ARMED               |
| S_SOUND      | V_ARMED               |
| S_VIBRATION  | V_ARMED               |
| S_MOISTURE   | V_ARMED               |

### MySensors 2.0 及更高版本

| S_TYPE          | V_TYPE   |
| --------------- | -------- |
| S_WATER_QUALITY | V_STATUS |

要在对应平台上激活上述 `S_TYPE` 的执行器，必须提供每个 `S_TYPE` 所要求的全部 `V_TYPE`。在需要该值类型的情况下，请根据库版本使用 `V_LIGHT` 或 `V_STATUS`。

### 开关示例 sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 *
 * https://www.mysensors.org/build/relay
 */

#include <MySensor.h>
#include <SPI.h>

#define SN "Relay"
#define SV "1.0"
#define CHILD_ID 1
#define RELAY_PIN 3

MySensor gw;
MyMessage msgRelay(CHILD_ID, V_STATUS);

void setup()
{
  gw.begin(incomingMessage);
  gw.sendSketchInfo(SN, SV);
  // Initialize the digital pin as an output.
  pinMode(RELAY_PIN, OUTPUT);
  gw.present(CHILD_ID, S_BINARY);
  gw.send(msgRelay.set(0));
}

void loop()
{
  gw.process();
}

void incomingMessage(const MyMessage &message)
{
  if (message.type == V_STATUS) {
     // Change relay state.
     digitalWrite(RELAY_PIN, message.getBool() ? 1 : 0);
     gw.send(msgRelay.set(message.getBool() ? 1 : 0));
  }
}
```

## 文本

支持以下传感器类型：

### MySensors 2.0 及更高版本

| S_TYPE | V_TYPE |
| ------ | ------ |
| S_INFO | V_TEXT |

### 文本示例 sketch

```cpp
/*
 * Documentation: https://www.mysensors.org
 * Support Forum: https://forum.mysensors.org
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <MySensors.h>
#include <SPI.h>

#define SN "TextSensor"
#define SV "1.0"
#define CHILD_ID 1

MyMessage textMsg(CHILD_ID, V_TEXT);
bool initialValueSent = false;

void setup(void) {
}

void presentation() {
  sendSketchInfo(SN, SV);
  present(CHILD_ID, S_INFO, "TextSensor1");
}

void loop() {
  if (!initialValueSent) {
    Serial.println("Sending initial value");
    // Send initial values.
    send(textMsg.set("-"));
    Serial.println("Requesting initial value from controller");
    request(CHILD_ID, V_TEXT);
    wait(2000, C_SET, V_TEXT);
  }
}

void receive(const MyMessage &message) {
  if (message.type == V_TEXT) {
    if (!initialValueSent) {
      Serial.println("Receiving initial value from controller");
      initialValueSent = true;
    }
    // Dummy print
    Serial.print("Message: ");
    Serial.print(message.sensor);
    Serial.print(", Message: ");
    Serial.println(message.getString());
    // Send message to controller
    send(textMsg.set(message.getString()));
  }
}
```
