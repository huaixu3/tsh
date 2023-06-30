# tsh
> terminal in ssh

加密
连接
添加
修改

tsh
    connect [host] : default  
    a add        : add host  
    d delete :delete host  
    m modify :modify host  
    l ls :list host info   

file: 
```
/domain
    - hostsDataJson.js
        hosts:crud
    - configResource.json
        hosts:crud
/lib 
    - handleHosts.js 
    - apiHosts.js

/resource 
    - hostsData.json
    - configResource.json
```


```bash
sudo npm install -g 
# 全局安装，
# 包会在/usr/lib/node_modules/tsh/ 
# 可执行命令会在 /usr/bin/tsh 

# 添加bin选项
#  "bin": {
#    "tsh": "src/tsh.js"
#  },
```

增、删、改、查

保存全部
添加一个（vim)
查询已有的

删除
