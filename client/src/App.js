import React,{ useState, useEffect } from "react"; 
// Reactを使うために必要な記述。useStateとuseEffectはReactの便利な機能（フック）を使うために読み込んでいる。

//Reactの「アプリ本体」を定義する関数。この中にUIやロジックを書く。
function App() {
    const [message, setMessage] = useState(''); //入力中のテキストを保存する変数。初期値は空文字（''）。
    const [messages, setMessages] = useState([]);  //サーバーから取得した全メッセージを入れる配列。初期値は空の配列（[]）。

    // useEffect: 初回読み込み時にサーバーからデータを受け取る
    useEffect(() => { //ページ読み込み時に一度だけ実行する処理を定義する（副作用処理）
        fetch('/api/messages') //サーバー（Express）の /api/messages へGETリクエストを送る
        .then(res => res.json()) //サーバーからの応答をJSON形式に変換
        .then(data => setMessages(data)); //変換したデータを messages に保存（画面に表示される）
    }, []); //サーバーから取得した全メッセージを入れる配列。初期値は空の配列（[]）。

    // handleSubmit:送信ボタンが押されたときの処理
    const handleSubmit = (e) => { //送信ボタンが押されたときの関数を定義
        e.preventDefault(); //フォームの「ページ更新」を止める（Reactでは手動で処理）
        fetch('/api/messages', { //ExpressにPOSTリクエストを送る 
            method: 'POST',      //メソッドや送信データの形式（JSON）を指定している
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content:message }) //入力された文字をJSONとして送る
        })
        .then(res => res.json()) //サーバーの返事を受け取り、messages に追加し、入力欄をリセット
        .then(data => {
            setMessages([...messages, data]);
            setMessage('');
        });
    };

    return (
        <div>
          <h1>メッセージ投稿</h1>
          <form onSubmit={handleSubmit}>
            <input //ユーザーが入力するテキスト欄。valueとonChangeで入力を管理
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">送信</button>
          </form>
    
          <ul>
          {/* messagesの中身を1つずつ取り出して画面に表示（繰り返し処理） */}
            {messages.map((msg, index) => (
              <li key={index}>{msg.content}
              </li>
            ))}
          </ul>
        </div>
      );
}

export default App;
// このコンポーネントを他で使えるようにする（index.jsが使ってる)