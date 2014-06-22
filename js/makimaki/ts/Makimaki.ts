/// <reference path="RouterFragment.ts" />
/// <reference path="jquery.d.ts" />
module makimaki {
  export var setManifest = (rootCssId: string, ary: {url:string; fragmentClass:typeof Fragment; isFirst?: boolean}[]) => {
      var routerFragment = new RouterFragment();
      routerFragment.init({$container: $(rootCssId)});
      routerFragment.setManifest(ary);
  };
}
