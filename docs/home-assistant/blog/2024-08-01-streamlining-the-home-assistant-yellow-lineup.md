---
title: 精简家庭助理黄色阵容
description: '<p class=''img''<img src=''/home-assistant/images/blog/2024-08-yellow-lineup/art.jpg'' style=''border: 0;box-shadow: none;'' alt="Home Assistant Yellow and。'
---
# 精简家庭助理黄色阵容

<p class='img'><img src='/home-assistant/images/blog/2024-08-yellow-lineup/art.jpg' style='border: 0;box-shadow: none;' alt="Home Assistant Yellow and packaging">Home Assistant Yellow 完全组装有附加（且不包含）NVMe 存储和 Z-Wave GPIO 模块</p>

**TL;DR：** 我们现在仅将 Home Assistant Yellow 作为套件出售，这需要单独购买 CM4。 Home Assistant Green 是初学者的最佳即插即用选择。

让更多人使用 Home Assistant 的一个重要部分是提供出色的专用硬件。我们的目标是提供比以往更轻松地开始使用 Home Assistant 的硬件，并为高级用户提供引人注目的选项。  2022 年，我们开始发货[Home Assistant黄](/home-assistant/yellow/)，我很高兴地说，现在到 2024 年，它仍然是我们的旗舰硬件产品。  我们看到这个可扩展的小型动力装置的使用寿命很长，这就是为什么我们正在简化我们的硬件阵容，以使未来更有意义。

我们现在将仅以套件形式销售 Home Assistant Yellow，并停止生产 Home Assistant Yellow Standard（我们的版本已预装了 CM4 和 Home Assistant 已安装）。请放心，由于Home Assistant黄色标准的硬件与我们的套件相同，因此它将继续获得相同的支持和软件更新。无论是否有以太网供电 (PoE)，这些套件都将继续提供。

这不是最大的变化，但我们希望我们的社区知道 - 如果您想了解我们为什么进行更改，以及我们的[当前硬件比较](#comparison)，请继续阅读。

<!--more-->

## 背景

当我们推出 Home Assistant Yellow 时，我们在设计它时就考虑到了可扩展性。  它包括板载 Zigbee/Thread 无线电、用于更强大存储的 M.2，以及用于添加更多连接的 USB 端口（例如添加我们未来的 [Z-Wave 设备](/home-assistant/blog/2024/06/12/roadmap-2024h1/#next-priority-home-assistant-connect-hardware-for-Z-Wave)）。  最重要的是，您可以通过更换树莓派计算模块 4 (CM4) 来更改设备的核心规格。  这允许用户增加 RAM、添加 eMMC 存储，甚至添加内置 Wi-Fi/蓝牙。

所有这些可扩展性都很棒，但我们发现许多用户想要一种更简单的方式来开始使用 Home Assistant。这就是我们创建 Home Assistant Yellow Standard 变体的原因，其中包括已经安装在主板上的带有 Home Assistant 的 CM4 - 与我们的套件不同，无需组装。这意味着您可以在插入以太网和电源后立即开始使用它。

### 绿色遇上黄色

跳转到 2023 年，为了创造一个更实惠的起点，我们推出了 [Home Assistant Green](/home-assistant/green/)。它不仅成本更低，而且更好地履行了Home Assistant黄色标准过去所占据的即插即用的作用。从时间角度来看，2021 年和 2022 年并不是采购树派莓产品（包括 CM4）的最佳时机。我们从此类产品增加的供应链复杂性中吸取了一些重要教训，它影响了我们设计绿色时的想法。最终，Home Assistant Green 是一个更好的初学者选择，导致我们结束了标准的生产。尽管Home Assistant黄色标准现在在主要零售商处缺货，但它将继续获得支持。

＃＃ 比较<p class='img'><img src='/home-assistant/images/blog/2024-08-yellow-lineup/green-meets-yellow.jpg' style='border: 0;box-shadow: none;' alt="Home Assistant Green and Yellow compared">Home Assistant绿色和黄色比较 - 正如您所看到的，它们的尺寸大致相同</p>
因此，您决定购买一些官方的Home Assistant硬件，但不知道从哪里开始，这里有一些比较可以帮助您在绿色和黄色之间进行选择。

<br><br>
<table style="font-size: 0.9em; width: 100%;">
  <colgroup>
    <col style="width: 20%;">
    <col style="width: 40%;">
    <col style="width: 40%;">
  </colgroup>
  <thead>
    <tr>
      <th style="font-size: 1.2em;">特点</th>
      <th style="font-size: 1.2em;">Home Assistant绿色</th>
      <th style="font-size: 1.2em;">Home Assistant黄色套件</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>最适合</b></td>
      <td>初学者，即插即用</td>
      <td>高级用户、维修匠、可扩展性</td>
    </tr>
    <tr>
      <td><b>设置</b></td>
      <td>Easy - 插入两根随附的电缆，即可启动并运行</td>
      <td>需要购买CM4、基本<a href="https://yellow.home-assistant.io/power-supply/">组件</a>和<a href="https://yellow.home-assistant.io/power-supply/#installing-home-assistant-software-on-kit">软件安装</a></td>
    </tr>
    <tr>
      <td><b>连接</b></td>
      <td>通过随附电缆进行支架</td>
      <td>通过随附电缆连接支架</td>
    </tr>
    <tr>
      <td><b>Zigbee/内置螺纹</b></td>
      <td>无<p>(可添加<a href="/home-assistant/connectzbt1/">Home Assistant连接ZBT-1</a>)</p></td>
      <td>有<p>(板载<a href="https://yellow.home-assistant.io/guides/about-firmware-options/">Zigbee 3.0 / 螺纹</a>)</p></td>
    </tr>
    <tr>
      <td><b>可扩展性</b></td>
      <td>
        好
        <ul>
          <li>2x USB 端口</li>
        </ul>
      </td>
      <td>
        最佳
        <ul>
          <li>1x 计算模块连接器（RAM、eMMC、Wi-Fi/蓝牙）</li>
          <li>1x NVMe 插槽</li>
          <li>2x USB 端口</li>
          <li>10针GPIO</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>Power</b></td>
      <td>附带电源</td>
      <td>
        <a href="https://yellow.home-assistant.io/">型号相关</a>：
        <ul>
          <li>套件：包含电源</li>
          <li>Kit PoE：接地供电，无电源</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>他们还有什么共同点</b></td>
      <td colspan="2">两者均体积小、无风扇/静音、功耗极低、性能稳定，可带来流畅的Home Assistant体验。另外，购买其中任何一个都支持Home Assistant的开发！</td>
    </tr>
    <tr>
      <td><b>更多信息</b></td>
      <td><a href="/home-assistant/green/">了解更多有关Home Assistant绿色</a></td>的信息
      <td><a href="/home-assistant/yellow/">了解有关Home Assistant黄色的更多信息</a></td>
    </tr>
  </tbody>
</table>

## 结论

这个小小的改变帮助我们保持简单，同时继续为新用户和现有用户提供出色的硬件选项。但正如我们常说的，在您拥有的任何硬件上运行 Home Assistant，无论是我们的硬件还是您手头已有的硬件。最后，我们的主要目标之一是建立一个更可持续的智能家居。