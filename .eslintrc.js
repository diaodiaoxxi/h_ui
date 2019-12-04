module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 缩进
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    // 换行格式
    'linebreak-style': 0,
    // 引号
    quotes: ['error', 'single'],
    // 分号
    semi: ['error', 'never'],
    // 函数括号之前的空格
    'space-before-function-paren': ['error', 'never'],
    // 逗号风格 行尾
    'comma-style': [2, 'last'],
    'vue/use-v-on-exact': 0,
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'no-useless-escape': 0
  }
}
