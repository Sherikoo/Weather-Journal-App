/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=46b42afecd356f6528d16d0951ee67ad&units=metric';

// Event Listener for the "Generate" button
document.getElementById("generate").addEventListener("click", function() {
	const newDate = generateDate();
	const zipCode = document.getElementById("zip").value;
	const feelings = document.getElementById("feelings").value;
	getData(baseURL, zipCode, apiKey)
	.then(function(data) {
		postData('/postData', {temperature: data.main.temp, date: newDate, userResponse: feelings})
	})
	.then(updateUI);
});

// Create a new date instance dynamically with JS
function generateDate() {
	let d = new Date();
    return d.getDate() +'.'+ (Number(d.getMonth()) + 1).toString() +'.'+ d.getFullYear();
}

// Get data from Weather API
const getData = async(baseURL, zipCode, apiKey) => {
	const res = await fetch(baseURL+zipCode+apiKey);
	try{
		const data = await res.json();
		// Alert the user if he/she entered an invalid zip code
		if(data.cod === "404" || data.cod === "400") {
			alert("Please enter a valid zip code");
			return;
		}
		console.log(data);
		return data;
	}catch(error) {
		console.log("error", error);
	}
}

// Post all collected data to the server end point object
const postData = async(url = '', data ={}) => {
	const res = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type' : 'application/json',
		},
		body: JSON.stringify(data),
	});
	try{
		const newData = await res.json();
		console.log(newData);
		return newData;
	}catch(error){
		console.log("error", error);
	}
}

// Update the UI with all data
const updateUI = async() => {
	const request = await fetch('/getData');
	try{
		const allData = await request.json();
		document.getElementById("date").innerHTML = `<span>Date:</span> ${allData.date}`;
		document.getElementById("temp").innerHTML = `<span>Temperature:</span> ${allData.temperature} <span>&#8451</span>`;
		document.getElementById("content").innerHTML = `<span>User Feelings:</span> ${allData.userResponse}`;
		document.querySelector("#entryHolder").classList.add("resultStyle");
	}catch(error){
		console.log("error", error);
	}
}
