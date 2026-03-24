---
title: 与助手对话 - 语句入门包
---

Home Assistant 附带了社区贡献的[内置语句](https://github.com/home-assistant/intents/tree/main/sentences)，支持[数十种语言](https://开发者.home-assistant.io/docs/voice/intent-recognition/supported-languages)。

## 前提条件

- 您想要通过助手控制的实体必须[暴露给助手](/home-assistant/voice_control/voice_remote_expose_devices/)。
- 使用实体或区域名称时，请确保与 Home Assistant 中定义的完全一致，或者[创建别名](/home-assistant/voice_control/aliases/)。

## 设备控制

### 开启和关闭实体

- *打开客厅灯光*
- *关闭吊扇*
- *打开电视*
- *锁上所有门*
- *打开大门*

### 灯光

- *将厨房灯光亮度调至 50%*
- *将床头灯设为绿色*
- *将床头灯亮度设为 50%*
- *将客厅亮度设为 50%*
- *将亮度设为 50%*
  - 使用语音卫星所在区域
- *将厨房灯光设为红色*
- *将灯光设为红色*
  - 使用语音卫星所在区域
- *打开客厅的灯光*

### 遮盖

- *关闭车库门*
- *打开厨房窗户*
- *哪些窗帘是关闭的*
- *将卧室窗帘设为 50%*

### 场景和脚本

- *运行静音模式脚本*
- *激活晚餐场景*
- *开启厨房晚餐场景*

### 媒体播放器

- *电视下一项*
- *下一首*
- *办公室下一首*
- *上一首*
- *办公室上一首*
- *电视跳过歌曲*
- *电视跳过曲目*
- *电视跳到下一首歌*
- *暂停|继续*
  - 暂停或继续语音卫星或当前区域的音乐
- *暂停|继续"区域"音乐*
  - 暂停或继续区域内的音乐
- *暂停|继续"实体"*
  - 暂停或继续媒体播放器上的音乐
- *取消电视暂停*
- *电视取消暂停*
- *将电视音量设为 90%*
- *将电视音量调至 90*
- *将电视音量调低至 90%*
- *静音我的电视*
- *取消电视静音*

### 吸尘器

- *让 rover 返回基站*
- *启动 rover*

### 列表

- *将面包添加到我的购物清单*
- *将装饰圣诞树添加到我的十二月家务清单*
  - 需要一个名为"december chores"的待办清单
- *将清理车库添加到周末清单*
  - 需要一个名为"Weekend"的待办清单

## 日期和时间

- *现在几点了？*
- *今天是什么日期？*

## 计时器

### 启动计时器

- *设置一个 5 分钟计时器*
- *5 分钟计时器*
- *为披萨设置一个 20 分钟计时器*
- *设置一个 1 小时 3 分钟计时器*
  - 请将其分解为小时、分钟和秒，而不是使用技术性术语如*设置一个 63 分钟计时器*。

### 取消计时器

- *取消计时器*
  - 暂时无法取消多个计时器
- *取消 5 分钟计时器*
- *取消披萨计时器*
- *取消厨房计时器*
  - 必须是由厨房中的语音卫星设置的

### 增加/减少时间

- *为披萨计时器增加 5 分钟*
- *为厨房计时器增加 5 分钟*
- *从计时器减去 1 分钟*
- *从 5 分钟计时器减去 1 分钟*

### 状态

- *计时器状态*
- *披萨计时器还剩多少时间？*
- *厨房计时器还剩多少时间？*
- *5 分钟计时器还剩多少时间？*

<p class='img'><lite-youtube videoid="v3mNdTsX4J0" videotitle="Voice timers with countdown text and loading bar"></lite-youtube>在 S3-Box-3B 上运行的计时器，带有倒计时文字和进度条！</p>

要了解如何设置，请参阅 [ESP32-S3-Box-3B 教程](/home-assistant/voice_control/s3_box_voice_assistant/)。

### 结合计时器和设备控制添加延迟

与普通语音计时器不同，延迟命令无法取消或修改。

- *5 分钟后关闭客厅灯光*
- *10 分钟后暂停电视*
- *5 分钟后打开百叶窗*

## 中止

- *算了*：如果您误触发了唤醒词并想让 Home Assistant 停止监听

## 故障排除

每种语言支持的语句列表都在不断更新。可能的语句非常多，无法在此一一列出。要了解您的语言支持哪些语句，请按以下步骤操作。

1. 如果语音助手无法理解您，您可能需要稍微改写您的语句。或者检查实体或名称是否适合您的环境。
2. 查看测试语句：
    - 在 GitHub 上的 [tests](https://github.com/home-assistant/intents/tree/main/tests) 文件夹中，打开您语言的子文件夹。
    - 浏览测试文件，查看已测试的示例语句。
    - 文件名的第二部分显示意图，第一部分显示领域。对于某些领域，如遮盖、风扇和灯光，有特定的语句。
        其他领域由通用的 *homeassistant_* 覆盖。

        ![助手语句测试文件文件夹示例](/home-assistant/images/assist/intents-test-files.png)
        
    - 下面的截图显示了用于测试打开灯光命令的语句。注意这里的*客厅*只是一个占位符。
        它可以是您家中的任何实体。

        ![一组测试语句示例](/home-assistant/images/assist/assist-test-file-light-turn-on.png)

3. 查看测试的语句定义：
    - 在 GitHub 上的 [sentences](https://github.com/home-assistant/intents/tree/main/sentences) 文件夹中，打开您语言的子文件夹。
    - 打开感兴趣的文件。

        ![打开灯光的语句定义](/home-assistant/images/assist/assist-sentence-definition-01.png)

        - () 表示替代元素。
        - [] 表示可选元素。
        - &lt;&gt; 表示扩展规则。要查看这些规则，请在 [_common.yaml](https://github.com/home-assistant/intents/blob/main/sentences/en/_common.yaml) 文件中搜索 `expansion_rules`。
        - 语法在[模板语句语法文档](https://开发者.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax/)中有详细说明。
4. 查看您语言的[语句定义](https://github.com/home-assistant/intents/tree/main/sentences)。
5. 查看[响应定义](https://github.com/home-assistant/intents/tree/main/responses)
6. 如果询问天气预报时出现问题，请查看[故障排除部分](/home-assistant/voice_control/troubleshooting/)了解常见错误。

## 更多语句

您可以扩展[内置语句](https://github.com/home-assistant/intents/tree/main/sentences)或[添加您自己的语句](/home-assistant/voice_control/custom_sentences)，以触发 Home Assistant 中的任何动作。