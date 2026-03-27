---
title: Yale Access Bluetooth
description: 'Integrates Yale Access(https://www.yalehome.com/us/en/products/smart-technology/yale-access) Bluetooth devices into Home Assistant. 本页属于 Home Assistant。'
ha_category:
  - Binary sensor
  - Lock
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
ha_domain: yalexs_ble
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - lock
  - sensor
ha_integration_type: device
---
# Yale Access Bluetooth

Integrates [Yale Access](https://www.yalehome.com/us/en/products/smart-technology/yale-access) Bluetooth devices into Home Assistant.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

The **Yale Access Bluetooth** integration will automatically discover devices once the [Bluetooth](/home-assistant/integrations/bluetooth) integration is enabled and functional.

Devices must have a Yale Access module installed to function with this integration if one is not already built-in.

## Supported devices

- YRD216 (Yale Assure Lock Keypad with Physical Key)
- YRL216 (Yale Assure Door Lever Lock with Push Button Keypad)
- YRD226 (Yale Assure Lock Touchscreen Deadbolt with Physical Key)
- YRL226 (Yale Assure Door Lever Lock Keypad)
- YRD256 (Yale Assure Lock Keypad)
- YRD420 (Yale Assure Lock 2)
- YRD450 (Yale Assure Lock 2 Key Free)
- YUR/SSDL/1/SIL and MBK (Yale Unity Screen Door Lock - Australia)
- YUR/DEL/1/SIL and MBK (Yale Unity Entrance Lock - Australia)
- IES-D210W-G0 (Yale Smart Safe)
- YRSM-1 (Yale Smart Safe)
- ASL-05 (August WiFi Smart Lock - Gen 4)
- ASL-03 (August Smart Lock Pro - Gen 3)
- ASL-02 (August Smart Lock Pro - Gen 2)

## Limited support devices

These devices do not send updates, but can be locked and unlocked.

- MD-04I (Yale Conexis L1 (requires yale access module), Yale Conexis L2)
- YRCB-490 (Yale Smart Cabinet Lock)

## Deadlock support

Some Yale locks support a deadlock function (secure mode) for locking both the inside and outside. A secure mode lock entity (initially disabled) is exposed for all locks and can be enabled where the lock is known to support this capability.

## Troubleshooting

Lock operation requires setting up an encrypted connection highly sensitive to latency. It is recommended to use a [High-Performance Bluetooth adapter](/home-assistant/integrations/bluetooth/#known-working-high-performance-adapters) or [ESPHome Bluetooth proxy](/home-assistant/integrations/bluetooth/#remote-adapters-bluetooth-proxies) for stable operation.

## Push updates

Some locks only send push updates when they have an active HomeKit pairing. If your lock is not sending push updates, ensure it's paired with a HomeKit using an iOS device or the HomeKit controller integration. The lock cannot be paired via HomeKit Controller and the Yale Access Bluetooth integration on the same Home Assistant instance as they will both try to access the lock simultaneously and fail.

One easy way to fix this is to create a new/second home in the Apple Home app and add the lock to that new home. Push updates should occur as intended after the lock is added.

Alternatively, call the `homeassistant.update_entity` action to force the integration to update the lock state, or enable the always connected option.

## Options

To define options for Yale Access Bluetooth, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Yale Access Bluetooth are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

If the lock does not support push updates via advertisements or you want lock operation to be more responsive, you can enable always connected mode. Always connected will cause the lock to stay connected to Home Assistant via Bluetooth, which will use more battery.

## Door sensors

The lock must be calibrated in the Yale Access App for the door sensors to function correctly. If the door sensor has an unknown state or is not updating, try recalibrating the lock in the app.

## Obtaining the offline key

The offline key and slot number are required to operate the lock. These credentials can be found in multiple places depending on the lock brand and model.

### Yale Access, Yale Home, or August Cloud

The [Yale](/home-assistant/integrations/yale) or [August](/home-assistant/integrations/august) cloud integration can automatically provision the offline key if the configured account has the key loaded. You may need to create or use a non-primary existing account with owner-level access to the lock, as not all accounts will have the key loaded. If the lock was not discovered by Home Assistant when the cloud integration was loaded, reload the cloud integration once the lock has been discovered.

If the offline key can automatically be provisioned, you will not be asked to enter it and the integration should be automatically added, configured and running.

Most Yale branded locks can use the cloud integration to obtain the offline key. Accessing the August cloud to receive the key may only work if the lock was purchased in a market that sells under both brands and the Yale cloud should be tried for other markets.

### iOS - Yale Access App or August App

The iOS app will only save the offline key to your device's filesystem if Auto-Unlock has been enabled and used at least once. Auto-Unlock can be disabled once the key has been loaded.

- Using [iMazing](https://imazing.com/) or [iPhone Backup Extractor](https://www.iphonebackupextractor.com/), find the backup files for the Yale Access app.
- Look in the `Library/Preferences` `.plist` files for the Yale Access app and find the one with the value of `key` and `slot` using `Xcode` or any binary `plist` viewer.

### Android - Yale Access App or August App

The Android app will only save the offline key to your device's filesystem if Auto-Unlock has been enabled and used at least once. Auto-Unlock can be disabled once the key has been loaded.

Root access is required to copy the `ModelDatabase.db` from `/data/data/com.august.bennu/databases`. Once copied, you can use [DB Browser for SQLite](https://sqlitebrowser.org/) to open the `ModelDatabase.db`, navigate to the table `LockData` and find the column `offlineKeys`. There, you will find a JSON that includes the `key` and `slot` properties.

### Android - Yale Home

The Android app will only save the offline key to your device's filesystem if Auto-Unlock has been enabled and used at least once. Auto-Unlock can be disabled once the key has been loaded.

Root access is required to copy the `ModelDatabase.sql` from `/data/data/com.assaabloy.yale/databases`. Once copied, you can use [DB Browser for SQLite](https://sqlitebrowser.org/) to open the `ModelDatabase.sql`, navigate to the table `LockData` and find the column `offlineKeys`. There, you will find a JSON that includes the `key` and `slot` properties.

## Troubleshooting

### Lock frequently requires re-authentication

If you use the key from an iOS or Android device that you also frequently use to operate the lock, you may find that the key is rotated, and the integration can no longer authenticate. If you are using the [Yale](/home-assistant/integrations/yale) or [August](/home-assistant/integrations/august) integration to keep the key up to date, it may need to be reloaded to update the key. 

To avoid the problem, create a second owner account in the Yale Home or August app, log in to it once on your iOS or Android device, operate the locks, log out of the account, remove the Yale or August integration from Home Assistant, and set up the integration again with the secondary owner account. This method avoids the problem because there is no longer an iOS or Android device logged into the secondary owner account that can rotate the key unexpectedly.
