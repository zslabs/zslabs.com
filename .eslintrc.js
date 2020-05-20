module.exports = {
  "extends": "./node_modules/chaoskit/.eslintrc.js",
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~components', 'src/components'],
          ['~helpers', 'src/helpers'],
          ['~icons', 'src/assets/icons'],
          ['~layouts', 'src/layouts'],
          ['~media', 'src/assets/media'],
          ['~styles', 'src/assets/styles']
        ],
      }
    }
  }
}
