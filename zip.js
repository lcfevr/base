/**
 * Created by admin on 2017/6/19.
 */
var info = require('./package.json');
var zip = info.name + "_" + info.version + "_" + new Date().toDateString() ;

var zipper = require('zip-local');

zipper.sync.zip("dist/").compress().save(zip + ".zip");
