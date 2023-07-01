const path=require("path")
const fs=require("fs")
const hostUtils=require("../utils/hostUtils")
const hostsDataBasePath=path.join(__dirname,"../database/hosts.json")
const hostsData=require(hostsDataBasePath)
var Table = require('cli-table');
// instantiate
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
        tmpHostsData.push(host)
        // 保存
        hostUtils.saveHostToHostDatabase(tmpHostsData)
    })
}
const modifyHost=()=>{
    hostUtils.modifyHostsDataByVim(hostsData,(hostsData)=>{
        // 保存
        hostUtils.saveHostToHostDatabase(hostsData)
    })
}
// modifyHost()
// hostsList(hostsData)
// addHost(host)
module.exports = {hostsList,addHost,modifyHost,hostsData};
