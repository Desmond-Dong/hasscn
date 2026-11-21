// 置空 rspress 内置的页面数据/搜索索引虚拟模块。
// 站内 search: false、webMcp: false，均不使用该数据；
// 而默认实现会把全站所有页面的元数据（约 2.8MB）内嵌进客户端主包。
export const pageData = { pages: [] };
export const searchIndexHash = {};
