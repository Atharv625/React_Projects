import React, { useEffect, useState } from "react";
import { loadConfigFromFile } from "vite";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

const App = () => {
  const [location, setLocation] = useState(
    () => localStorage.getItem("Location") || "Shelapur",
  );

  const [isload, setLoad] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState(null);
  async function fetchWeather() {
    try {
      // 1) Getting location (geocoding)
      setLoad(true);
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.daily);
    } catch (err) {
      console.error(err);
    } finally {
      setLoad(false);
    }
  }
  useEffect(
    function () {
      localStorage.setItem("Weather", weather);
    },
    [weather],
  );
  return (
    <>
      <div className="app">
        <h1> Classy Weather</h1>
        <div>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for location...."
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <button
          className="border-2 border-black px-4 py-2 active:bg-red-300"
          onClick={() => fetchWeather()}
        >
          Get weather
        </button>
        {isload && <p className="loader">Loading...</p>}
        <Weather weather={weather} displayLocation={displayLocation} />
      </div>
    </>
  );
};

export default App;

function Weather({ weather, displayLocation }) {
  if (!weather) return null;

  return (
    <div className="mt-4 ">
      <h2 className="text-xl font-semibold">{displayLocation}</h2>

      <div className="flex gap-4 mt-2 overflow-x-auto">
        {weather.time.map((date, i) => (
          <div key={date} className="border p-2 rounded-lg shadow text-center">
            <p className="day">{formatDay(date)}</p>
            <p className="text-2xl">{getWeatherIcon(weather.weathercode[i])}</p>
            <p>
              {weather.temperature_2m_min[i]}°C /{" "}
              {weather.temperature_2m_max[i]}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
