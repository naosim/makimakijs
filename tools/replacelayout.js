var FilePath = (function () {
    function FilePath(file1, file2) {
        this.file = file2 ? this.concat(file1, file2) : file1;
    }
    FilePath.prototype.concat = function (file1, file2) {
        var lastIs = function (char, text) {
            return text.charAt(text.length - 1) === char;
        };
        if (!lastIs('/', file1) && !lastIs('/', file2)) {
            return file1 + '/' + file2;
        } else if (lastIs('/', file1) && lastIs('/', file2)) {
            return file1.substring(0, file1.length - 1) + file2;
        } else {
            return file1 + file2;
        }
    };
    FilePath.prototype.name = function () {
        return this.file.substring(this.file.lastIndexOf('/') + 1, this.file.length);
    };
    FilePath.prototype.path = function () {
        return this.file.substring(0, this.file.lastIndexOf('/'));
    };
    FilePath.prototype.absolute = function () {
        return this.file;
    };
    return FilePath;
})();
/// <reference path="FilePath.ts" />
/// <reference path="node.d.ts" />
var exec = require('child_process').exec;
var Greper = (function () {
    function Greper() {
    }
    Greper.prototype.setResultAction = function (resultAction) {
        this.resultAction = resultAction;
    };
    Greper.prototype.setValidAction = function (validAction) {
        this.validAction = validAction;
    };
    Greper.prototype.grep = function (text) {
        var _this = this;
        var command = 'grep -R "' + text + '" .';
        exec(command, function (err, stdout, stderr) {
            var lines = stdout.split('\n');
            lines.forEach(function (line) {
                var path = line.substring(0, line.indexOf(':'));
                if (_this.validAction ? _this.validAction(path) : _this.valid(path)) {
                    _this.resultAction(new FilePath(path));
                }
            });
        });
    };

    Greper.prototype.valid = function (path) {
        if (path.length <= 0)
            return false;
        if (path.indexOf('.ts') == -1)
            return false;
        return path.indexOf('/tools/') == -1;
    };
    return Greper;
})();
var Util = (function () {
    function Util() {
    }
    Util.clip = function (text, start, end) {
        var str = text;
        str = str.substring(str.indexOf(start), str.length);
        str = str.substring(0, str.indexOf(end) + 1);
        return str;
    };
    return Util;
})();
/// <reference path="FilePath.ts" />
/// <reference path="Util.ts" />
var ImportDefineParser = (function () {
    function ImportDefineParser(prefix) {
        this.prefix = prefix;
    }
    ImportDefineParser.prototype.parseDefine = function (text) {
        var str = Util.clip(text, this.prefix + ' START', '}');
        str = Util.clip(str, '{', '}');
        var params = JSON.parse(str);
        return params;
    };
    return ImportDefineParser;
})();
/// <reference path="FilePath.ts" />
var Importer = (function () {
    function Importer(prefix) {
        this.prefix = prefix;
        this.importDefineParser = new ImportDefineParser(prefix);
    }
    Importer.prototype.import = function (files) {
        var _this = this;
        fs.readFile(files.htmlFile.absolute(), 'utf8', function (err, text) {
            var addLines = new AddLinesFactory().create(text.toString());

            fs.readFile(files.tsFile.absolute(), 'utf8', function (err, text) {
                var str = text.toString();
                var params = _this.importDefineParser.parseDefine(str);

                var lines = str.split('\n');
                var result = '';
                var inside = false;
                lines.forEach(function (line) {
                    if (line.indexOf(_this.prefix + ' START') != -1) {
                        var prefixSpace = line.substring(0, line.indexOf(_this.prefix));
                        var insertString = addLines.createString(params.variableName, prefixSpace);

                        inside = true;
                        result += line + '\n';
                        result += insertString + '\n';
                    } else if (line.indexOf(_this.prefix + ' END') != -1) {
                        inside = false;
                        result += line + '\n';
                    } else if (!inside) {
                        result += line + '\n';
                    }
                });
                result = result.trim();
                if (!inside)
                    fs.writeFileSync(files.tsFile.absolute(), result);
            });
        });
    };
    return Importer;
})();

var AddLines = (function () {
    function AddLines(lines) {
        this.lines = lines;
    }
    AddLines.prototype.createString = function (variableName, prefixSpace) {
        var result = "";
        this.lines.forEach(function (line) {
            if (prefixSpace)
                result += prefixSpace;
            result += variableName + " " + line + "\n";
        });
        return result;
    };
    return AddLines;
})();

var AddLinesFactory = (function () {
    function AddLinesFactory() {
    }
    AddLinesFactory.prototype.create = function (html) {
        var str = html;
        var str = str.substring(str.indexOf("<body"));
        str = str.substring(str.indexOf(">") + 1);
        str = str.substring(0, str.indexOf("</body"));

        var result = [];
        var lines = str.split('\n');
        lines.forEach(function (str) {
            if (str.trim().length > 0)
                result.push("+= '" + str + "';");
        });
        return new AddLines(result);
    };
    return AddLinesFactory;
})();
/// <reference path="FilePath.ts" />
/// <reference path="Util.ts" />
/// <reference path="ImportDefineParser.ts" />
/// <reference path="node.d.ts" />
var LayoutHtmlDecider = (function () {
    function LayoutHtmlDecider(layoutDirectoryPath, prefix) {
        this.layoutDirectoryPath = layoutDirectoryPath;
        this.importDefineParser = new ImportDefineParser(prefix);
    }
    LayoutHtmlDecider.prototype.setResultAction = function (resultAction) {
        this.resultAction = resultAction;
    };
    LayoutHtmlDecider.prototype.decideHtmlFile = function (tsFile) {
        var _this = this;
        fs.readFile(tsFile.absolute(), 'utf8', function (err, text) {
            var params = _this.importDefineParser.parseDefine(text.toString());
            var result = {
                htmlFile: new FilePath(_this.layoutDirectoryPath, params.layout),
                tsFile: tsFile
            };
            _this.resultAction(result);
        });
    };
    return LayoutHtmlDecider;
})();
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
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
};

var DIR_PATH = './layout/';
var PREFIX = '//LAYOUTIMPORT';

var greper = new Greper();
var layoutHtmlDecider = new LayoutHtmlDecider(DIR_PATH, PREFIX);
var importer = new Importer(PREFIX);
greper.setResultAction(function (file) {
    layoutHtmlDecider.decideHtmlFile(file);
});
greper.setValidAction(function (path) {
    if (path.length <= 0)
        return false;
    if (path.indexOf('.ts') == -1)
        return false;
    return path.indexOf('/tools/') == -1;
});
layoutHtmlDecider.setResultAction(function (result) {
    console.log(result.htmlFile.absolute(), result.tsFile.absolute());
    importer.import(result);
});

greper.grep('//LAYOUTIMPORT START');
