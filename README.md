React + Express 簡易メッセージ投稿アプリ

起動手順

1.サーバー起動
cd server
npm install
npm start

2.クライアント起動
cd client
npm install
npm start

3.アクセス
http://localhost:3000 にアクセス
メッセージを入力して「送信」
下に投稿一覧が表示される

各ファイルの役割
client
package.json :Reactアプリの依存ライブラリ・起動コマンド・設定などを定義

src/App.js :アプリの「本体」。フォームと投稿一覧を表示し、APIとやり取りする

src/index.js　:Reactのエントリーポイント。App.js を画面に描画する

proxy（package.json内）:ReactからNode/ExpressにAPIリクエストを送るための「転送設定」

server
index.js :サーバー本体。APIルート(/api/messages)を作成し、データを保存・取得

package.json :ExpressやCORSなど必要なライブラリ、起動方法などを記述
