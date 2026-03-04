---
title: 音频管道
description: 音频管道视图说明
---

# 音频管道

<video controls autoplay loop muted playsinline style="width: 100%; max-width: 800px;">
  <source src="/videos/audio-pipeline.mp4" type="video/mp4" />
</video>

## 基本视图
<img src="/assets/screenshots/audiopipeline-basic.png" alt="image" style="width: 500px;"  loading="lazy" />

此视图显示音频经过的完整路径。左侧线条上的蓝点表示管道中的处理点。

视图分为两个部分：输入和输出。部分标题上的彩色圆点表示音频离开该部分时的质量。橙色表示正在使用有损编解码器。绿色表示正在使用无损编解码器。青色表示正在使用无损编解码器，且采样率高于48kHz或位深高于16位（也称为"Hi-Res"高解析度）。

输入部分显示流的来源、编解码器、<a href="https://www.izotope.com/en/learn/digital-audio-basics-sample-rate-and-bit-depth.html" target="_blank" rel="noopener noreferrer">采样率和位深</a>。所有音轨在 Music Assistant 内部都以原始<a href="https://diyodemag.com/education/what_is_pcm_pulse_code_modulation" target="_blank" rel="noopener noreferrer">PCM</a>格式处理，并解码为源采样率的<a href="https://www.youtube.com/watch?v=4YRp-FIsNDA" target="_blank" rel="noopener noreferrer">32位浮点</a>格式。将鼠标悬停在 ⓘ 上可以查看原始文件的更多详细信息，包括比特率。

接下来显示音量标准化值。有关如何应用音量标准化的详细信息，请参阅[技术信息](/music-assistant/faq/tech-info/#volume-normalization)页面。

然后显示输出部分，在此示例中很简单，只显示输出限幅器，音频采样率或位深没有发生变化，最后显示播放器提供程序的图标和播放器名称。

MA 默认向播放器发送无损音频。发送到播放器的确切编解码器、采样率或位深取决于播放器/提供程序，并且始终会显示。如果在播放器设置中选择了MP3选项（参见下文的[群组](#groups)示例），或者音频被重新采样以匹配播放器的最大或原生采样率或位深，则原始音频质量可能会发生变化。虽然可以向播放器发送PCM，但通常使用FLAC来节省带宽。

可以预期的最大采样率可以在[播放器提供程序汇总表](/music-assistant/player-support/)中找到。如果更改了播放器的"此播放器支持的采样率"高级设置的默认选项，则可能会进一步限制。

***************************************************************
## 数字信号处理
<img src="/assets/screenshots/audiopipeline-dsp.png" alt="image" style="width: 500px;"  loading="lazy" />

在此示例中，已启用[DSP](/music-assistant/settings/individual-player/#dsp-settings)。显示了已应用的DSP滤波器的高级信息。如果不支持DSP，会有工具提示解释原因（参见下文[群组](#groups)中的示例）。

此示例中还有一个值得注意的地方，即输入部分显示的图标通常应该是编解码器图标。当MA无法确定编解码器时，会显示此图标，这可能发生在容器格式中，如<a href="https://www.wavpack.com/" target="_blank" rel="noopener noreferrer">wavpack</a>、<a href="https://cloudinary.com/guides/video-formats/what-is-the-m4a-format-understanding-the-difference-between-m4a-mp3-and-wav" target="_blank" rel="noopener noreferrer">m4a</a>或<a href="https://en.wikipedia.org/wiki/Direct_Stream_Digital" target="_blank" rel="noopener noreferrer">DSD64</a>。

***************************************************************
## 群组
<img src="/assets/screenshots/audiopipeline-groups.png" alt="image" style="width: 500px;"  loading="lazy" />

视图会根据需要扩展以显示所有[群组播放器](/music-assistant/faq/groups/)。在上面的示例中，显示了三个播放器，具有各种滤波器、输出质量和播放器类型。

此示例中值得注意的一点是第三个输出部分标签旁边的橙色圆点。虽然输出限幅器或<a href="https://www.youtube.com/watch?v=tIIK2wuXHuY" target="_blank" rel="noopener noreferrer">上采样到48kHz</a>不会导致质量损失，但更改为<a href="https://www.adobe.com/au/creativecloud/video/discover/best-audio-format.html" target="_blank" rel="noopener noreferrer">有损MP3编解码器</a>需要指示现在只是低质量。

当一组播放器具有相同的管道时，相同的输出阶段将被折叠，显示一个播放器，后跟加号和所代表的其他播放器数量。点击信息图标将展开列表，如下图所示。请注意，对于Squeezelite或AirPlay，每个播放器可能有不同的输出管道，而对于其他播放器类型（如Sonos或Snapcast），主播放器决定发送给所有子播放器的流。

<img src="/assets/screenshots/audiopipeline-groups-collapsed.png" alt="image" style="width: 500px;"  loading="lazy" />

