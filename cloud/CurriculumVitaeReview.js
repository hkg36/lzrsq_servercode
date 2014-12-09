/**
 * Created by amen on 2014/12/9.
 */
var CurriculumVitae=AV.Object.extend("CurriculumVitae")
var CurriculumVitaeReview=AV.Object.extend("CurriculumVitaeReview")
function AfterSave(request){
    var cvc=request.object
    var cv=cvc.get("cv")
    console.log("cv:"+cv)
    var cvrlist_len=0
    var cvuserlist=new Array()
    var tagslist={}
    var cvrquery=new AV.Query(CurriculumVitaeReview);
    cvrquery.equalTo("cv",cv)
    cvrquery.find({
      success: function(results) {
          console.log("cur:"+results)
          cvrlist_len=results.length
          var tmpuids={}
          for (var i = 0; i < results.length; i++) {
              var cvc = results[i];
              cvuserlist.push(cvc.get("user"))
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
      },
      error: function(error) {
      }
    })
    console.log("cus:"+cvuserlist)
    console.log("culen:"+cvrlist_len)
      cv.set("comment_users",cvuserlist)
      cv.set("comment_count",cvrlist_len)
      cv.set("tags",tagslist)
      cv.save()
}

exports.AfterSave=AfterSave