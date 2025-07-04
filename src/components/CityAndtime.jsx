// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// import humidityIcon from "../assets/humidity.png";
// import windIcon from "../assets/windSpeed.png";
// import pressureIcon from "../assets/pressure.png";
// import uvIcon from "../assets/uv-white.png";
// import sunriseIcon from "../assets/sunrise-white.png";
// import sunsetIcon from "../assets/sunset-white.png";
// import ForeCast from "./ForeCast";

// const CityAndTime = ({ cityName, lat, lon, setLat, setLon }) => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [uvIndex, setUvIndex] = useState(null);
//   const [forecastData, setForecastData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let url = "";

//         if (cityName) {
//           const encodedCity = encodeURIComponent(cityName);
//           url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=ded9df4e524ce4c54439885cb4f7ad95`;
//         } else if (lat && lon) {
//           url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=ded9df4e524ce4c54439885cb4f7ad95`;
//         } else {
//           toast.error("City name or coordinates not provided");
//           return;
//         }

//         const currentWeather = await axios.get(url);
//         setWeatherData(currentWeather.data);

//         const { coord } = currentWeather.data;
//         setLat(coord.lat);
//         setLon(coord.lon);

//         const uv = await axios.get(
//           `https://api.openweathermap.org/data/2.5/uvi?lat=${coord.lat}&lon=${coord.lon}&appid=ded9df4e524ce4c54439885cb4f7ad95`
//         );
//         setUvIndex(uv.data.value);

//         const forecastRes = await axios.get(
//           `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=ded9df4e524ce4c54439885cb4f7ad95&units=metric`
//         );
//         setForecastData(forecastRes.data.list);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch weather data");
//       }
//     };

//     fetchData();
//   }, [cityName, lat, lon]);

//   return (
//     <>
//       <div className="flex flex-col xl:flex-row gap-4 px-4 py-6 text-white">
//         {/* Left: City and Clock */}
//         <div className="w-full xl:w-1/3 bg-[#050e1fde] shadow-2xl rounded-lg p-4 flex flex-col items-center justify-between">
//           <h1 className="text-2xl md:text-3xl font-bold">
//             {weatherData?.name || "City"}
//           </h1>
//           <img
//             src={`http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`}
//             alt="weather"
//             className="w-24"
//           />
//           <p className="text-3xl font-bold">
//             {new Date().toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//               second: "2-digit",
//             })}
//           </p>
//           <p>{new Date().toLocaleDateString()}</p>
//         </div>

//         {/* Middle: Temp + Sunrise/Sunset */}
//         <div className="flex-grow bg-[#050e1fde] shadow-2xl rounded-lg p-4 flex flex-col md:flex-row justify-around items-center gap-4">
//           <div className="flex flex-col items-center">
//             <h1 className="text-5xl font-bold">
//               {weatherData?.main?.temp || "--"}°C
//             </h1>
//             <p className="text-lg">
//               Feels like:{" "}
//               <span className="font-bold">
//                 {weatherData?.main?.feels_like || "--"}°C
//               </span>
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             <img src={sunriseIcon} alt="sunrise" className="h-10" />
//             <div className="text-center">
//               <h3>Sunrise</h3>
//               <p>
//                 {weatherData?.sys?.sunrise
//                   ? new Date(
//                       weatherData.sys.sunrise * 1000
//                     ).toLocaleTimeString()
//                   : "--"}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <img src={sunsetIcon} alt="sunset" className="h-10" />
//             <div className="text-center">
//               <h3>Sunset</h3>
//               <p>
//                 {weatherData?.sys?.sunset
//                   ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()
//                   : "--"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right: Description + Details */}
//         <div className="w-full xl:w-[30%] bg-[#050e1fde] shadow-2xl rounded-lg p-4 flex flex-col items-center">
//           <img
//             src={`http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@4x.png`}
//             alt="weather"
//             className="w-36 h-36"
//           />
//           <p className="font-bold text-xl md:text-3xl mb-4">
//             {weatherData?.weather?.[0]?.main || "Weather"}
//           </p>

//           <div className="grid grid-cols-2 gap-4 text-center">
//             <div>
//               <img src={humidityIcon} alt="humidity" className="h-10 mx-auto" />
//               <p>{weatherData?.main?.humidity || "--"}%</p>
//               <h6 className="text-sm">Humidity</h6>
//             </div>

//             <div>
//               <img src={windIcon} alt="wind speed" className="h-10 mx-auto" />
//               <p>{weatherData?.wind?.speed || "--"} km/h</p>
//               <h6 className="text-sm">Wind Speed</h6>
//             </div>

