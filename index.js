#!/usr/bin/env node

const { Command } = require("commander");
const connectImpl=require("./lib/connectImpl")
const program = new Command();
program.version("1.0.1")
program.addCommand(makeConnect());
program.addCommand(makeCrypto());
program.addCommand(makeHost());
program.parse(process.argv);

// crypto module
function makeCrypto() {
    const crypto = new Command("crypto");
    crypto
        .argument("<string>","input string")
        .option('-d, --debug', 'output extra debugging')
        .action((string) => {
        const options = crypto.opts();
        //if (options.debug) console.log(options);
        if (crypto.opts().debug) console.log(options);
        console.log("heat jug",string);
    });
    return crypto;
}
// connect 连接模块
function makeConnect() {
    const connect = new Command("connect");
    connect
        .argument("<user>","user")
        .argument("<hostname>","hostname")
        .argument("<password>","password")
        .action((user,hostname,password)=>{
            console.log("user:",user)
            console.log("hostname:",hostname)
            console.log("password:",password)
            connectImpl.connect(user,hostname,password)
        })
    return connect;
}
// 主机模块
function makeHost() {
    const host = new Command("host");
    host
        .action(()=>{
            console.log("ls==",)
        })
    return host;
}
