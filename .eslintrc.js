module.exports = {
  root: true,

  parserOptions: {
    parser: "babel-eslint", // 解析一些最新的 es 语法
    sourceType: "module", // 模块为 ECMAScript 模块
  },

  extends: ["standard"], // 使用 standard 标准

  rules: {
    "no-debugger": "error", // 禁止在代码中使用 debugger
    quotes: ["error", "single"], // 单引号
    semi: ["error", "always"], // 代码需要以分号结尾
  },
};
