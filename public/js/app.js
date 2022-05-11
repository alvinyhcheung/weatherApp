console.log("Client side javascript file is loaded");



const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')




weatherForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    const location = search.value;

    messageOne.textContent = `Loading...`;

    fetch(`/weather?address=${location}`).then(
	(response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = `Error: ${data.error}`
			} else {
                messageOne.textContent = `Location: ${data.location}`;
				messageTwo.textContent = `Temperature: ${data.temperature}`
                messageThree.textContent = `Feels like: ${data.feelsLike}`
			}
		});
	}
);
})