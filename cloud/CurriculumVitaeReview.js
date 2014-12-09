/**
 * Created by amen on 2014/12/9.
 */
var CurriculumVitae=AV.Object.extend("CurriculumVitae")
var CurriculumVitaeReview=AV.Object.extend("CurriculumVitaeReview")
function AfterSave(request){
    cvc=request.object
    cvid=cvc.get("cvid")
    uid=cvc.get("uid")

    var cvrlist_len=0
    var cvuserlist=null
    var tagslist={}
    var cvrquery=new AV.Query(CurriculumVitaeReview);
    cvrquery.equalTo("cvid",cvid)
    cvrquery.find({
      success: function(results) {
          cvrlist_len=results.length
          var tmpuids={}
          for (var i = 0; i < results.length; i++) {
              var cvc = results[i];
              tmpuids[cvc.get("uid")]=true
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
    var query = new AV.Query(CurriculumVitae);
    query.equalTo("objectId", cvid);
    query.find({
      success: function(results) {
        if(results.length==1){
            cv=results[0]
        }
          cv.addUnique("comment_uids",uid)
          cv.set("comment_count",cvrlist_len)
          cv.set("tags",tagslist)
          cv.save()
      },
      error: function(error) {
      }
    })
}

exports.AfterSave=AfterSave