import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=f55bf2c328de49aa3680e16980403fc2`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('') // To remove location after searched location
    }
  
  }



  return (
    <div className="app">
      <div className="search">
        <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text" 
        />
      </div>
      <div className="container">
        <div className="top">
        <div className="location">
          <p>{data.name}</p> 
        </div>
        <div className="temp">
            {/* this statement is used to check if we
            are able to access main in weather.json, if yes then
            get temp from the main if not return null */}
          {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
        </div>
        <div className="description">
          {/* this statement is used to check if we
            are able to access weather in weather.json, if yes then
            get the array from object which is first
            [0].main to get the clouds, if not return null */}
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
        </div>


    {/*Used to not display any data if no location was entered*/}
    {data.name != undefined &&
      <div className="bottom">
      <div className="feels">
        {data.main ? <p  className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
        <p>Feels Like</p>
      </div>
      <div className="humidity">
        {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
        <p>Humidity</p>
      </div>
      <div className="wind">
        {data.wind ? <p className="bold">{data.wind.speed} KMH</p> : null}
        <p>Wind Speed</p>
      </div>
    </div>
    }
        


      </div>
    </div>
    );
}

export default App;
