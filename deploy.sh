#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
yarn build

# 把域名文件复制到dist目录
# 让github自动解析域名
cp CNAME dist/

# cd 到构建输出的目录下
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:hecoco/jiyibi-website.git master:gh-pages
# git push -f git@gitee.com:githe163/jiyibi.git master:gh-pages

cd -