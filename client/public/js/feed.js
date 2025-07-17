window.addEventListener("load", () => {
  const portal = document.getElementById("portal_button");
  if (portal) {
    portal.addEventListener("click", () => {
      window.location.href = "https://www.michaels.com/";
    });
  }

  //function feedsItem(title, body, linkUrl, imageUrl) {
  //this.title = title;
  //this.body = body;
  //this.linkUrl = linkUrl;
  //this.imageUrl = imageUrl;
  //}

  //const currentStories = [
  //new FeedsItem("Painting", "This will show step by step instructions on how to recreate some paintings!", "https://stepbysteppainting.net/2025/05/21/how-to-paint-cathedral-rock-sedona-acrylic-tutorial/", "./images/painting.jpg"),
  //new FeedsItem("Drawing", "This will show how to start sketching.", "https://juliabausenhardt.com/how-to-draw-anything-learn-sketching-for-beginners/", "./images/drawing.jpg"),
  //new FeedsItem("Origami", "This will show various instructions for different origami patterns.", "https://origami.me/easy-origami/", "./images/origami.jpg")
  //];

  function createFeedItemHTML(feedsItem, index) {
    return `
    <div class="feed-item">
      <h3><a href="${feedsItem.linkUrl}" target="_blank">${feedsItem.title}</a></h3>
      <img src="${feedsItem.imageUrl}" alt="${feedsItem.title}">
      <p>${feedsItem.body}</p>
      <button class="delete-button" onclick="deleteFeedItem(${index})">Delete</button>
    </div>
  `;
  }


  //function displayItem(feedsItem) {
    //const newsfeedsElement = document.getElementById("newsfeed");
    //if (newsfeedsElement) {
      //newsfeedsElement.innerHTML += createFeedItemHTML(feedsItem);
    //}
  //}


  function getCurrentFeed() {
    fetch("/api/feedItem")
      .then(res => res.json())
      .then(data => {
        const newsfeedsElement = document.getElementById("newsfeed");
        if (newsfeedsElement) {
          newsfeedsElement.innerHTML = "";
          data.forEach((feedsItem, index) => {
            newsfeedsElement.innerHTML += createFeedItemHTML(feedsItem, index);
          });
        }
      })
  }
  getCurrentFeed();


  window.deleteFeedItem = function (index) {
    fetch("/api/feedItem/" + index, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        getCurrentFeed();
      })
      .catch(error => {
        console.error('Error deleting feed item:', error);
      });
  };

const addButton = document.getElementById("add-button");

  if (addButton) {
    addButton.addEventListener("click", () => {
      const title = document.getElementById("title").value.trim();
      const body = document.getElementById("body").value.trim();
      const linkUrl = document.getElementById("linkUrl").value.trim();
      const imageUrl = document.getElementById("imageUrl").value.trim();


      const newFeedItem = { title, body, linkUrl, imageUrl };

      fetch("/api/feedItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newFeedItem)
      })
        .then(res => res.json())
        .then(data => {
          console.log("Added:", data);

          document.getElementById("title").value = "";
          document.getElementById("body").value = "";
          document.getElementById("linkUrl").value = "";
          document.getElementById("imageUrl").value = "";

          getCurrentFeed();
        })
        .catch(err => {
          console.error("Error adding feed item:", err);
        });
    });
  }

});
