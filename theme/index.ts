import * as DefaultTheme from 'rspress/theme';  // 全量引入命名导出
import './custom.css';

// 继续导出命名导出（可选）
export * from 'rspress/theme';

// 补上默认导出（这是关键）
export default {
  ...DefaultTheme,
};
