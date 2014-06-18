/// <reference path="../makimaki/Fragment.ts" />
class Page2Fragment extends Fragment {
    getHtml(): string { return '戻ると san がつきます。'; }
    onStart() {
        console.log("onstart", this.data.query);
        this.setResult(true, {text: this.data.query.text + " san"});
    }
}