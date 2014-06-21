class FilePath {
  file: string;
  constructor(file1: string, file2?: string) {
    this.file = file2 ? this.concat(file1, file2) : file1;
  }

  private concat(file1: string, file2: string) {
    var lastIs = (char: string, text: string) => text.charAt(text.length - 1) === char;
    if(!lastIs('/', file1) && !lastIs('/', file2)) {
      return file1 + '/' + file2;
    } else if(lastIs('/', file1) && lastIs('/', file2)) {
      return file1.substring(0, file1.length - 1) + file2;
    } else {
      return file1 + file2;
    }
  }
  name() {
    return this.file.substring(this.file.lastIndexOf('/') + 1, this.file.length);
  }
  path() {
    return this.file.substring(0, this.file.lastIndexOf('/'));
  }
  absolute() {
    return this.file;
  }
}
