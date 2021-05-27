<!-- PROJECT LOGO -->
<p align="center">
  <h3 align="center">Node weather widget</h3>
  <p align="center">
    A simple NodeJS, Express web app with the Handlebars view engine as a front end
    <br/>
    <br/>
    <a href="https://kripv-weather-app.herokuapp.com/">View App</a>
  </p>
</p>
<br/>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#initialisation">Initialisation</a></li>
      </ul>
    </li>
  </ol>
</details>
<br/>


<!-- ABOUT THE PROJECT -->
## About The Project

The app generates the geocode of the entered location and passes that to the Weatherstack API to get the current weather.

### Built With

* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [Handlebars](https://www.npmjs.com/package/hbs)


<!-- GETTING STARTED -->
## Getting Started

In order to use this app a Weatherstack and Mapbox API keys are needed.

### Prerequisites

* [Weatherstack API](https://weatherstack.com/)
* [Mapbox API](https://www.mapbox.com/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kikooOOoo16/node-weather-widget.git
   ```
3. Install NPM packages in both the NodeJS server and the Angular app root directories
   ```sh
   npm install
   ```
4. Inside the root directory add the Weatherstack and Mapbox API key in a .env file under the following keys (`.env` file)
   ```JS
   WEATHER_STACK_API_KEY=weatherstackAPIkey
   GEOCODE_API_TOKEN=mapboxAPIkey
   ```

### Initialisation

1. The server's start script is configured with [nodemon](https://www.npmjs.com/package/nodemon). To start the server just run :
   ```sh
   npm run start:server
   ```
 
<!-- CONTACT -->
## Contact

Kristijan Pavlevski - kristijan.pavlevski@outlook.com

Project Link: [https://github.com/kikooOOoo16/MyBooksAppAngularNode](https://github.com/kikooOOoo16/node-weather-widget)
