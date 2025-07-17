const feedItem = require("../model/feedItem");

let feedItem1 = feedItem.newFeedItem("Painting", "This will show step by step instructions on how to recreate some paintings!", "https://stepbysteppainting.net/2025/05/21/how-to-paint-cathedral-rock-sedona-acrylic-tutorial/", "./images/painting.jpg");
let feedItem2 = feedItem.newFeedItem("Drawing", "This will show how to start sketching.", "https://juliabausenhardt.com/how-to-draw-anything-learn-sketching-for-beginners/", "./images/drawing.jpg");
let feedItem3 = feedItem.newFeedItem("Origami", "This will show various instructions for different origami patterns.", "https://origami.me/easy-origami/", "./images/origami.jpg");

const allFeedItems = [feedItem1, feedItem2, feedItem3];

//Get
exports.getAllFeedItems = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(allFeedItems);
};

//Post
exports.saveFeedItemHandler = (req, res) => {
    let newItem = feedItem.newFeedItem(req.body.title, req.body.body, req.body.linkUrl, req.body.imageUrl);
    allFeedItems.push(newItem);
    res.setHeader("Content-Type", "application/json");
    res.send(newItem);
    res.send(JSON.stringify(allFeedItems))
};

//Get

exports.getFeedItem = (req, res) => {
    const id = parseInt(req.params.feedItemId);

    // Check if id is valid index
    if (isNaN(id) ||id < 0 || id >= allFeedItems.length) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({ error: "Feed item not found" }));
        return;
    }

    const item = allFeedItems[id];

    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(item));
};


//Delete
exports.deleteFeedItem = (req, res) => {
    const id = parseInt(req.params.feedItemId);

    if (isNaN(id) ||id < 0 || id >= allFeedItems.length) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({ error: "Feed item not found" }));
        return;
    }

    const deleted = allFeedItems.splice(id, 1)[0];
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: "Feed item deleted", deleted }));
};

//Patch
exports.updateFeedItem = (req, res) => {
    const id = parseInt(req.params.feedItemId);

    if (isNaN(id) ||id < 0 || id >= allFeedItems.length) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({ error: "Feed item not found" }));
        return;
    }

    const item = allFeedItems[id];

    if (req.body.title) item.title = req.body.title;
    if (req.body.body) item.body = req.body.body;
    if (req.body.linkUrl) item.linkUrl = req.body.linkUrl;
    if (req.body.imageUrl) item.imageUrl = req.body.imageUrl;

    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(item));
};

