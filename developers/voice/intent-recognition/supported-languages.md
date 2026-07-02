# 支持的语言

import languages from '!!yaml-loader!../../../intents/languages.yaml';
import intents from '!!yaml-loader!../../../intents/intents.yaml';

如果你没有在下方看到自己的语言，[欢迎帮助我们一起翻译！](/developers/voice/intent-recognition/contributing.md)

如需查看各语言的完整进度报告，[请点击这里。](https://ohf-voice.github.io/intents/)

<>

  <table>
    <thead>
      <tr>
        <th>代码</th>
        <th>语言</th>
        <th>负责人</th>
        <th>链接</th>
      </tr>
    </thead>
    <tbody>
      {
        Object.entries(languages).map(
          ([language, info]) =>
            <tr>
              <td>
                <code>{language}</code>
              </td>
              <td>
                {info.nativeName}
              </td>
              <td>
                {info.leaders?.length &&
                    info.leaders.map((leader, idx) =>
                      <>
                        {!!idx && ', '}
                        <a href={`https://github.com/${leader}`}>{leader}</a>
                      </>
                    )}
              </td>
              <td>
                <a href={`https://github.com/home-assistant/intents/tree/main/sentences/${language}`}>句子</a>
              </td>
            </tr>
        )
      }
    </tbody>
  </table>
</>

[此页面基于 Intents 仓库自动生成。](https://github.com/home-assistant/intents/blob/main/languages.yaml)
