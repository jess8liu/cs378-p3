import './App.css';
var latitude = document.getElementById("latitude").value;
var longitude = document.getElementById("longitude").value;
document.getElementById('submit').onclick = displayWeather();

function App() {
  return (
    <div className="App">
      <header type='weather-title'>
          Weather App
      </header>

      <div type="selection">
        <button type='location'>
          Austin
        </button>
        <button type='location'>
          Dallas
        </button>
        <button type='location'>
          Houston
        </button>
        <div type="input">
          <header type='header-input'>
            Location Name: 
          </header>
          <input type="location-input" id="location-name">
          </input>

          <header type='header-input'>
            Latitude: 
          </header>
          <input type="location-input" id="latitude">
          </input>
          </div>

          <header type='header-input'>
            Longitude: 
          </header>
          <input type="location-input" id="longitude">
          </input>

          <button id='submit'>+</button>
      </div>
    </div>
  );
}

function displayWeather() {
  // Make the URL based on parameters & fetch data
  const url = 'https://api.open-meteo.com/v1/forecast?latitude='+ latitude + '&longitude=' + longitude + '&hourly=temperature_2m';
  const json_data = fetchAPIData(url);
  json_data.then(function (json) {
    <div>
      Weather Data
    </div>
  });
}

async function fetchAPIData(url) {
  try {
    // Receive URL & fetch json data
    const response = await fetch(url);
    const json = await response.json(url);
    return json;
  } catch (err) {
    // Error, location doesn't exist or have data
    return -1;
  }
}

export default App;
