/// <reference path="jquery.d.ts" />
class Fragment {
    "use strict";
    $container: JQuery;
    parent: Fragment;
    constructor() {
        
    }

    init($container: JQuery, parent?: Fragment) {
        this.$container = $container;
        this.$container.html(this.getHtml());
        this.parent = parent;
    }
    
    getHtml(): string { return ''; }
    onStart(){}
    onStop(){}
    destroy(){}
    onFragmentResult(){}
    setResult(obj: any){}
}

interface FragmentManifest {
    url: string;
    fragmentClass: Function;
}