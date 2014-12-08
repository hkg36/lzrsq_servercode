/**
 * Created by lzw on 14/12/2.
 */
var qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = 'COynvhTVDrV_vGxW-r6W7RQJXuDRhvO0Qd_VGaW0';
qiniu.conf.SECRET_KEY = 'k2_fVbFAjbPDR-_xw2KVtZODVNATRUQko4RV_CUe';
var bucketName = 'lzrsq';

function uptoken(bucketname) {
  var putPolicy = new qiniu.rs.PutPolicy(bucketname);
  //putPolicy.callbackUrl = callbackUrl;
  //putPolicy.callbackBody = callbackBody;
  //putPolicy.returnUrl = returnUrl;
  putPolicy.returnBody = "{\"url\":\"http://$(bucket).qiniudn.com/$(key)\"}";
  //putPolicy.persistentOps = "avthumb/amr";
  //putPolicy.persistentNotifyUrl = "https://leanchat.avosapps.com/persistNotify";
  //putPolicy.expires = expires;

  var tokenPart = putPolicy.token();
  return tokenPart;
}

function qiniuUptoken(req, res) {
  if(req.user){
    res.success({"token":uptoken(bucketName)});
  }
  else{
    res.error({"msg":"must login"})
  }
}

exports.uptoken = uptoken;
exports.qiniuUptoken = qiniuUptoken;
