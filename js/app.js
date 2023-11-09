const form = document.querySelector('#form');
const listTweets = document.querySelector('#list-tweets');
let tweets = [];

eventListeners();

function eventListeners() {
    form.addEventListener('submit', addTweet);
    
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        generateHtml();
    });
}

function addTweet(event) {
	event.preventDefault();

	const tweet = document.querySelector('#tweet').value;

	if (tweet.trim() === '') {
		showError('You must write something');
		return;
	}

	const tweetObj = {
		id: Math.random().toString(36).substring(2, 10),
		tweet
	};

	tweets = [...tweets, tweetObj];

    generateHtml();
    
    form.reset();
}

function showError(error) {
	const errorMessage = document.createElement('P');
	errorMessage.textContent = error;
    errorMessage.classList.add('error');
    
    const tweet = document.querySelector('#tweet');
	tweet.insertAdjacentElement('afterend', errorMessage);

	setTimeout(() => {
		errorMessage.remove();
	}, 3000);
}

function generateHtml() {
	cleanHtml();

	if (tweets.length > 0) {
		tweets.forEach(tweet => {
			const li = document.createElement('LI');
			li.textContent = tweet.tweet;
			listTweets.appendChild(li);
		});
    }
    
    syncstorage();
}

function syncstorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function cleanHtml() {
	while (listTweets.firstChild) {
		listTweets.removeChild(listTweets.firstChild);
	}
}
