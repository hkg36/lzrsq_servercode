var mqiniu=require('cloud/mqiniu');
var CurriculumVitaeReview=require('cloud/CurriculumVitaeReview')

AV.Cloud.define("qiniuUptoken",mqiniu.qiniuUptoken);
AV.Cloud.afterSave("CurriculumVitaeReview",CurriculumVitaeReview.AfterSave)