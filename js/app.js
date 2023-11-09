const form = document.querySelector('#form');
const listTweets = document.querySelector('#list-tweets');
const tweet = document.querySelector('#tweet');
let tweets = [];

eventListeners();

function eventListeners() {
	form.addEventListener('submit', addTweet);
}

function addTweet(event) {
	event.preventDefault();

	if (tweet.value.trim() === '') {
		showError('You must write something');
		return;
	}
}

function showError(error) {
	const errorMessage = document.createElement('P');
	errorMessage.textContent = error;
	errorMessage.classList.add('error');
    tweet.insertAdjacentElement('afterend', errorMessage);
    
    setTimeout(() => {
        errorMessage.remove();
    }, 4000);
}
