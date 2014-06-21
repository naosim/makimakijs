class Util {
  static clip(text: string, start: string, end: string): string {
    var str = text;
    str = str.substring(str.indexOf(start), str.length);
    str = str.substring(0, str.indexOf(end) + 1);
    return str;
  }
}
