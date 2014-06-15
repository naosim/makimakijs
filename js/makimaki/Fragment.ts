/// <reference path="../jquery/jquery.d.ts" />

class Fragment {
    "use strict";
    data: {$container: any; query?:any};
    parent: Fragment;
    constructor() {
        
    }

    init(data: {$container: any; query:any}, parent?: Fragment) {
        this.data = data;
        this.data.$container.html(this.getHtml());
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