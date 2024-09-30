// express, axios and ejs setup
const express = require('express');
const axios = require('axios');
const app = express();

// setup for view and css
app.set('view engine', 'ejs');

// for the view and request data
app.use(express.urlencoded({ extended: true }));

// retrieve the css styling
app.use(express.static('public'));

// show the main page
app.get('/', (req, res) => {
    res.render('index');
});

// get the joke from the api with the given name
app.post('/getJoke', async (req, res) => {
    // try to get the joke from the api
    try {
        // get the api response
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Any`);
        const jokeData = response.data;

        // save the name of the user
        jokeData.name = req.body.name;

        // render with the given joke
        res.render('joke', { joke: jokeData });
        
    // if theres an issue in getting the joke, show error message
    } catch (error) {
        // render with error
        res.render('index', { error: 'Failed to fetch a joke. Please try again.' });
    }
});

// basic run server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
