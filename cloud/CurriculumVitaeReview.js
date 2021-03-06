/**
 * Created by amen on 2014/12/9.
 */
var CurriculumVitae=AV.Object.extend("CurriculumVitae")
var CurriculumVitaeReview=AV.Object.extend("CurriculumVitaeReview")
var NotifyLog=AV.Object.extend("NotifyLog")
function allvalues(obj)
{
  pp=new Array()
  for(var key in obj) {
    pp.push(obj[key])
  }
  return pp
}
function AfterSave(request){
    var cvc=request.object
    var cv=cvc.get("cv")

    var cvrquery=new AV.Query(CurriculumVitaeReview);
    cvrquery.find({
      success: function(results) {
          var cvrlist_len=0
            var cvuserlist={}
            var tagslist={}
          console.log("cur:"+results)
          cvrlist_len=results.length
          var tmpuids={}
          for (var i = 0; i < results.length; i++) {
              var cvc = results[i];
              var oneuser=cvc.get("user")
              cvuserlist[oneuser.id]=oneuser
              var tags=cvc.get("tags")
              for(var tagi=0;tagi<tags.length;tagi++)
              {
                  var name=tags[tagi]
                  if(isNaN(tagslist[name])){
                      tagslist[name]=1
                  }
                  else{
                      tagslist[name]++
                  }
              }
          }
          cvuserlist=allvalues(cvuserlist)
          cv.set("comment_users",cvuserlist)
          cv.set("comment_count",cvrlist_len)
          cv.set("tags",tagslist)
          cv.save()
      },
      error: function(error) {
      }
    })

    cv.fetch({
        success:function(obcv)
        {
            var notify=new Array()
            notify.push(cvc)
            var notifyobj=new NotifyLog()
            notifyobj.set("note",notify)
            notifyobj.set("userObjectId",obcv.get("userObjectId"))
            notifyobj.save()
        }
    })

}

exports.AfterSave=AfterSave