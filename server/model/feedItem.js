function FeedItem(title, body, linkUrl, imageUrl) {
    this.title = title;
    this.body = body;
    this.linkUrl = linkUrl;
    this.imageUrl = imageUrl;
}


const newFeedItem = (title, body, linkUrl, imageUrl) => {
    return new FeedItem(title, body, linkUrl, imageUrl);
};


module.exports = {
    FeedItem,
    newFeedItem
}
