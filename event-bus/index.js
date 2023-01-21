const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const PORT = 4005;
const events = [];
app.post('/events', function(req,res) {
    const event = req.body;
    events.push(event);
    try{
    axios.post("http://posts-clusterip-srv:4000/events", event).catch(()=>{});
    axios.post("http://comments-srv:4001/events", event).catch(()=>{});
    axios.post("http://query-srv:4002/events", event).catch(()=>{});
    axios.post("http://moderation-srv:4003/events", event).catch(()=>{});
    }catch(err){}
    res.send({status:"OK"});
});

app.get('/events', function(req,res) {
    res.send(events);
});

app.listen(PORT, function() {
    console.log(`Server is running at http://localhost:${PORT}`);
})