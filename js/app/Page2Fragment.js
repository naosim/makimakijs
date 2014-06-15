var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../makimaki/Fragment.ts" />
var Page2Fragment = (function (_super) {
    __extends(Page2Fragment, _super);
    function Page2Fragment() {
        _super.apply(this, arguments);
    }
    Page2Fragment.prototype.getHtml = function () {
        return 'page2';
    };
    return Page2Fragment;
})(Fragment);
