/**
 * Created by amen on 2014/12/9.
 */
var CurriculumVitae=AV.Object.extend("CurriculumVitae")
var CurriculumVitaeReview=AV.Object.extend("CurriculumVitaeReview")
function allvalues(obj)
{
  pp=new Array()
  for(var key in kk) {
    pp.push(kk[key])
  }
  return pp
}
function AfterSave(request){
    var cvc=request.object
    var cv=cvc.get("cv")
    console.log("cv:"+cv)

    var cvrquery=new AV.Query(CurriculumVitaeReview);
    cvrquery.equalTo("cv",cv)
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
}

exports.AfterSave=AfterSave