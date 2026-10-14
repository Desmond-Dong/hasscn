import languages from '!!yaml-loader!../../../intents/languages.yaml';
import intents from '!!yaml-loader!../../../intents/intents.yaml';

如果你在下方没有看到你的语言，[帮助我们翻译！](/developers/voice/intent-recognition/contributing.md)

有关每种语言的完整进度报告，[点击此处。](https://ohf-voice.github.io/intents/)

<>

  <table>
    <thead>
      <tr>
        <th>Code</th>
        <th>Language</th>
        <th>Leader</th>
        <th>Links</th>
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
                <a href={`https://github.com/home-assistant/intents/tree/main/sentences/${language}`}>Sentences</a>
              </td>
            </tr>
        )
      }
    </tbody>
  </table>
</>

[本页基于 Intents 仓库自动生成。](https://github.com/home-assistant/intents/blob/main/languages.yaml)
