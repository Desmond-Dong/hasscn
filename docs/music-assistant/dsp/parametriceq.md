---
title: DSP 参数均衡器
description: DSP 参数均衡器滤镜的使用和效果说明
---

# 参数均衡器

参数均衡器 (PEQ) 是一个<a href="https://www.masteringbox.com/learn/parametric-eq" target="_blank" rel="noopener noreferrer">强大的工具</a>，用于微调音频。与简单的音调控制不同，PEQ 允许精确调整特定频率范围。

PEQ 可用于根据房间的声学特性调整声音、补偿扬声器或耳机特性，或根据个人喜好微调频率平衡。MA 支持对两个声道（左和右）相同或单独应用校正。

如果需要，可以向 MA 信号路径添加多个 PEQ 滤镜。

## 使用

显示器顶部有一个按钮可以启用多声道选项。启用此选项会显示额外的声道选择框，并允许在每个声道的基础上应用校正。

### 频段调整

可以向 PEQ 添加无限个频段，可以影响所有声道，或单独影响左或右声道。对于每个频段，可以控制：

- **频率：** 要调整的中心频率（例如，100Hz 用于低音，1kHz 用于中音，10kHz 用于高音）。

- **增益：** 对该频率应用多少提升（增加音量）或削减（减少音量），以分贝 (dB) 为单位测量。

- **Q（品质因数）：** 这决定了受影响的频率范围的宽度。较高的 Q 意味着更窄、更集中的调整，而较低的 Q 创建更宽、更温和的变化。

- **滤镜类型：** 这决定了<a href="https://www.musicguymixing.com/eq-filters/" target="_blank" rel="noopener noreferrer">调整的形状</a>。可用选项有 Peak（又名 Bell）、High Shelf、Low Shelf、High Pass、Low Pass 和 Notch。

### 前置放大器

PEQ 还允许前置放大器增益调整。虽然这会产生与输入阶段增益调整相同的效果，但将其放在这里意味着可以导入和导出该值。此外，如果 PEQ 设置总体上使信号更安静，那么在此处调整增益意味着在启用/禁用 eq 时，音量将保持不变。

### 预设

如果您已经测量了扬声器，或者想使用 <a href="https://autoeq.app/" target="_blank" rel="noopener noreferrer">AutoEQ</a> 校正耳机，您可以自动将预设导入此滤镜。

Music Assistant 接受 <a href="https://equalizerapo.com" target="_blank" rel="noopener noreferrer">Equalizer APO 的参数 EQ</a> 文件格式，该格式在各种应用程序中被广泛采用，此导入功能也可以与 <a href="https://www.roomeqwizard.com" target="_blank" rel="noopener noreferrer">Room EQ Wizard</a> (REW) 的 `Export filter settings as text file format` 无缝配合使用。
虽然并非所有滤镜类型都受支持（Modal、BP、LSC x dB、HS x dB、AP、LS with dB slope、HS with dB slope），但最重要的那些都可以正常工作。

可以从各种来源导入均衡器预设，包括 <a href="https://wwmm.github.io/easyeffects/" target="_blank" rel="noopener noreferrer">EasyEffects</a>（作为 APO 预设）和来自 <a href="https://housecurve.com/" target="_blank" rel="noopener noreferrer">HouseCurve</a> 的 REW 兼容预设

均衡器也可以导出以在其他应用程序中使用。例如，数据可以用于：APO、另一个 Music Assistant 实例或 EasyEffects。

#### 多声道

当定义单独的左右声道时，PEQ 预设文件有多种格式。导入多声道预设文件时，请按以下步骤操作：

- 如果只有一个包含两个声道设置的预设，只需使用 `Import APO/REW Preset` 按钮导入文件
- 如果每个声道有单独的预设文件：
    1. 启用多声道控制
    2. 选择左声道
    3. 使用 `Import APO/REW Preset` 按钮导入左声道的预设
    4. 选择右声道
    5. 使用 `Import APO/REW Preset` 按钮导入右声道的预设

如果激活了任何多声道特定选项，`Export APO Preset` 按钮将创建一个包含两个声道信息的单个预设文件。
