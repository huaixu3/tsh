# tsh
> terminal in ssh

## 功能预期

- 加/解密
- 连接
- 主机管理(增、删、改、查)

## quick start 
```bash
git clone 
npm install  # 安装依赖
vim ./src/config/config.json # 修改掉默认的key,注，key值须为16位
mv ./src/lib/database/hosts.json-template ./src/lib/database/hosts.json # 数据存放位置
npm install -g  # 全局安装
tsh # 开始使用
```

## 开发
```bash
# 文件情况
src
    ├── config
    │   └── config.json # 配置文件，key
    ├── lib
    │   ├── database
    │   │   ├── hosts.json
    │   │   └── hosts.json-template # 将hosts.json-template 更名成hosts.json 以使用
    │   ├── service
    │   │   ├── connectImpl.js
    │   │   ├── cryptoImpl.js
    │   │   └── hostsImpl.js
    │   ├── template
    │   │   └── hostTemplate.json
    │   └── utils
    │       ├── hostUtils.js
    │       └── ssh-login.exp
    └── tsh.js # 入口文件

sudo npm install -g 
# 全局安装，
# 包会在/usr/lib/node_modules/tsh/ 
# 可执行命令会在 /usr/bin/tsh 

# bin选项
#  "bin": {
#    "tsh": "src/tsh.js"
#  },

```
