/**
 * Created by admin on 2017/7/26.
 */


var argv = require('yargs').argv;
var fs = require('fs');
var path = require('path');
var project = argv.project || 'base';
var packages = require('../package.json');
var resolve = path.resolve(__dirname,'../src/project',project);
var config = require(resolve);

console.log(project);

config.VERSION = `"${packages.version}"`;
config.PROJECT = `"${project}"`;




if (argv.brand) {
  config.BRAND = config.BRANDS[argv.brand];
} else if (!config.BRAND) {
  config.BRAND = {};
}


var global = require('../src/project/base');

if (fs.existsSync(global)){
  Object.keys(global.BRAND).forEach(function(key){
    config.BRAND[key] = config.BRAND[key] || global.BRAND[key]
  })
}


module.exports = config
