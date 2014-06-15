/// <reference path="../makimaki/Fragment.ts" />
/// <reference path="../jquery/jquery.d.ts" />
class Page1Fragment extends Fragment {
    text = 'taro';
    getHtml(): string { return '<div id="page1fragment_text"></div> <a id="page1fragment_link">["san"を付ける画面にジャンプ]</a>'; }
    onStart() {
        super.onStart();
        this.setText(this.text);
        var clickAction = () => {
            location.href='#/page2?text=' + this.text + '&requestId=' + 3;
        };
        $('#page1fragment_link').click(clickAction);
    }

    onResult(result: Result) {
        super.onResult(result);
        console.log(result);
        if(result.result) this.setText(result.data.text);
    }

    setText(text: string) {
        this.text = text;
        $('#page1fragment_text').html('your name is ' + this.text);
    }
}