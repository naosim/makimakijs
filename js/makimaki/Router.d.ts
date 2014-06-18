declare class Router {
    addRoute(url:string, action:(req:{query: any;}, next:any) => void): void;
    _onHashChange(e?:any);
}