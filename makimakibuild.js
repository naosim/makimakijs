var exec = require('child_process').exec;
var compressor = require('node-minify');

var NORMAL_JS_FILE = './js/makimaki/makimaki.js';
var MINIFY_JS_FILE = './js/makimaki/makimaki.min.js';

var command = 'tsc js/makimaki/ts/*.ts --out ' + NORMAL_JS_FILE;
exec(command, function (err, stdout, stderr) {
  if(err) {
    console.log(err);
    return;
  }
  console.log('build  successful -> ' + NORMAL_JS_FILE);
  new compressor.minify({
      type: 'gcc',
      fileIn: NORMAL_JS_FILE,
      fileOut: MINIFY_JS_FILE,
      callback: function(err, min){
        if(!err) {
          console.log('minify successful -> ' + MINIFY_JS_FILE);
        } else {
          console.log(err);
        }

      }
  });
});
