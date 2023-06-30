const { spawn } = require('child_process');
const fs = require('fs');
const path=require("path")

const hostsDataBasePath=path.join(__dirname,"../database/hosts.json")
// 1. 创建一个临时文件
const hostTemplatePath = path.join(__dirname,"../template/hostTemplate.json");
const hostTemplate=require(hostTemplatePath)
const tmpFilePath=path.join(__dirname,"../template/template.json")
// const tmpFile = './template.txt';
const tmpFile = tmpFilePath;

// callback 传递 hosts object
const addHostByVim=(callback)=>{
    fs.writeFileSync(tmpFile, JSON.stringify(hostTemplate,null,2));
    // 2. 调用Vim打开临时文件
    //const vim = spawn('vim', ['-c', 'startinsert', tmpFile], { stdio: 'inherit' });
    const vim = spawn('vim', [ tmpFile], { stdio: 'inherit' });
    // 3. 监听Vim进程的关闭事件
    vim.on('close', (code) => {
      //console.log(`Vim process exited with code ${code}`);
      // 4. 读取保存后的文件内容
      const content = fs.readFileSync(tmpFile, 'utf-8');
      //console.log(`File content: ${content}`);
     callback(JSON.parse(content))
      // 5. 删除临时文件
      fs.unlinkSync(tmpFile);
    });
}

// 修改数据并 导出给下一个
const modifyHostsDataByVim=(hostsData,callback)=>{
    fs.writeFileSync(tmpFile, JSON.stringify(hostsData,null,2));
    // 2. 调用Vim打开临时文件
    const vim = spawn('vim', [ tmpFile], { stdio: 'inherit' });
    // 3. 监听Vim进程的关闭事件
    vim.on('close', (code) => {
        //console.log(`Vim process exited with code ${code}`);
        // 4. 读取保存后的文件内容
        const content = fs.readFileSync(tmpFile, 'utf-8');
        //console.log(`File content: ${content}`);
        callback(JSON.parse(content))
        // 5. 删除临时文件
        fs.unlinkSync(tmpFile);
    });
}
const saveHostToHostDatabase=(tmpHostsData)=>{
    try {
        fs.writeFileSync(hostsDataBasePath, JSON.stringify(tmpHostsData), 'utf8');
        console.log('保存成功!');
    } catch (error) {
        console.error('保存错误：', error);
    }
}
// getHost((data)=>{
//     var a=JSON.parse(data)
//     console.log(a)
// })
module.exports = {addHostByVim,saveHostToHostDatabase,modifyHostsDataByVim};
