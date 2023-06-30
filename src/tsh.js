#!/usr/bin/env node

const { Command } = require("commander");
const connectImpl=require("./lib/service/connectImpl")
const cryptoImpl=require("./lib/service/cryptoImpl")
const hostsImpl=require("./lib/service/hostsImpl")
const {hostsData} = require("./lib/service/hostsImpl");
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
        if (crypto.opts().debug){
            console.log(cryptoImpl.decrypt(string));
        }else{
            console.log(cryptoImpl.encrypt(string));
        }
    });
    return crypto;
}
// connect 连接模块
function makeConnect() {
    const connect = new Command("connect");
    connect
        .argument("<host>","host")
        .action((host)=>{
            connectImpl.connectByLable(host)
        })
    connect
        .command("c")
        .argument("<user>","user")
        .argument("<hostname>","hostname")
        .argument("<password>","password")
        .action((user,hostname,password)=>{
            // console.log("user:",user)
            // console.log("hostname:",hostname)
            // console.log("password:",password)
            connectImpl.connect(user,hostname,password)
        })
    return connect;
}
// 主机模块
// ls =》 列出所有主机
// add 新增主机
// modify 修改主机
function makeHost() {
    const host = new Command("host");
    host
        .action(()=>{
            hostsImpl.hostsList();
        });
    host.command('ls')
        .alias("l")
        .description('list hosts')
        .action(() => {
            hostsImpl.hostsList();
        })
    host.command('add')
        .alias("a")
        .description('add host')
        .action(() => {
            hostsImpl.addHost();
        })
    host.command('modify')
        .alias("m")
        .description('modify hosts')
        .action(() => {
            hostsImpl.modifyHost();
        })
    return host;
}
