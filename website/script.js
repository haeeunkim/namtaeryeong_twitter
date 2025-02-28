let index = 0;
const batchSize = 10; // Number of tweets to load at a time

// Wait for tweets.js to load first
function loadTweetsData() {
  let script = document.createElement("script");
  script.src = "tweets.js";
  script.onload = () => {
    if (typeof tweets !== "undefined" && tweets.length > 0) {
      loadTweets(); // Load first batch once tweets are available
    } else {
      console.error("Tweets array is not loaded or empty.");
    }
  };
  document.body.appendChild(script);
}

// Function to load tweets in batches
function loadTweets() {
  let container = document.getElementById("tweet-container");

  if (index >= tweets.length) return; // Stop if all tweets are loaded

  for (let i = index; i < index + batchSize && i < tweets.length; i++) {
    let blockquote = document.createElement("blockquote");
    blockquote.className = "twitter-tweet";
    let link = document.createElement("a");
    link.href = tweets[i];
    blockquote.appendChild(link);
    container.appendChild(blockquote);
  }

  // Reload Twitter widgets to render new tweets
  let script = document.createElement("script");
  script.src = "https://platform.twitter.com/widgets.js";
  script.async = true;
  document.body.appendChild(script);

  index += batchSize;
}

// Detect scroll to bottom & load more tweets
window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadTweets();
  }
});

// Start loading tweets
loadTweetsData();
