require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
var mqiniu=require('cloud/mqiniu');

AV.Cloud.define("qiniuUptoken",mqiniu.qiniuUptoken);