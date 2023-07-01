const path=require("path")
const fs=require("fs")
const hostUtils=require("../utils/hostUtils")
const hostsDataBasePath=path.join(__dirname,"../database/hosts.json")
const hostsData=require(hostsDataBasePath)
const Table = require('cli-table');
const cryptoImpl=require("./cryptoImpl")

var baseInfoTable = new Table({
    head: ['Label', 'IP/hostname','User','Port']
    , colWidths: [20, 20,10,5]
});

const hostsList = () => {
    hostsData.forEach((host)=> {
        baseInfoTable.push([host.Lable,host.Hostname,host.User,host.Port])
    });
    console.log(baseInfoTable.toString());
};
const addHost=()=>{
    // 新增主机
    hostUtils.addHostByVim((host)=>{
        var tmpHostsData = hostsData;
        host=addHostFilter(host)
        tmpHostsData.push(host)
        // 保存
        hostUtils.saveHostToHostDatabase(tmpHostsData)
    })
}
const addHostFilter=(host)=>{
    // 加密
    host.Password=cryptoImpl.encrypt(host.Password)
    // 默认端口
    if (host.Port === "") {
        host.Port = "22";
    }
    return host;
}
const modifyHost=()=>{
    hostUtils.modifyHostsDataByVim(hostsData,(hostsData)=>{
        // 保存
        hostUtils.saveHostToHostDatabase(hostsData)
    })
}
module.exports = {hostsList,addHost,modifyHost,hostsData};
