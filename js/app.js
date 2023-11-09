// Select the form and the list of tweets from the DOM
const form = document.querySelector('#form');
const listTweets = document.querySelector('#list-tweets');
// Initialize an array to store tweets
let tweets = [];

// Add the necessary event listeners
eventListeners();

function eventListeners() {
	// Listen for the submit event of the form to add a new tweet
	form.addEventListener('submit', addTweet);

	// Listen for the DOMContentLoaded event to load locally stored tweets when the page loads
	document.addEventListener('DOMContentLoaded', () => {
		// Get locally stored tweets or initialize an empty array if none
		tweets = JSON.parse(localStorage.getItem('tweets')) || [];
		// Generate the HTML for the stored tweets
		generateHtml();
	});
}

// Function to add a new tweet
function addTweet(event) {
	event.preventDefault();

	// Get the tweet text from the input
	const tweet = document.querySelector('#tweet').value;

	// Check if the tweet is empty and show an error message if so
	if (tweet.trim() === '') {
		showError('You must write something');
		return;
	}

	// Create a tweet object with a unique ID and the tweet content
	const tweetObj = {
		id: Math.random().toString(36).substring(2, 10),
		tweet,
	};

	// Add the new tweet to the array of tweets
	tweets = [...tweets, tweetObj];

	// Generate the updated HTML for the list of tweets
	generateHtml();

	// Reset the form
	form.reset();
}

// Function to show an error message
function showError(error) {
	// Create a paragraph element with the error message
	const errorMessage = document.createElement('P');
	errorMessage.textContent = error;
	errorMessage.classList.add('error');

	// Insert the error message after the tweet input
	const tweet = document.querySelector('#tweet');
	tweet.insertAdjacentElement('afterend', errorMessage);

	// Remove the error message after 3 seconds
	setTimeout(() => {
		errorMessage.remove();
	}, 3000);
}

// Function to generate the HTML for the list of tweets
function generateHtml() {
	// Clear the existing HTML of the list of tweets
	cleanHtml();

	// Check if there are tweets to display
	if (tweets.length > 0) {
		// Iterate over each tweet and create HTML elements to display them in the list
		tweets.forEach(tweet => {
			// Create a button to delete the tweet
			const btnDelete = document.createElement('A');
			btnDelete.classList.add('delete-tweet');
			btnDelete.textContent = 'X';
			// Assign the deleteTweet function to the button's click event
			btnDelete.onclick = () => {
				deleteTweet(tweet.id);
			};

			// Create a list item (LI) element for the tweet
			const li = document.createElement('LI');
			li.textContent = tweet.tweet;

			// Add the delete button to the list item
			li.appendChild(btnDelete);
			// Add the list item to the list of tweets in the DOM
			listTweets.appendChild(li);
		});
	}

	// Sync the array of tweets with local storage
	syncstorage();
}

// Function to store tweets in local storage
function syncstorage() {
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Function to delete a tweet by its ID
function deleteTweet(id) {
	// Filter tweets to exclude the tweet with the provided ID
	tweets = tweets.filter(tweet => tweet.id !== id);
	// Generate the updated HTML for the list of tweets
	generateHtml();
}

// Function to clean the HTML of the list of tweets
function cleanHtml() {
	// Remove all child elements of the list of tweets
	while (listTweets.firstChild) {
		listTweets.removeChild(listTweets.firstChild);
	}
}
