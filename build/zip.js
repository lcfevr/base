/**
 * Created by admin on 2017/6/19.
 */
var info = require('./../package.json');
var zip = info.name + "_" + info.version + "_" + new Date().toDateString() ;
var path = require('path');
var fs = require('fs');
var folder = path.join(__dirname,'../zip');
var zipper = require('zip-local');
if(!fs.existsSync(folder)) {fs.mkdirSync(folder)}
zipper.zip("dist/",function(err,zipped){
    if(!err) {
      zipped.compress();
      var buff = zipped.memory();
      zipped.save(folder+'/'+zip + ".zip",function(err){
          if (!err) {
            console.log("save successfully")
          }
      })
    }
})
