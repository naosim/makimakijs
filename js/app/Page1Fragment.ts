/// <reference path="../makimaki/Fragment.ts" />
class Page1Fragment extends Fragment {
    getHtml(): string { return 'page1 <a href="#/page2">jump to page2</a>'; }
}