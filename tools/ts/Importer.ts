/// <reference path="FilePath.ts" />
class Importer {
  prefix: string;
  importDefineParser: ImportDefineParser;
  constructor(prefix: string) {
    this.prefix = prefix;
    this.importDefineParser = new ImportDefineParser(prefix);
  }
  import(files: {htmlFile: FilePath; tsFile: FilePath;}) {
    fs.readFile(files.htmlFile.absolute(), 'utf8', (err: Error, text: NodeBuffer) => {
      var addLines = new AddLinesFactory().create(text.toString());


      fs.readFile(files.tsFile.absolute(), 'utf8', (err: Error, text: NodeBuffer) => {
        var str = text.toString();
        var params = this.importDefineParser.parseDefine(str);

        var lines = str.split('\n');
        var result = '';
        var inside = false;
        lines.forEach((line: string)=>{
          if(line.indexOf(this.prefix + ' START') != -1) {
            var prefixSpace = line.substring(0, line.indexOf(this.prefix));
            var insertString = addLines.createString(params.variableName, prefixSpace);

            inside = true;
            result += line + '\n';
            result += insertString + '\n';

          } else if(line.indexOf(this.prefix + ' END') != -1) {
            inside = false;
            result += line + '\n';
          } else if(!inside){
            result += line + '\n';
          }
        });

        if(!inside) fs.writeFileSync(files.tsFile.absolute() , result);

      });


    });
  }
}

class AddLines {
  lines: string[];
  constructor(lines: string[]) {
    this.lines = lines;
  }
  createString(variableName: string, prefixSpace?: string): string {
    var result = "";
    this.lines.forEach((line)=>{
      if(prefixSpace) result += prefixSpace;
      result += variableName + " " + line + "\n";
    });
    return result;
  }
}

class AddLinesFactory {
  create(html: string): AddLines {
    var str = html;
    var str = str.substring(str.indexOf("<body"));
    str = str.substring(str.indexOf(">") + 1);
    str = str.substring(0, str.indexOf("</body"));

    var result:string[] = [];
    var lines = str.split('\n');
    lines.forEach((str:string)=>{
        if(str.trim().length > 0) result.push("+= '" + str + "';");
    });
    return new AddLines(result);
  }
}
