const CryptoJS = require('crypto-js');
const path =require('path')
const configPath=path.join(__dirname,"../../config/config.json")
const configResource=require(configPath)

const encryptoKey = configResource.encryptoKey;
//加密
const encrypt = (data,paramkey = encryptoKey) => {
  var key = CryptoJS.enc.Utf8.parse(paramkey);
  var mydata = CryptoJS.enc.Utf8.parse(data);
  var udata = CryptoJS.AES.encrypt(mydata, key, {
    mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7, // 填充方
  });
  var encrypted = udata.toString();
  return encrypted;
};
//解密
const decrypt = (data,paramKey = encryptoKey) => {
  var key = CryptoJS.enc.Utf8.parse(paramKey);
  var udata = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7,
  });
  var decrypted = udata.toString(CryptoJS.enc.Utf8);
  return decrypted;
};

module.exports = {encrypt, decrypt};

