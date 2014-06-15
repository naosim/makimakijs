/// <reference path="RouterFragment.ts" />
/// <reference path="../jquery/jquery.d.ts" />

(function(){
    var importFiles = [
        "Fragment.js",
        "RouterFragment.js"
    ];
    
    importFiles.forEach((importFile: string)=> {
        document.write('<script type="text/javascript" src="js/makimaki/' + importFile + '"></script>');
    });
})();

var makimaki :any = {};
makimaki.setManifest = (rootCssId: string, ary: {url:string; fragmentClass:typeof Fragment; isFirst?: boolean}[]) => {
    var routerFragment = new RouterFragment();
    routerFragment.init({$container: $(rootCssId)});
    routerFragment.setManifest(ary);
};