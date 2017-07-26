/**
 * Created by admin on 2017/7/26.
 */
var path = require('path')
var fs = require('fs')
exports.resolve = function(obj) {
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    if (obj[i] && Object.prototype.toString.call(obj[i]) === '[object Object]') {
      obj[i] = this.resolve(obj[i]);
    } else {
      obj[i] = trim(obj[i]);
    }
  }

  return obj;
}

function trim() {
  var args = Array.prototype.slice.call(arguments);
  args = args.map(function (v) {
    try {
      return JSON.parse(v);
    } catch (e) {
      console.error(e);
      return '';
    }
  });


  switch (args.length) {
    case 0:
      return '';
    case 1:
      return args[0];
    default:
      return args;
  }
}


exports.after = function(root,files,hash) {

  Object.keys(files)
    .forEach(function (file) {
      file = path.resolve(root, file);

      var content = fs.readFileSync(file, 'utf8');

      if (/index\.html/i.test(file)) {
        content = content
          .replace(/(js\/config\.js)/, 'js/config.'+hash+'.js');

        fs.writeFileSync(file, content);
      }

    });
}
