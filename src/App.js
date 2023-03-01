import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  // Input parameters
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Display information
  const [weatherInfo, showWeatherInfo] = useState(null);
  const [errorMessage, showError] = useState('');

  // Buttons
  const [locations, showLocations] = useState([
    (<button className='location' onClick={() => displayWeather('Austin, TX', 30.27, -97.74)}>
      Austin, TX
    </button>),
    (<button className='location' onClick={() => displayWeather('Dallas, TX', 32.78, -96.81)}>
      Dallas, TX
    </button>),
    (<button className='location' onClick={() => displayWeather('Houston, TX', 29.76, -95.36)}>
      Houston, TX
    </button>)
  ]);

  // Automatically adds the Austin temperatures
  useEffect(() => {
    displayWeather('Austin, TX', 30.27, -97.74);
  }, []);

  return (
    <div className='App'>
      <div className='App-header'>
        <header className='weather-title'>
          Weather App
        </header>
      </div>

      <div className='selection'>
        <div className='default-locations'>
          {locations}
        </div>
      </div>

      <div className='input'>
        <div>
          <header className='header-input'>
            New Location Name:
          </header>
          <input className='location-input' value={locationName} onChange={(e) => setLocationName(e.target.value)}>
          </input>
        </div>

        <div>
          <header className='header-input'>
            Latitude:
          </header>
          <input className='location-input' value={latitude} onChange={(e) => setLatitude(e.target.value)}>
          </input>
        </div>
      </div>

      <div>
        <header className='header-input'>
          Longitude:
        </header>
        <input className='location-input' value={longitude} onChange={(e) => setLongitude(e.target.value)}>
        </input>
      </div>

      <button className='submit' onClick={() => addLocation(locationName, latitude, longitude)}>
        +
      </button>
      <div className='weather-info' value>
        {errorMessage}
        {weatherInfo}
      </div>
    </div>
  );

  function addLocation(locationName, latitude, longitude) {
    // Check if the given parameters are valid
    if (locationName === '' || latitude === '' || longitude === '') {
      // One of the parameters is empty, show error message
      clear(showWeatherInfo);
      showError('That is not a valid input! Fill out all of the boxes first.')
    } else if (isNaN(latitude) || isNaN(longitude)) {
      // If coordinates are not numbers, show error message
      clear(showWeatherInfo);
      showError('That is not a valid input! Use numbers for your latitude and longitude.');
    } else {
      // No error, can show the weather and add new button
      displayWeather(locationName, latitude, longitude);
      createButton(locationName, latitude, longitude);
    }
  }

  function clear(value) {
    // Clears values
    value('');
  }

  function displayWeather(locationName, latitude, longitude) {
    // Make the URL based on parameters
    clear(showError);
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m';
    const json_data = fetchAPclassNameata(url);

    // Display data based on location
    json_data.then(function (json) {
      // Weather data in the last recent hours
      json.hourly.time.slice(0, 12);
      json.hourly.temperature_2m.slice(0, 12);

      showWeatherInfo(
        <div>
          <div className='location-name'>
            {locationName}
          </div>

          <div>
            <div className='hourly-weather'>
              <div className='hour'>
                <header className='header-weather'>
                  Time
                </header>
              </div>
              <div className='temp'>
                <header className='header-weather'>
                  Temperature in °C
                </header>
              </div>
            </div>

            {json.hourly.time.map((time, index) => (
              <div className='hourly-weather'>
                <div className='hour'>
                  {new Date(time).toLocaleTimeString()}
                </div>
                <div className='temp'>
                  {json.hourly.temperature_2m[index]} °C
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  }

  function createButton(locationName, latitude, longitude) {
    const newLocation = (
      <button className='location' onClick={() => displayWeather(locationName, latitude, longitude)}>
        {locationName}
      </button>
    );
    showLocations([...locations, newLocation]);
  }
}

async function fetchAPclassNameata(url) {
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