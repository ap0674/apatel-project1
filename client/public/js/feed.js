window.addEventListener("load", () => {
  const portal = document.getElementById("portal_button");
  if (portal) {
    portal.addEventListener("click", () => {
      window.location.href = "https://www.michaels.com/";
    });
  }

  function FeedItem(title, body, linkUrl, imageUrl) {
    this.title = title;
    this.body = body;
    this.linkUrl = linkUrl;
    this.imageUrl = imageUrl;
  }

  const currentStories = [
    new FeedItem("Painting", "This will show step by step instructions on how to recreate some paintings!", "https://stepbysteppainting.net/2025/05/21/how-to-paint-cathedral-rock-sedona-acrylic-tutorial/", "./images/painting.jpg"),
    new FeedItem("Drawing", "This will show how to start sketching.", "https://juliabausenhardt.com/how-to-draw-anything-learn-sketching-for-beginners/", "./images/drawing.jpg"),
    new FeedItem("Origami", "This will show various instructions for different origami patterns.", "https://origami.me/easy-origami/", "./images/origami.jpg")
  ];

  function createFeedItemHTML(feedItem) {
    return `
      <div class="feed-item">
        <h3><a href="${feedItem.linkUrl}" target="_blank">${feedItem.title}</a></h3>
        <img src="${feedItem.imageUrl}" alt="${feedItem.title}">
        <p>${feedItem.body}</p>
      </div>
    `;
  }

function displayItem(feedItem) {
  const newsfeedElement = document.getElementById("newsfeed");
  if (newsfeedElement) {
    newsfeedElement.innerHTML += createFeedItemHTML(feedItem);
  }
}

  currentStories.forEach(displayItem);

});



