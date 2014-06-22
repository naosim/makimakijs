makimakijs
==========

いろいろ使ってシングルページWebアプリケーションをつくる

# 背景
会社で「え？それ毎回て入力するの？」て作業がゴロゴロしている。  
無駄ですよね。。

# 願い
そんな作業をWebアプリ化して効率化したい！  
サクっとWebアプリが作れるようなライブラリがほしい！  
ついでに最近のjavascriptについて勉強したい  

# コンセプト
- 今風作り方をする
  - シングルページWebアプリケーション
  - サーバがなくてもMock化してうごく
  - strictでつくる
  - vue.js, router.js, jquery, taffyDB

# makimaki.jsのビルド
コードはtypescriptで書かれているため、buildが必要です。  
下記を実行してください。  
`npm install`  
`node makimakibuild.js`

# layoutデータ(html)の挿入方法
このフレームワークでは  
HTMLはFragment#getHtml()をオーバーライドして記述します。  
この作業を手入力でやるのは面倒です。  
そこでlayoutディレクトリ内で作成したhtmlファイルのbodyタグ内をgetHtml()に挿入するスクリプトを使います。
## 使い方
- 挿入するHTMLをlayout配下に作成する  
ex) [page1.html](https://github.com/naosim/makimakijs/blob/master/layout/page1.html)
- 挿入したい場所に下記のようなスクリプトを埋め込む  
`//LAYOUTIMPORT START {"layout": "page1.html", "variableName": "html"}`  
`//LAYOUTIMPORT END`  
ex)[Page1Fragment.ts](https://github.com/naosim/makimakijs/blob/master/js/app/Page1Fragment.ts)
- 挿入処理を実行する  
`node ./tools/replacelayout.js`
- 結果
LAYOUTIMPORT STARTとENDで囲まれた部分に、指定したHTMLのbodyタグ内が挿入されます。  
bodyタグ内は、variableNameで指定した変数に加えられます。  

## 補足
- variableNameの変数がundefinedの場合、うまく動かないので`var html = "";`などしてstringで初期化してください。
- 挿入する対象は、デフォルトだと.tsファイルになっています。jsファイルに挿入したい場合はreplacelayout.jsの修正が必要です。  
  - tools/replacelayout.jsを開く
  - `greper.setValidAction(... `をさがす
  - 次のように修正する  
    - `if (path.indexOf('.ts') == -1)` を `if (path.indexOf('.js') == -1)`に修正する
  - js以外のファイルを対象にする場合も同様の修正をする
