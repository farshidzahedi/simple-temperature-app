import React, { useState, useEffect } from "react";
import "./Weather.css";
import cities from "../../constants/constants";
const api = {
  base: "https://api.openweathermap.org/data/2.5/weather?",
  key: "&appid=e43b36a10d5a75d9dab4276c15461c62&units=metric",
};

function Weather() {
  let objCity = cities
  // const [SelectedCity, setSelectedCity] = useState("");
  const [temp, setTemp] = useState({
    id:"1",
    name:"تهران",
    value:"tehran",
    lat:"35.715298",
    long:"51.404343",
    photoUrl: '../../../../public/tehran.jpg',
  });
  const [weather, setWather] = useState();
    const selectHandler = (event) => {
    let citycheange = event.target.value;
    const NeededCity = objCity.find((item)=>{
      return item.value === citycheange
    })
    setTemp(NeededCity);
  }
  useEffect(() => {
    fetch(`${api.base}lat=${temp.lat}&lon=${temp.long}${api.key}`)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setWather(actualData);
        // console.log(setWather);
      }),[]});

  return (
    <div className="Weather" style={{backgroundImage:`url(${temp.photoUrl})`,backgroundSize: 'cover',
  }}>
      <div className="container">
        <h1 className="Weather-title">Simple Wheather App Api</h1>
        <div className="options">
          <label>شهر مورد نظر را انتخاب کید:</label>
          <select className="select" onChange={selectHandler}>
            {cities.map((option, index) => {
               return (<option key={index} value={option.value}>
                  {option.name} 
                </option>
              );
            })}

          </select>
        </div>
      </div>
      <div className="datas">
        <div className="city">
          <p> دمای شهر:{weather.main.temp}</p>
        </div>
        <div className="temp">
          <p>رطوبت هوا:{weather.main.humidity}</p>
        </div>
        <div className="condition">
          <p>سرعت باد:{weather.wind.speed}</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
