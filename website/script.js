let index = 0;
const batchSize = 10;

// Wait until tweets.js is loaded
function loadTweetsData() {
  if (typeof tweets === "undefined" || tweets.length === 0) {
    setTimeout(loadTweetsData, 500); // Retry after 500ms if tweets.js isn't loaded yet
    return;
  }
  loadTweets(); // Start loading tweets once tweets.js is ready
}

// Function to load tweets dynamically
function loadTweets() {
  if (index >= tweets.length) return;

  let container = document.getElementById("tweet-container");

  for (let i = index; i < index + batchSize && i < tweets.length; i++) {
    let blockquote = document.createElement("blockquote");
    blockquote.className = "twitter-tweet";
    let link = document.createElement("a");
    link.href = tweets[i];
    blockquote.appendChild(link);
    container.appendChild(blockquote);
  }

  // Load Twitter embed script
  let script = document.createElement("script");
  script.src = "https://platform.twitter.com/widgets.js";
  script.async = true;
  document.body.appendChild(script);

  index += batchSize;
}

// Load tweets on scroll
window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    loadTweets();
  }
});

// Start loading tweets
loadTweetsData();
