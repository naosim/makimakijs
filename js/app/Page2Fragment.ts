/// <reference path="../makimaki/Fragment.ts" />
class Page2Fragment extends Fragment {
    getHtml(): string { return 'page2'; }
    onStart() {
        console.log("onstart", this.data.query);
    }
}