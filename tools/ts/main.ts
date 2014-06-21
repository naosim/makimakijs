/// <reference path="node.d.ts" />
/// <reference path="FilePath.ts" />
/// <reference path="Greper.ts" />
/// <reference path="LayoutHtmlDecider.ts" />
/// <reference path="Importer.ts" />
var fs = require('fs');


/**
tsファイルをグレップする
tsファイルからhtml名をとる
htmlからbodyを抜く
bodyをstringに変換する
tsファイルにいれる
*/

String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
};

var DIR_PATH = './layout/';
var PREFIX = '//LAYOUTIMPORT';

var greper = new Greper();
var layoutHtmlDecider = new LayoutHtmlDecider(DIR_PATH, PREFIX);
var importer = new Importer(PREFIX);
greper.setResultAction((file:FilePath)=>{
  layoutHtmlDecider.decideHtmlFile(file);
});
greper.setValidAction((path: string)=>{
  if(path.length <= 0) return false;
  if(path.indexOf('.ts') == -1) return false;
  return path.indexOf('/tools/') == -1;
});
layoutHtmlDecider.setResultAction((result: {htmlFile: FilePath; tsFile: FilePath;}) => {
  console.log(result.htmlFile.absolute(), result.tsFile.absolute());
  importer.import(result);
});


greper.grep('//LAYOUTIMPORT START');
