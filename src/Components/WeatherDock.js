import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import Clock from "react-live-clock";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "75c10f679078c5f263f4657b9e74798e";

function WeatherDock() {
  const [weather, setWeather] = useState({});
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    getWeather();
  }, []);
  const getWeather = async () => {
    const { data } = await axios.get(URL, {
      params: {
        q: userInfo.profile.city,
        units: "metric",
        APPID: API_KEY,
      },
    });
    setWeather(data);
  };

  return (
    <div className="text-light d-flex align-items-center justify-content-center p-2 w-100">
      <div style={{ fontSize: 13 }} className="d-flex flex-column text-center">
        <Clock format="HH:mm" interval={1000} ticking={true} />
        <Clock format="dddd" />
      </div>
      <div>
        {weather.main ? (
          <div>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              width={60}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WeatherDock;
