const path=require("path")
const hostsDataBasePath=path.join(__dirname,"./database/hosts.json")
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
//data=JSON.parse(hostsDataBasePath)
console.log(hostsDataBasePath)
//console.log(hostsData)

const hostsList = (hosts) => {
    hosts.forEach((host)=> {
        console.log(host.Lable)
        console.log(host.Hostname)
        console.log(host.User)
    });
};
hostsList(hostsData)
//module.exports = {connect};
