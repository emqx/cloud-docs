const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const _build = path.join(__dirname, '../_book/en_US');
const _build1 = path.join(__dirname, '../_book/zh_CN');
const rmList = ['_scaffolds', '_js', '_scripts', '_styles', 'package.json', 'README.md', 'yarn.lock', '.gitignore'];

rmList.forEach(name => {
  try {
    const file = path.join(_build, name)
    const file1 = path.join(_build1, name)
    execSync(`rm -rf ${file}`);
    execSync(`rm -rf ${file1}`);
  } catch (e) {
    console.log(e)
  }
})
// copy icon
fs.copyFileSync(
  path.join(_build, './_assets/favicon.ico'),
  path.join(_build, '../gitbook/images/favicon.ico'),
)
