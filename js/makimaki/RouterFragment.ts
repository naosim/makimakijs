/// <reference path="Fragment.ts" />
/// <reference path="Router.d.ts" />
/// <reference path="jquery.d.ts" />
class FragmentId {
    htmlId: string;
    cssId: string;
    static create(id?:string):FragmentId {
        var result = new FragmentId();
        result.htmlId = id ? id : 'router_row_' + new Date().getTime();
        result.cssId = '#' + result.htmlId;
        return result;
    }
}

class RouterFragment extends Fragment {
    current: Fragment;
    currentId: FragmentId;
    router: Router;
    static routerId = FragmentId.create('router_list');
    constructor(){
        super();
        this.router = new Router();
    }

    init($container: JQuery, parent?: Fragment) {
        super.init($container, parent);
    }
    getHtml(): string { return '<ul id="' + RouterFragment.routerId.htmlId + '"></ul>'; }
    setManifest(ary: {url:string; fragmentClass:typeof Fragment; isFirst?: boolean}[]){
        var firstLocation;
                
        var action = (manifest: {url:string; fragmentClass:typeof Fragment; isFirst?: boolean}) => {            
            var isBack = () => {
                return this.current && this.current.parent instanceof manifest.fragmentClass;
            };
            
            var routingAction = (req:any, next: any)=>{
                if(this.current) this.current.onStop();
                isBack() ? this.showBackPage() : this.showNewPage(manifest.fragmentClass);
            };
            
            this.router.addRoute(manifest.url, routingAction);
            if(manifest.isFirst) firstLocation = manifest.url;
        };
        
        ary.forEach(action);
        if(location.href.indexOf('#') == -1) {
            // ルートで来た ex)index.html
            location.href = firstLocation;
        } else {
            // 直接きた ex) index.html#page2
            this.router._onHashChange();
        }
    }
    
    showBackPage() {
        console.log("back: " + this.currentId);
        this.current.destroy();
        $(this.currentId.cssId).remove();
        this.current = this.current.parent;
        this.current.onStart();
    }

    showNewPage(fragmentClass: typeof Fragment) {
        // new
        var id = FragmentId.create();
        console.log("new: " + id.htmlId);
        var html = '<li id="' + id.htmlId + '"></li>';
        $(RouterFragment.routerId.cssId).append(html);

        var parent = this.current;
        this.current = new fragmentClass();
        this.current.init($(id.cssId), parent);
        this.currentId = id;
        this.current.onStart();
    }
}