const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
const PORT = 4002;
app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.get('/posts', (req, res) => {
    res.send(posts);
})

const handleEvents = (type, data) => {
    if(type === 'PostCreated'){
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    }

    if(type === 'CommentCreated'){
        const {id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({id,content, status});
    }

    if(type === "CommentUpdated"){
        const {id, content, postId, status} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);
        comment.content = content;
        comment.status = status;
    }
}

app.post('/events', (req, res) => {
    const {type, data} = req.body;
    handleEvents(type, data);
    res.send({});
})

app.listen(PORT, async () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    const res = await axios.get(`http://event-bus-srv:4005/events`);
    for(let event of res.data){
        handleEvents(event.type, event.data);
    }
})