module.exports = api => {
  api.cache(true)
  return {
    presets: [
      ['@babel/preset-env', {
        modules: 'commonjs',
      }],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', {
        legacy: true,
      }],
    ],
  }
}
