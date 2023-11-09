const form = document.querySelector('#form');
const listTweets = document.querySelector('#list-tweets');
let tweets = [];

eventListeners();

function eventListeners() {
    form.addEventListener('submit', addTweet);
}

function addTweet(event) {
    event.preventDefault();

}
