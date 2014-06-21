/// <reference path="../makimaki/Fragment.ts" />
class Page2Fragment extends Fragment {
    getHtml(): string {
      var html = '';
      //LAYOUTIMPORT START {"layout": "page2.html", "variableName":"html"}
      html += '        戻ると san がつきます。';

      //LAYOUTIMPORT END
       return html;
    }
    onStart() {
        console.log("onstart", this.data.query);
        this.setResult(true, {text: this.data.query.text + " san"});
    }
}