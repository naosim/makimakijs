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

class FragmentHistory {
    history: {id: FragmentId; fragment: Fragment}[];
    constructor(){ this.history = [] }
    current(): {id: FragmentId; fragment: Fragment} {
        return this.history.length > 0 ? this.history[this.history.length - 1] : null;
    }
    push(e: {id: FragmentId; fragment: Fragment}) {
        this.history.push(e);
    }
    pop(): {id: FragmentId; fragment: Fragment} {
        return this.history.pop();
    }
}

class FragmentsController {
    fragmentHistory = new FragmentHistory();
    $container: any;
    constructor($container: any) {
        this.$container = $container;
    }
    stopLastFragment() {
        var current = this.fragmentHistory.current();
        if(!current) return;

        current.fragment.onStop();
        $(current.id.cssId).css('display', 'none');
    }

    pop() {
        this.stopLastFragment();

        var current = this.fragmentHistory.current();
        var fragment = current.fragment;
        fragment.destroy();
        var result = fragment.result;
        $(current.id.cssId).remove();
        this.fragmentHistory.pop();

        $(this.fragmentHistory.current().id.cssId).css('display', 'block');
        this.fragmentHistory.current().fragment.onStart();
        this.fragmentHistory.current().fragment.onResult(result);
    }

    push(fragmentClass: typeof Fragment, query:any) {
        this.stopLastFragment();

        var id = FragmentId.create();
        var html = '<li id="' + id.htmlId + '"></li>';
        $(RouterFragment.routerId.cssId).append(html);

        var parent = this.fragmentHistory.current() ? this.fragmentHistory.current().fragment : null;
        var current = new fragmentClass();
        this.fragmentHistory.push({id: id, fragment: current});
        $(id.cssId).css('display', 'block');
        current.init({$container:$(id.cssId), query: query}, parent);
        current.onStart();
    }

    current(): Fragment {
        var current = this.fragmentHistory.current();
        return current ? current.fragment : null;
    }
}

class RouterFragment extends Fragment {
    router = new Router();
    fragmentsController: FragmentsController;
    static routerId = FragmentId.create('router_list');
    constructor(){
        super();
    }

    init(data: {$container: any; query?:any}, parent?: Fragment) {
        super.init(data, parent);
        this.fragmentsController = new FragmentsController(data.$container);
    }

    getHtml(): string { return '<ul id="' + RouterFragment.routerId.htmlId + '"></ul>'; }

    setManifest(ary: {url:string; fragmentClass:typeof Fragment; isFirst?: boolean}[]){
        var firstLocation;

        var action = (manifest: {url:string; fragmentClass:typeof Fragment; isFirst?: boolean}) => {
            var routingAction = (req:{query: any;}, next: any)=>{
                var isBack = () => {
                    var fragment = this.fragmentsController.current();
                    return fragment && fragment.parent instanceof manifest.fragmentClass;
                };
                isBack() ? this.fragmentsController.pop() : this.fragmentsController.push(manifest.fragmentClass, req.query);
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
}
