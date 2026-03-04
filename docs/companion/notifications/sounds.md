---
title: "声音"
id: "notification-sounds"
---

为通知添加自定义声音可以让您轻松识别通知，甚至无需查看设备。如何设置自定义声音取决于操作系统。

 - <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 在 Android 上，通知声音与[通知渠道/类别](basic.md#notification-channels)相关联。在您的设备上，编辑渠道设置以将通知声音更改为其他系统声音或选择您自己的声音。
 - <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> iOS 版 Home Assistant 预装了一些通知声音，但您也可以上传自己的声音。

:::info
下面的信息描述了在 iOS 上使用自定义通知声音。对于 Android，请转到[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 通知渠道以更改声音，并参考您的设备设置。
:::

以下是使用预装声音之一的通知示例。

```yaml
automation:
- alias: "通知移动应用声音"
  trigger:
    ...
  action:
    - action: notify.mobile_app_<your_device_id_here>
      data:
        message: "您的室友到了"
        data:
          push:
            sound: "US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav"
```

> 您必须在负载中使用完整的文件名（包括扩展名）。

## 自定义推送通知声音

iOS 应用允许您在推送通知中使用自己的自定义声音。声音必须格式化为 32位浮点 48000Hz wav 文件。确保您知道声音的文件名，因为您需要在通知负载的 `sound` 字段中引用它。要添加声音，请按照以下两种方法之一操作：

> *   您可能需要在播放通知声音之前重启整个设备。
> *   上传与现有文件同名的文件将覆盖原始文件。

### 通过 iTunes

1.  将设备连接到运行最新版本 iTunes 的 PC 或 Mac。
2.  在 iTunes 中转到设备。
3.  在左侧菜单中选择"文件共享"。
4.  选择 Home Assistant。
5.  拖放正确格式的声音（32位浮点 48000Hz wav 文件）。
6.  点击右下角的同步。
7.  同步完成后，将设备与计算机断开连接。
8.  在您的 iOS 设备上，打开 Home Assistant 应用。
9.  转到[配置](https://my.home-assistant.io/redirect/config/) -> 伴侣应用 -> 通知 -> 声音。
10. 点击"从 iTunes 文件共享导入声音"按钮。

假设您正确格式化了声音，它们现在可以在推送通知中使用了。

### 通过云存储：

此方法需要您有一个云存储应用（如 [Dropbox](https://www.dropbox.com)、[Google Drive](https://www.google.com/drive/)、[iCloud](https://www.icloud.com/)、[OneDrive](https://www.microsoft.com/microsoft-365/onedrive/online-cloud-storage) 等）。

1.  如果您还没有云存储的 iOS 应用，请在 App Store 中找到适当的应用，安装并登录。
2.  将您想要的通知声音上传到云存储中的方便位置。
3.  在 Home Assistant 伴侣应用中，从侧边栏打开[配置](https://my.home-assistant.io/redirect/config/)菜单，转到伴侣应用部分。
4.  在设置下，点击通知，然后点击声音。
5.  点击"导入自定义声音"。
6.  导航到包含您想要添加的声音的文件夹。注意，您可以使用左上角的位置按钮在云提供商之间切换。
7.  点击选择，然后点击您想要添加的文件。选择完所有想要的文件后，点击完成。
8.  重启您的设备。

## 从 iOS 导入声音

除了三全音（默认短信音，可以通过 `sound: default` 访问）之外，iOS 系统声音不会导入到 Home Assistant 伴侣应用中。但可以通过以下步骤导入它们：

1.  在 Home Assistant 伴侣应用中，从 Home Assistant [配置菜单](https://my.home-assistant.io/redirect/config/)打开伴侣应用页面。
2.  在设置下，点击通知，然后点击声音。
3.  点击"系统"标签，然后点击"导入系统声音"。
4.  几秒钟后，您应该会收到文件已成功导入的通知。
5.  重启您的设备。
6.  现在 iOS 声音可以使用了。

<details>
<summary>点击这里查看从 iOS 导入的声音完整列表。</summary>

此列表代表 iOS 12，实际导入的声音列表可能因您的设备配置和 iOS 版本而异。

```text
3rdParty_DirectionDown_Haptic.caf
3rdParty_DirectionUp_Haptic.caf
3rdParty_Failure_Haptic.caf
3rdParty_Retry_Haptic.caf
3rdParty_Start_Haptic.caf
3rdParty_Stop_Haptic.caf
3rdParty_Success_Haptic.caf
access_scan_complete.caf
AccessSanComplete_Haptic
acknowledgment_received.caf
acknowledgment_sent.caf
alarm.caf
Alarm_Haptic.caf
Alarm_Nightstand_Haptic.caf
Alert_3rdParty_Haptic.caf
Alert_3rdParty_Salient_Haptic.caf
Alert_ActivityFriendsGoalAttained_Haptic.caf
Alert_ActivityGoalAttained_Haptic.caf
Alert_ActivityGoalAttained_Salient_Haptic.caf
Alert_ActivityGoalBehind_Haptic.caf
Alert_ActivityGoalBehind_Salient_Haptic.caf
Alert_ActivityGoalClose_Haptic.caf
Alert_BatteryLow_10p_Haptic.caf
Alert_BatteryLow_5p_Haptic.caf
Alert_BatteryLow_5p_Salient_Haptic.caf
Alert_Calendar_Haptic.caf
Alert_Calendar_Salient_Haptic.caf
Alert_Health_Haptic.caf
Alert_Mail_Haptic.caf
Alert_Mail_Salient_Haptic.caf
Alert_MapsDirectionsInApp_Haptic.caf
Alert_Messages_1_Haptic.caf
Alert_Messages_1_Salient_Haptic.caf
Alert_Messages_2_Haptic.caf
Alert_Messages_3_Haptic.caf
Alert_PassbookBalance_Haptic.caf
Alert_PassbookGeofence_Haptic.caf
Alert_PassbookGeofence_Salient_Haptic.caf
Alert_PhotostreamActivity_Haptic.caf
Alert_ReminderDue_Haptic.caf
Alert_ReminderDue_Salient_Haptic.caf
Alert_SpartanConnected_LowLatency_Haptic.caf
Alert_SpartanConnecting_Haptic.caf
Alert_SpartanConnecting_LowLatency_Haptic.caf
Alert_SpartanDisconnected_LowLatency_Haptic.caf
Alert_Voicemail_Haptic.caf
Alert_Voicemail_Salient_Haptic.caf
Alert_WalkieTalkie_Haptic.caf
Anticipate.caf
AutoUnlock_Haptic.caf
BatteryMagsafe_Haptic.caf
Beat_Haptic.caf
begin_record.caf
Bloom.caf
BuddyMigrationStart_Haptic.caf
BuddyPairingFailure_Haptic.caf
BuddyPairingRemoteConnection_Haptic.caf
BuddyPairingRemoteTap_Haptic.caf
BuddyPairingSuccess_Haptic.caf
busy_tone_ansi.caf
busy_tone_cept.caf
call_waiting_tone_ansi.caf
call_waiting_tone_cept.caf
Calypso.caf
camera_shutter_burst.caf
camera_shutter_burst_begin.caf
camera_shutter_burst_end.caf
camera_timer_countdown.caf
camera_timer_final_second.caf
CameraCountdownImminent_Haptic.caf
CameraCountdownTick_Haptic.caf
CameraShutter_Haptic.caf
Choo_Choo.caf
connect_power.caf
ct-busy.caf
ct-call-waiting.caf
ct-congestion.caf
ct-error.caf
ct-keytone2.caf
ct-path-ack.caf
Descent.caf
Detent_Haptic.caf
DoNotDisturb_Haptic.caf
dtmf-0.caf
dtmf-1.caf
dtmf-2.caf
dtmf-3.caf
dtmf-4.caf
dtmf-5.caf
dtmf-6.caf
dtmf-7.caf
dtmf-8.caf
dtmf-9.caf
dtmf-pound.caf
dtmf-star.caf
end_call_tone_cept.caf
end_record.caf
engage_power.caf
engage_power_short.caf
ET_BeginNotification_Haptic.caf
ET_BeginNotification_Salient_Haptic.caf
ET_RemoteTap_Receive_Haptic.caf
ET_RemoteTap_Send_Haptic.caf
Fanfare.caf
focus_change_app_icon.caf
focus_change_keyboard.caf
focus_change_large.caf
focus_change_small.caf
go_to_sleep_alert.caf
GoToSleep_Haptic.caf
HealthNotificaiton.caf
HourlyChime_Haptic.caf
HummingbirdCompletion_Haptic.caf
HummingbirdNotification_Haptic.caf
jbl_ambiguous.caf
jbl_begin.caf
jbl_cancel.caf
jbl_confirm.caf
jbl_no_match.caf
key_press_click.caf
key_press_delete.caf
key_press_modifier.caf
keyboard_press_clear.caf
keyboard_press_delete.caf
keyboard_press_normal.caf
Ladder.caf
lock.caf
long_low_short_high.caf
low_power.caf
mail-sent.caf
MessagesIncoming_Haptic.caf
MessagesOutgoing_Haptic.caf
middle_9_short_double_low.caf
Minuet.caf
multiway_invitation.caf
MultiwayInvitation.caf
MultiwayJoin.caf
MultiwayLeave.caf
navigation_pop.caf
navigation_push.caf
NavigationGenericManeuver_Haptic.caf
NavigationGenericManeuver_Salient_Haptic.caf
NavigationLeftTurn_Haptic.caf
NavigationLeftTurn_Salient_Haptic.caf
NavigationRightTurn_Haptic.caf
NavigationRightTurn_Salient_Haptic.caf
new-mail.caf
News_Flash.caf
nfc_scan_complete.caf
Noir.caf
Notification_Haptic.caf
Notification_Salient_Haptic.caf
OnOffPasscodeFailure_Haptic.caf
OnOffPasscodeUnlock_Haptic.caf
OnOffPasscodeUnlockCampanion_Haptic.caf
OrbExit_Haptic.caf
OrbLayers_Haptic.caf
payment_failure.caf
payment_success.caf
PhoneAnswer_Haptic.caf
PhoneHangUp_Haptic.caf
PhoneHold_Haptic.caf
photoShutter.caf
PhotosZoomDetent_Haptic.caf
Preview_AudioAndHaptic.caf
QB_Dictation_Haptic.caf
QB_Dictation_Off_Haptic.caf
ReceivedMessage.caf
RemoteCameraShutterBurstBegin_Haptic.caf
RemoteCameraShutterBurstEnd_Haptic.caf
ringback_tone_ansi.caf
ringback_tone_aus.caf
ringback_tone_cept.caf
ringback_tone_hk.caf
ringback_tone_uk.caf
RingerChanged.caf
Ringtone_2_Ducked_Haptic-sashimi.caf
Ringtone_2_Haptic-sashimi.caf
Ringtone_UK_Haptic.caf
Ringtone_US_Haptic.caf
RingtoneDucked_UK_Haptic.caf
RingtoneDucked_US_Haptic.caf
SalientNotification_Haptic.caf
SedentaryTimer_Haptic.caf
SedentaryTimer_Salient_Haptic.caf
SentMessage.caf
shake.caf
Sherwood_Forest.caf
short_double_high.caf
short_double_low.caf
short_low_high.caf
SIMToolkitCallDropped.caf
SIMToolkitGeneralBeep.caf
SIMToolkitNegativeACK.caf
SIMToolkitPositiveACK.caf
SIMToolkitSMS.caf
SiriAutoSend_Haptic.caf
SiriStart_Haptic.caf
SiriStopFailure_Haptic.caf
SiriStopSuccess_Haptic.caf
sms-received1.caf
sms-received1.caf
sms-received2.caf
sms-received3.caf
sms-received4.caf
sms-received5.caf
sms-received6.caf
SOSEmergencyContactTextPrompt_Haptic.caf
SOSFallDetection_Haptic-Newton.caf
Spell.caf
Stockholm_Haptic.caf
StockholmActive_Haptic.caf
StockholmActiveSingleCycle_Haptic.caf
StockholmFailure_Haptic.caf
StopwatchLap_Haptic.caf
StopwatchReset_Haptic.caf
StopwatchStart_Haptic.caf
StopwatchStop_Haptic.caf
Suspense.caf
Swish.caf
SwTest1_Haptic.caf
SystemStartup_Haptic.caf
Telegraph.caf
Timer_Haptic.caf
TimerCancel_Haptic.caf
TimerPause_Haptic.caf
TimerStart_Haptic.caf
TimerWheelHoursDetent_Haptic.caf
TimerWheelMinutesDetent_Haptic.caf
Tink.caf
Tiptoes.caf
Tock.caf
tweet_sent.caf
Typewriters.caf
UISwipe_Haptic.caf
UISwitch_Off_Haptic.caf
UISwitch_On_Haptic.caf
Update.caf
ussd.caf
vc~ended.caf
vc~invitation-accepted.caf
vc~ringing.caf
vc~ringing_watch.caf
VoiceOver_Click_Haptic.caf
WalkieTalkieActiveEnd_Haptic.caf
WalkieTalkieActiveStart_Haptic.caf
WalkieTalkieReceiveEnd_Haptic.caf
WalkieTalkieReceiveStart_Haptic.caf
warsaw.caf
Warsaw_Haptic.caf
wheels_of_time.caf
WorkoutComplete_Haptic.caf
WorkoutCompleteAutoDetect.caf
WorkoutCountdown_Haptic.caf
WorkoutPaceAbove.caf
WorkoutPaceBelow.caf
WorkoutPaused_Haptic.caf
WorkoutPressStart_Haptic.caf
WorkoutResumed_Haptic.caf
WorkoutResumedAutoDetect.caf
WorkoutSaved_Haptic.caf
WorkoutSelect_Haptic.caf
WorkoutStartAutoDetect.caf
```
</details>

## 预装通知声音

<details>
<summary>点击这里查看应用附带的声音完整列表。</summary>

```text
US-EN-Alexa-Back-Door-Opened.wav
US-EN-Alexa-Back-Door-Unlocked.wav
US-EN-Alexa-Basement-Door-Opened.wav
US-EN-Alexa-Basement-Door-Unlocked.wav
US-EN-Alexa-Boyfriend-Is-Arriving.wav
US-EN-Alexa-Daughter-Is-Arriving.wav
US-EN-Alexa-Front-Door-Opened.wav
US-EN-Alexa-Front-Door-Unlocked.wav
US-EN-Alexa-Garage-Door-Opened.wav
US-EN-Alexa-Girlfriend-Is-Arriving.wav
US-EN-Alexa-Good-Morning.wav
US-EN-Alexa-Good-Night.wav
US-EN-Alexa-Husband-Is-Arriving.wav
US-EN-Alexa-Mail-Has-Arrived.wav
US-EN-Alexa-Motion-At-Back-Door.wav
US-EN-Alexa-Motion-At-Front-Door.wav
US-EN-Alexa-Motion-Detected-Generic.wav
US-EN-Alexa-Motion-In-Back-Yard.wav
US-EN-Alexa-Motion-In-Basement.wav
US-EN-Alexa-Motion-In-Front-Yard.wav
US-EN-Alexa-Motion-In-Garage.wav
US-EN-Alexa-Patio-Door-Opened.wav
US-EN-Alexa-Patio-Door-Unlocked.wav
US-EN-Alexa-Smoke-Detected-Generic.wav
US-EN-Alexa-Smoke-Detected-In-Basement.wav
US-EN-Alexa-Smoke-Detected-In-Garage.wav
US-EN-Alexa-Smoke-Detected-In-Kitchen.wav
US-EN-Alexa-Son-Is-Arriving.wav
US-EN-Alexa-Water-Detected-Generic.wav
US-EN-Alexa-Water-Detected-In-Basement.wav
US-EN-Alexa-Water-Detected-In-Garage.wav
US-EN-Alexa-Water-Detected-In-Kitchen.wav
US-EN-Alexa-Welcome-Home.wav
US-EN-Alexa-Wife-Is-Arriving.wav
US-EN-Daisy-Back-Door-Motion.wav
US-EN-Daisy-Back-Door-Open.wav
US-EN-Daisy-Front-Door-Motion.wav
US-EN-Daisy-Front-Door-Open.wav
US-EN-Daisy-Front-Window-Open.wav
US-EN-Daisy-Garage-Door-Open.wav
US-EN-Daisy-Guest-Bath-Leak.wav
US-EN-Daisy-Kitchen-Sink-Leak.wav
US-EN-Daisy-Kitchen-Window-Open.wav
US-EN-Daisy-Laundry-Room-Leak.wav
US-EN-Daisy-Master-Bath-Leak.wav
US-EN-Daisy-Master-Bedroom-Window-Open.wav
US-EN-Daisy-Office-Window-Open.wav
US-EN-Daisy-Refrigerator-Leak.wav
US-EN-Daisy-Water-Heater-Leak.wav
US-EN-Morgan-Freeman-Back-Door-Closed.wav
US-EN-Morgan-Freeman-Back-Door-Locked.wav
US-EN-Morgan-Freeman-Back-Door-Opened.wav
US-EN-Morgan-Freeman-Back-Door-Unlocked.wav
US-EN-Morgan-Freeman-Basement-Door-Closed.wav
US-EN-Morgan-Freeman-Basement-Door-Locked.wav
US-EN-Morgan-Freeman-Basement-Door-Opened.wav
US-EN-Morgan-Freeman-Basement-Door-Unlocked.wav
US-EN-Morgan-Freeman-Boss-Is-Arriving.wav
US-EN-Morgan-Freeman-Boyfriend-Is-Arriving.wav
US-EN-Morgan-Freeman-Cleaning-Supplies-Closet-Opened.wav
US-EN-Morgan-Freeman-Coworker-Is-Arriving.wav
US-EN-Morgan-Freeman-Daughter-Is-Arriving.wav
US-EN-Morgan-Freeman-Friend-Is-Arriving.wav
US-EN-Morgan-Freeman-Front-Door-Closed.wav
US-EN-Morgan-Freeman-Front-Door-Locked.wav
US-EN-Morgan-Freeman-Front-Door-Opened.wav
US-EN-Morgan-Freeman-Front-Door-Unlocked.wav
US-EN-Morgan-Freeman-Garage-Door-Closed.wav
US-EN-Morgan-Freeman-Garage-Door-Opened.wav
US-EN-Morgan-Freeman-Girlfriend-Is-Arriving.wav
US-EN-Morgan-Freeman-Good-Morning.wav
US-EN-Morgan-Freeman-Good-Night.wav
US-EN-Morgan-Freeman-Liquor-Cabinet-Opened.wav
US-EN-Morgan-Freeman-Motion-Detected.wav
US-EN-Morgan-Freeman-Motion-In-Basement.wav
US-EN-Morgan-Freeman-Motion-In-Bedroom.wav
US-EN-Morgan-Freeman-Motion-In-Game-Room.wav
US-EN-Morgan-Freeman-Motion-In-Garage.wav
US-EN-Morgan-Freeman-Motion-In-Kitchen.wav
US-EN-Morgan-Freeman-Motion-In-Living-Room.wav
US-EN-Morgan-Freeman-Motion-In-Theater.wav
US-EN-Morgan-Freeman-Motion-In-Wine-Cellar.wav
US-EN-Morgan-Freeman-Patio-Door-Closed.wav
US-EN-Morgan-Freeman-Patio-Door-Locked.wav
US-EN-Morgan-Freeman-Patio-Door-Opened.wav
US-EN-Morgan-Freeman-Patio-Door-Unlocked.wav
US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav
US-EN-Morgan-Freeman-Searching-For-Car-Keys.wav
US-EN-Morgan-Freeman-Setting-The-Mood.wav
US-EN-Morgan-Freeman-Smartthings-Detected-A-Flood.wav
US-EN-Morgan-Freeman-Smartthings-Detected-Carbon-Monoxide.wav
US-EN-Morgan-Freeman-Smartthings-Detected-Smoke.wav
US-EN-Morgan-Freeman-Smoke-Detected-In-Basement.wav
US-EN-Morgan-Freeman-Smoke-Detected-In-Garage.wav
US-EN-Morgan-Freeman-Smoke-Detected-In-Kitchen.wav
US-EN-Morgan-Freeman-Someone-Is-Arriving.wav
US-EN-Morgan-Freeman-Son-Is-Arriving.wav
US-EN-Morgan-Freeman-Starting-Movie-Mode.wav
US-EN-Morgan-Freeman-Starting-Party-Mode.wav
US-EN-Morgan-Freeman-Starting-Romance-Mode.wav
US-EN-Morgan-Freeman-Turning-Off-All-The-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Air-Conditioner.wav
US-EN-Morgan-Freeman-Turning-Off-The-Bar-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Chandelier.wav
US-EN-Morgan-Freeman-Turning-Off-The-Family-Room-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Hallway-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Kitchen-Light.wav
US-EN-Morgan-Freeman-Turning-Off-The-Light.wav
US-EN-Morgan-Freeman-Turning-Off-The-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Mood-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-TV.wav
US-EN-Morgan-Freeman-Turning-On-The-Air-Conditioner.wav
US-EN-Morgan-Freeman-Turning-On-The-Bar-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Chandelier.wav
US-EN-Morgan-Freeman-Turning-On-The-Family-Room-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Hallway-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Kitchen-Light.wav
US-EN-Morgan-Freeman-Turning-On-The-Light.wav
US-EN-Morgan-Freeman-Turning-On-The-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Mood-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-TV.wav
US-EN-Morgan-Freeman-Vacate-The-Premises.wav
US-EN-Morgan-Freeman-Water-Detected-In-Basement.wav
US-EN-Morgan-Freeman-Water-Detected-In-Garage.wav
US-EN-Morgan-Freeman-Water-Detected-In-Kitchen.wav
US-EN-Morgan-Freeman-Welcome-Home.wav
US-EN-Morgan-Freeman-Wife-Is-Arriving.wav
```
</details>