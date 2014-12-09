/**
 * Created by amen on 2014/12/9.
 */
var CurriculumVitae=AV.Object.extend("CurriculumVitae")
function AfterSave(request){
    cvc=request.object
    cvid=cvc.get("cvid")
    uid=cvc.get("uid")
    var query = new AV.Query(CurriculumVitae);
    query.equalTo("objectId", cvid);
    query.find({
      success: function(results) {
        if(results.length==1){
            cv=results[0]
        }
          cv.addUnique("comment_uids",uid)
          cv.increment("comment_count",1)
          cv.save(null,{
              success: function(results)
              {},
              error: function(error){}
          })
      },
      error: function(error) {
      }
    })
}

exports.AfterSave=AfterSave