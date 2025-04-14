// Function to fetch and display a quote
function getDailyQuote() {
    fetch('data/quotes.json')
      .then(response => response.json())
      .then(quotes => {
        const today = new Date();
        const index = today.getDate() % quotes.length;  // Get a new quote each day
        const quote = quotes[index];
  
        document.getElementById('quote-text').textContent = `"${quote.quote}"`;
        document.getElementById('quote-author').textContent = `- ${quote.author}`;
      })
      .catch(error => console.error('Error fetching the quotes:', error));
  }
  
  // Initialize the daily quote
  getDailyQuote();
  