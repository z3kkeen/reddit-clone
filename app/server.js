const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const data = [];

app.get('/', (req, res) => {
  res.json("hello world");
});

app.get('/posts', (req, res) => {
  res.json(data);
});

app.patch('/posts/:id/upvote', (req, res) => {
  const postId = Number(req.params.id);
  const post = data.find(post => post.id === postId);
  post.votes += 1;
  res.json();
});

app.patch('/posts/:id/downvote', (req, res) => {
  const postId = Number(req.params.id);
  const post = data.find(post => post.id === postId);
  post.votes -= 1;
  res.json();
});

app.post('/posts', (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "Title and URL are required." });
  }

  const newPost = {
    id: data.length + 1,
    title,
    url,
    votes: 0,
  };

  data.push(newPost);
  res.status(201).json(newPost);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
