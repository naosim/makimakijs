/// <reference path="FilePath.ts" />
/// <reference path="node.d.ts" />
var exec = require('child_process').exec;
class Greper {
  resultAction: (file:FilePath)=>void;
  validAction: (path: string) => boolean;
  setResultAction(resultAction:(file:FilePath)=>void) {
    this.resultAction = resultAction;
  }
  setValidAction(validAction: (path: string) => boolean) {
    this.validAction = validAction;
  }
  grep(text: string) {
    var command = 'grep -R "' + text + '" .';
    exec(command, (err: any, stdout: string, stderr: string)=>{
      var lines = stdout.split('\n');
      lines.forEach((line)=>{
        var path = line.substring(0, line.indexOf(':'));
        if(this.validAction ? this.validAction(path) : this.valid(path)) {
          this.resultAction(new FilePath(path));
        }
      });
    });
  }

  valid(path: string): boolean {
    if(path.length <= 0) return false;
    if(path.indexOf('.ts') == -1) return false;
    return path.indexOf('/tools/') == -1;
  }
}
