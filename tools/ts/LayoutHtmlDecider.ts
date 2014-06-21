/// <reference path="FilePath.ts" />
/// <reference path="Util.ts" />
/// <reference path="ImportDefineParser.ts" />
/// <reference path="node.d.ts" />
class LayoutHtmlDecider {
  layoutDirectoryPath: string;
  importDefineParser: ImportDefineParser;
  resultAction: (result: {htmlFile: FilePath; tsFile: FilePath;}) => void;

  constructor(layoutDirectoryPath: string, prefix: string) {
    this.layoutDirectoryPath = layoutDirectoryPath;
    this.importDefineParser = new ImportDefineParser(prefix);
  }
  setResultAction(resultAction: (result: {htmlFile: FilePath; tsFile: FilePath;}) => void) {
    this.resultAction = resultAction;
  }
  decideHtmlFile(tsFile: FilePath) {
    fs.readFile(tsFile.absolute(), 'utf8', (err: Error, text: NodeBuffer) => {
      var params = this.importDefineParser.parseDefine(text.toString());
      var result = {
        htmlFile: new FilePath(this.layoutDirectoryPath, params.layout),
        tsFile: tsFile
      }
      this.resultAction(result);
    });

  }
  
}