//             <div>
//               <img src={pressureIcon} alt="pressure" className="h-10 mx-auto" />
//               <p>{weatherData?.main?.pressure || "--"} hPa</p>
//               <h6 className="text-sm">Pressure</h6>
//             </div>

//             <div>
//               <img src={uvIcon} alt="uv" className="h-10 mx-auto" />
//               <p>{uvIndex !== null ? uvIndex : "N/A"}</p>
//               <h6 className="text-sm">UV Index</h6>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Forecast Section */}
//       <ForeCast forecast={forecastData} />
//     </>
//   );
// };

// export default CityAndTime;

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/windSpeed.png";
import pressureIcon from "../assets/pressure.png";
import uvIcon from "../assets/uv-white.png";
import sunriseIcon from "../assets/sunrise-white.png";
import sunsetIcon from "../assets/sunset-white.png";
import ForeCast from "./ForeCast";

const CityAndTime = ({ cityName, lat, lon, setLat, setLon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        if (cityName) {
          const encodedCity = encodeURIComponent(cityName);
          url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=ded9df4e524ce4c54439885cb4f7ad95`;
        } else if (lat && lon) {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=ded9df4e524ce4c54439885cb4f7ad95`;
        } else {
          toast.error("City name or coordinates not provided");
          return;
        }

        const currentWeather = await axios.get(url);
        setWeatherData(currentWeather.data);

        const { coord } = currentWeather.data;
        setLat(coord.lat);
        setLon(coord.lon);

        const uv = await axios.get(
          `https://api.openweathermap.org/data/2.5/uvi?lat=${coord.lat}&lon=${coord.lon}&appid=ded9df4e524ce4c54439885cb4f7ad95`
        );
        setUvIndex(uv.data.value);

        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=ded9df4e524ce4c54439885cb4f7ad95&units=metric`
        );
        setForecastData(forecastRes.data.list);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch weather data");
      }
    };

    fetchData();
  }, [cityName, lat, lon]);

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-4 px-4 py-6 text-white bg-[#050e1fde]">
        {/* Left: City and Clock */}
        <div className="w-full xl:w-1/3 bg-[#050e1fde] shadow-2xl rounded-lg p-4 flex flex-col items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">
            {weatherData?.name || "City"}
          </h1>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`}
            alt="weather"
            className="w-24"
          />
          <p className="text-3xl font-bold">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <p>{new Date().toLocaleDateString()}</p>
        </div>

        {/* Middle: Temp + Sunrise/Sunset */}
        <div className="flex-grow bg-[#050e1fde] shadow-2xl rounded-lg p-4 flex flex-col md:flex-row justify-around items-center gap-4">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold">
              {weatherData?.main?.temp || "--"}°C
            </h1>
            <p className="text-lg">
              Feels like:{" "}
              <span className="font-bold">
                {weatherData?.main?.feels_like || "--"}°C
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <img src={sunriseIcon} alt="sunrise" className="h-10" />
            <div className="text-center">
              <h3>Sunrise</h3>
              <p>
                {weatherData?.sys?.sunrise
                  ? new Date(
                      weatherData.sys.sunrise * 1000
                    ).toLocaleTimeString()
                  : "--"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src={sunsetIcon} alt="sunset" className="h-10" />
            <div className="text-center">
              <h3>Sunset</h3>
              <p>
                {weatherData?.sys?.sunset
                  ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()
                  : "--"}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Description + Details */}
        <div className="w-full xl:w-[30%] bg-[#050e1fde] shadow-2xl rounded-lg p-4 flex flex-col items-center">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@4x.png`}
            alt="weather"
            className="w-36 h-36"
          />
          <p className="font-bold text-xl md:text-3xl mb-4">
            {weatherData?.weather?.[0]?.main || "Weather"}
          </p>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <img src={humidityIcon} alt="humidity" className="h-10 mx-auto" />
              <p>{weatherData?.main?.humidity || "--"}%</p>
              <h6 className="text-sm">Humidity</h6>
            </div>

            <div>
              <img src={windIcon} alt="wind speed" className="h-10 mx-auto" />
              <p>{weatherData?.wind?.speed || "--"} km/h</p>
              <h6 className="text-sm">Wind Speed</h6>
            </div>

            <div>
              <img src={pressureIcon} alt="pressure" className="h-10 mx-auto" />
              <p>{weatherData?.main?.pressure || "--"} hPa</p>
              <h6 className="text-sm">Pressure</h6>
            </div>

            <div>
              <img src={uvIcon} alt="uv" className="h-10 mx-auto" />
              <p>{uvIndex !== null ? uvIndex : "N/A"}</p>
              <h6 className="text-sm">UV Index</h6>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Forecast Section */}
      <ForeCast forecast={forecastData} />
    </>
  );
};

export default CityAndTime;
