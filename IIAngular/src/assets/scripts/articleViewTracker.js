// articleViewTracker.js


let viewTimer = null;
let viewCount = 0;

function startViewTracking() {
  const articleLink = document.getElementById('articleLink');
  const articleId = articleLink.dataset.articleId;
  // Start the view timer when the article page is loaded
  viewTimer = setInterval(() => {
    viewCount += 1;

    // After 30 seconds, send a request to the backend
    if (viewCount % 10 === 0) {
      incrementViewCount(articleId);
    }

    // Stop the timer after 30 seconds
    if (viewCount >= 10) {
      stopViewTracking();
    }
  }, 1000); // 1000 milliseconds = 1 second
}

function stopViewTracking() {
  // Clear the view timer when the user navigates away from the page
  clearInterval(viewTimer);
  viewTimer = null;
  viewCount = 0;
}

function incrementViewCount(articleId) {
  // Send a request to the backend to increment the view count
  fetch(`http://localhost:3000/api/articles/${articleId}/views`, {
    method: 'POST',
  });
}


// Call startViewTracking when the article page is loaded
// Replace 'articleId' with the actual ID of the article
startViewTracking('_id');

// Call stopViewTracking when the user navigates away from the page
window.addEventListener('beforeunload', stopViewTracking);
