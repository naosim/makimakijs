/// <reference path="FilePath.ts" />
/// <reference path="Util.ts" />

class ImportDefineParser {
  prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  parseDefine(text: string): {layout: string; variableName: string;} {
    var str = Util.clip(text, this.prefix + ' START', '}');
    str = Util.clip(str, '{', '}');
    var params = JSON.parse(str);
    return <{layout: string; variableName: string;}>params;
  }

}
