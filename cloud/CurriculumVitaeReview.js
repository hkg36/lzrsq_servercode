/**
 * Created by amen on 2014/12/9.
 */
var CurriculumVitae=AV.Object.extend("CurriculumVitae")
var CurriculumVitaeReview=AV.Object.extend("CurriculumVitaeReview")
function AfterSave(request){
    var cvc=request.object
    var cv=cvc.get("cv")
    var user=cvc.get("user")

    var cvrlist_len=0
    var cvuserlist=null
    var tagslist={}
    var cvrquery=new AV.Query(CurriculumVitaeReview);
    cvrquery.equalTo("cv",cv)
    cvrquery.find({
      success: function(results) {
          cvrlist_len=results.length
          var tmpuids={}
          for (var i = 0; i < results.length; i++) {
              var cvc = results[i];
              tmpuids[cvc.get("user")]=true
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
          cvuserlist=Object.keys(tmpuids)
      },
      error: function(error) {
      }
    })
      cv.set("comment_users",cvuserlist)
      cv.set("comment_count",cvrlist_len)
      cv.set("tags",tagslist)
      cv.save()
}

exports.AfterSave=AfterSave