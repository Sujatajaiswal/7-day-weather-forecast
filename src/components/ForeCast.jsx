// import React from "react";

// const ForeCast = ({ forecast }) => {
//   // ✅ Process 5-day forecast (1 per day)
//   const dailyForeCast = forecast.reduce((acc, item) => {
//     const date = new Date(item.dt * 1000).toLocaleDateString();
//     if (!acc.find(f => f.date === date)) {
//       acc.push({
//         temperature: `${item.main.temp}°C`,
//         day: new Date(item.dt * 1000).toLocaleDateString("en-EN", {
//           weekday: "short",
//         }),
//         date: date,
//         icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
//       });
//     }
//     return acc;
//   }, []).slice(0, 5);

//   // ✅ Process next few hours (4 time slots)
//   const hourlyForeCast = forecast.slice(0, 5).map(item => ({
//     time: new Date(item.dt * 1000).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     }),
//     icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
//     degree: `${item.main.temp}°C`,
//     windSpeed: `${item.wind.speed} km/h`,
//   }));

//   return (
//     <div className="flex flex-col lg:flex-row gap-6 px-4 py-6">
//       {/* ✅ 5-Day Forecast */}
//       <div className="w-full lg:w-1/2 bg-[#005effde] rounded-lg shadow-2xl text-white p-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">5 Day Forecast</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {dailyForeCast.map((cast, index) => (
//             <div
//               key={index}
//               className="flex justify-between items-center p-3 bg-white/10 rounded hover:bg-white/20 transition"
//             >
//               <img src={cast.icon} alt="icon" className="w-10 h-10" />
//               <span className="text-lg font-semibold">{cast.temperature}</span>
//               <span className="text-sm text-right">
//                 {cast.day}, {cast.date}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ✅ Hourly Forecast */}
//       <div className="w-full lg:w-1/2 bg-[#005effde] rounded-lg shadow-2xl text-white p-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">Hourly Forecast</h2>

//         <div className="flex justify-around gap-4 flex-wrap">
//           {hourlyForeCast.map((hour, idx) => (
//             <div
//               key={idx}
//               className="flex flex-col items-center bg-[#1c2938] p-4 rounded-lg w-28 shadow-md text-center"
//             >
//               <p className="text-sm font-medium">{hour.time}</p>
//               <img src={hour.icon} alt="hourly-icon" className="w-10 h-10" />
//               <p className="text-lg font-semibold">{hour.degree}</p>
//               <p className="text-xs">{hour.windSpeed}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForeCast;

import React from "react";

const ForeCast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) {
    return (
      <div className="text-white text-center p-4">Loading forecast...</div>
    );
  }

  const dailyForecast = forecast
    .reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc.find((f) => f.date === date)) {
        acc.push({
          temperature: `${item.main.temp}°C`,
          day: new Date(item.dt * 1000).toLocaleDateString("en-EN", {
            weekday: "short",
          }),
          date: date,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        });
      }
      return acc;
    }, [])
    .slice(0, 7);

  const hourlyForecast = forecast.slice(0, 5).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    degree: `${item.main.temp}°C`,
    windSpeed: `${item.wind.speed} km/h`,
  }));

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-6">
      <div className="w-full lg:w-1/2 bg-[#050e1fde] rounded-lg shadow-2xl text-white p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">7 Day Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dailyForecast.map((cast, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-white/10 rounded hover:bg-white/20 transition"
            >
              <img src={cast.icon} alt="icon" className="h-10" />
              <span className="text-lg font-semibold">{cast.temperature}</span>
              <span className="text-sm text-right">
                {cast.day}, {cast.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-[#050e1fde] rounded-lg shadow-2xl text-white p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Hourly Forecast</h2>
        <div className="flex justify-around gap-4 flex-wrap">
          {hourlyForecast.map((hour, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-[#1c2938] p-4 rounded-lg w-28 shadow-md text-center"
            >
              <p className="text-sm font-medium">{hour.time}</p>
              <img src={hour.icon} alt="hourly-icon" className="h-8 my-2" />
              <p className="text-lg font-semibold">{hour.degree}</p>
              <p className="text-xs">{hour.windSpeed}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForeCast;
