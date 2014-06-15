declare class Router {
    addRoute(url:string, action:(req:any, next:any) => void): void;
    _onHashChange(e?:any);
}