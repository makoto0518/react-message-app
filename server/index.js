const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// ミドルウェア
app.use(cors());
app.use(express.json());

// メモリ上にメッセージを保存
const messages = [];

// POST: メッセージを受け取って保存
app.post('/api/messages', (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'contentは必須です' });
  }
  const newMessage = { id: messages.length + 1, content };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

// GET: メッセージ一覧取得
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
