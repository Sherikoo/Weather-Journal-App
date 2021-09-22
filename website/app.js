/* Global Variables */
// API URL
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&appid=46b42afecd356f6528d16d0951ee67ad&units=metric';


// Event Listener for the "Generate" button
document.getElementById('generate').addEventListener('click', function(){
  const cityName = document.getElementById('city').value;
  const d = new Date();
  const date = d.getDate() + '.' + Number(d.getMonth()+1).toString() + '.' + d.getFullYear();
  const userResponse = document.getElementById('feelings').value;
  getApiData(baseURL, cityName, apiKey)
  .then(function(newData) {
    postData('/postData', {date: date,
                           temperature: newData.main.temp,
                           weather: newData.weather[0].main,
                           userResponse: userResponse})
  .then(updateUI());
  });
});


// Get data from Weather API
const getApiData = async(baseURL, cityName, apiKey) => {
  const res = await fetch(baseURL + cityName + apiKey);
  try {
    const apiData = await res.json();
    if(apiData.cod === "404" || apiData.cod === "400") {
			alert("Please enter a valid city name");
			return;
		}
    console.log(apiData);
    return apiData;
  }catch(error) {
    console.log('Error', error);
  }
}

// Post all collected data to the server end point object
const postData = async(url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  }catch(error) {
    console.log('Error', error);
  }
}

// Update the UI with all data
const updateUI = async() => {
  const res = await fetch('/getData');
  try {
    const dataForUI = await res.json();
    document.getElementById('date').innerHTML = `<span>Date:</span> ${dataForUI.date}`;
    document.getElementById('temp').innerHTML = `<span>Temperature:</span> ${dataForUI.temperature} <span>&#8451;</span>`;
    document.getElementById('weather').innerHTML = `<span>Weather:</span> ${dataForUI.weather}`;
    document.getElementById('content').innerHTML = `<span>User Response:</span> ${dataForUI.userResponse}`;
  }catch(error) {
    console.log('Error', error);
  }
}
