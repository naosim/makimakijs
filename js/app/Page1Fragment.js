var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../makimaki/Fragment.ts" />
var Page1Fragment = (function (_super) {
    __extends(Page1Fragment, _super);
    function Page1Fragment() {
        _super.apply(this, arguments);
    }
    Page1Fragment.prototype.getHtml = function () {
        return 'page1';
    };
    return Page1Fragment;
})(Fragment);
