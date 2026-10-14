你可以通过下载 CI 生成的 APK 制品来测试 pull request 中的更改，而无需在本地构建。

1. 前往 GitHub 上的 pull request。
2. 点击 **Checks** 选项卡。
3. 在左侧边栏中，点击 **Pull Request**。
4. 滚动到页面底部，找到 **Artifacts** 部分。
5. 下载 **APKs** 制品（包含所有 APK 变体的 ZIP 文件）。
6. 解压 ZIP 并找到 `full` 或 `minimal` APK。
7. 在设备上安装 APK：
   * **从手机上**：直接在手机上下载制品，并使用文件管理器应用安装。
   * **使用 ADB**：在计算机上运行 `adb install path/to/app.apk`。

:::note
你必须登录到 GitHub 账户才能下载制品。CI 工作流也必须成功完成后 APK 才能供下载。
:::

:::note
debug APK 与应用的生产版本并排安装，允许你同时安装两者。debug 版本有一个红色图标，以区别于生产应用。
:::
