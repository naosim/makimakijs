/// <reference path="../jquery/jquery.d.ts" />

class Result {
    requestId: number;
    result = false;
    data: any;
    constructor(query: {requestId?: number}) {
        this.requestId = (query && query.requestId) ? query.requestId : -1;
    }
}

class Fragment {
    "use strict";
    data: {$container: any; query?:any};
    parent: Fragment;
    result: Result;
    constructor() {
        
    }

    init(data: {$container: any; query?:any}, parent?: Fragment) {
        this.data = data;
        this.data.$container.html(this.getHtml());
        this.parent = parent;
        this.result = new Result(this.data.query);
    }
    
    getHtml(): string { return ''; }
    onStart(){}
    onStop(){}
    destroy(){}
    onResult(result: Result){}
    setResult(result: boolean, data: any){
        this.result.result = result;
        this.result.data = data;
    }
}

interface FragmentManifest {
    url: string;
    fragmentClass: Function;
}