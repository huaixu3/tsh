const { spawnSync } = require("child_process");
// SSH参数
//const username = "ve";
//const hostname = "localhost";
//const password = "123456";

const path=require("path")
const sshLogin=path.join(__dirname,"../utils/ssh-login.exp")
//console.log(sshLogin)
// 调用expect脚本
const connect = (username, hostname, password) => {
    console.log("start login")
    const result = spawnSync(
        //"./ssh-login.exp",
        sshLogin,
        [username, hostname, password],
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
module.exports = {connect};
