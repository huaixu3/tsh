const { spawnSync } = require("child_process");

const path=require("path")
const sshLoginExp=path.join(__dirname,"../utils/ssh-login.exp")
const hostsImpl=require("./hostsImpl")
const cryptoImpl=require("./cryptoImpl")
// 调用expect脚本
const connect = (username, hostname, password,port=22) => {
    // console.log("start login")
    // decrypt
    password = cryptoImpl.decrypt(password);
    const result = spawnSync(
        sshLoginExp,
        [username, hostname, password,port],
        {
            stdio: "inherit",
        }
    );
    if (result.status !== null && result.status !== 0) {
        console.error(`expect script exited with code ${result.status}`);
        process.exit(result.status);
    }
    // expect脚本执行完成后退出程序
    process.exit(0);
};
const connectByLable=(hostLable)=>{
    var targetHost=hostsImpl.hostsData.filter(host => host.Lable === hostLable);
    if (targetHost.length === 1) {
        connect(targetHost[0].User,targetHost[0].Hostname,targetHost[0].Password,targetHost[0].Port)
        // console.log(targetHost[0]);
    } else {
        console.log("输入有误")
    }
}
module.exports = {connect,connectByLable};
