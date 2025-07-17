const express = require('express')
const app = express();
app.use(express.static('client/public'));

const bodyParser = require("body-parser");
app.use(bodyParser.json({ type: "application/json" }));

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: './client/views' })
})

app.get('/feed', function (req, res) {
    res.sendFile('feed.html', { root: './client/views' })
})


let feedController = require("./controller/feedController");


app.route("/api/feedItem")
    .get(feedController.getAllFeedItems)
    .post(feedController.saveFeedItemHandler)

app.route("/api/feedItem/:feedItemId")
    .get(feedController.getFeedItem)
    .delete(feedController.deleteFeedItem)
    .patch(feedController.updateFeedItem)


app.listen(1337, () => console.log('Listening on port 1337.'))