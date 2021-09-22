# Weather-Journal App Project

# Author: Mohamed Omar

This weather app gets a city's name code and his/her feelings, fetch the OpenWeatherApp API with my credentials to obtain the city's current temperature and weather, then post the data to my server and update the UI with all data (Date of today, Selected city's temperature and weather, and user's entered feelings).
If an invalid city name is entered, the app alerts the user.


# The idea behind the project

The webapp is developed by creating the server side and the client side using Node JS and Express, getting data from the API, handling data between both sides using asynchronous functions (async, fetch, await, try, catch), and presenting data to the user.


# Instructions to run the app

At first, the Node JS must be installed on the computer.

Open the Command Prompt and type the following:

- npm install express
- npm install body-parser
- npm install cors
- node server.js (to run the server)

Type this url "localhost:3000" in the browser to open the webapp
Type any valid city name and your feelings, then click the 'Generate' button.
