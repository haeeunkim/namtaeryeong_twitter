// embedTweets.js
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('tweet-container');
    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tweetBlock = entry.target;
                const id = tweetBlock.getAttribute('data-tweet-id');

                // Dynamically add the tweet embed code
                const tweetLink = document.createElement('a');
                tweetLink.href = `https://twitter.com/user/status/${id}`;
                tweetBlock.appendChild(tweetLink);

                // Tell Twitter to render the tweet
                twttr.widgets.load(tweetBlock);

                // Unobserve the entry
                observer.unobserve(tweetBlock);
            }
        });
    }, {
        rootMargin: '100px', // Load tweets when they are within 100px of the viewport
        threshold: 0.1
    });

    // Create placeholders for each tweet and observe them
    tweetIDs.forEach(id => {
        const tweetBlock = document.createElement('blockquote');
        tweetBlock.className = 'twitter-tweet';
        tweetBlock.setAttribute('data-tweet-id', id);
        tweetBlock.setAttribute('data-lang', 'en');
        tweetBlock.setAttribute('data-theme', 'light'); // You can change this to 'dark' if preferred
        container.appendChild(tweetBlock);

        // Start observing each tweet placeholder
        observer.observe(tweetBlock);
    });
});
