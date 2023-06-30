const path=require("path")
const fs=require("fs")
const hostUtils=require("../utils/hostUtils")
const hostsDataBasePath=path.join(__dirname,"../database/hosts.json")
const hostsData=require(hostsDataBasePath)
const host={
    Group:"",
    Lable:"",
    Tags:"",
    Hostname:"",
    Port:"",
    User:"",
    Password:""
}
const hostsList = () => {
    hostsData.forEach((host)=> {
        console.log("主机:%s  ip/name:%s  user:%s",host.Lable,host.Hostname,host.User)
    });
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
module.exports = {hostsList,addHost,modifyHost};
