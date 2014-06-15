/// <reference path="../makimaki/Fragment.ts" />
/// <reference path="../jquery/jquery.d.ts" />
class Page1Fragment extends Fragment {
    text = 'hoge';
    getHtml(): string { return '<div id="page1fragment_text"></div> <a id="page1fragment_link">[jump to page2]</a>'; }
    onStart() {
        super.onStart();
        $('#page1fragment_text').html(this.text);
        var clickAction = () => {
            location.href='#/page2?text=' + this.text;
        };
        $('#page1fragment_link').click(clickAction);
        
    }
}