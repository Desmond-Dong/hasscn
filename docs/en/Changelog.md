--- 
layout: doc 
---

# ✨ Changelog

> 📝 This page documents all optimizations and changes made to Home Assistant OS Turbo, except for official updates. Since the system version stays in sync with the official version, some updates will take effect in the next OTA version (or when freshly installed), rather than immediately.

> 📝 Some updates are not due to initial lack of optimization, but are adjustments in response to upstream official changes that require further improvements for users in China.

:::tip October 7, 2025
🛠️🇨🇳 Optimization: Added a `Beta` channel, allowing early adopters to sync with the `official stable version`; the default version remains on a once-per-month update cycle, unaffected.
:::

:::tip September 30, 2025
🐳🇨🇳 Optimization: Due to restrictions and instability of public image repositories, main system image addresses have been migrated to a `self-hosted server`.
:::

:::tip September 19, 2025
🔗🇨🇳 Optimization: Adjusted a `default image` address link due to changes in the official code.
:::

:::tip September 17, 2025
🔄 Optimization: With the previous server sponsor ceasing operations, a new sponsor provides more reliable support, so `commercial use` is no longer restricted.
🔄 Optimization: The next system version will change the commercial restrictions into acknowledgements of the sponsors.
:::

:::tip August 19, 2025
🚦🇨🇳 Optimization: Removed a redundant `add-on definition`, speeding up startup performance.
:::

:::tip August 6, 2025
🛠️🇨🇳 Optimization: Switched OS error log reporting to a domestic `self-hosted server`.
:::

:::tip July 10, 2025
🐳🇨🇳 Optimization: Migrated add-on build isolated image from `docker.io/library/docker` to `docker.m.daocloud.io/library/docker`, speeding up the build process.
:::

:::info June 18, 2025
🐳 New: System-level integration of [`docker hub`](https://github.com/dongyubin/DockerHub) mirror, significantly improving success rates for installing foreign add-ons.
:::

:::note June 8, 2025
⏰ Optimization: Default terminal time zone set to `Asia/Shanghai`.
:::

:::warning April 24, 2025
⚠️ New: "Commercial use restriction" notice added to the system terminal page.
:::

:::warning April 12, 2025
⚡ Optimization: HACS Turbo download logic now prioritizes checking public network connectivity; downloads only proceed when internet access is available.
:::

:::warning April 8, 2025
⏳ Optimization: Changed the default time synchronization server from `time.cloudflare.com` to domestic `cn.ntp.org.cn`.
:::

:::info April 7, 2025
🚀 Optimization: The built-in HACS Turbo download source has switched from GitHub to a `self-hosted server`, dramatically increasing download speed.
:::

:::tip April 5, 2025
🔒 Fix: Resolved an OTA update issue caused by certificate inconsistency.
:::

:::tip April 1, 2025
🗜️ New: System now supports unzipping zip files at the OS level (enabling automatic decompression during pre-installed integrations).

🛡️ Optimization: Network detection service migrated to a domestic self-purchased server (Aliyun).

🏫 Optimization: Image pull service migrated to the [`Nanjing University`](https://mirror.nju.edu.cn/) node.

🔄 Optimization: OTA upgrade service has been fully migrated to a domestic self-hosted server (Aliyun).

⚡ Optimization: System download links now point to domestic high-speed nodes.

❌ Optimization: Removed unstable `official add-on repository`.

❌ Optimization: Removed unstable `official community repository`.

❌ Optimization: Removed unstable `Music Assistant` repository.

❌ Optimization: Removed unstable `ESP Home` repository.

✅ New: Added a fully optimized and localized [`default add-ons repository`](addoncn), which already contains all the content removed above.

:::

---

:::note
🚩 Thank you to every friend for your support and participation. Together, let's witness more exciting developments in the future!
:::
