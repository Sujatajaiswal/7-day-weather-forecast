// import React, { useState } from "react";
// import logo from "../assets/LogoChristmas.png";
// import search from "../assets/search.png";
// import location from "../assets/currentLocationIcon.png";
// import { toast } from "react-toastify";

// const NavBar = ({ onCitySearch, onLocationFetch }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearchQuery = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery) {
//       onCitySearch(searchQuery);
//     }
//   };

//   const handleLocationClick = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           onLocationFetch(latitude, longitude);
//         },
//         (error) => {
//           console.log(error);
//           toast.error("Geolocation is not supported by your browser");
//         }
//       );
//     }
//   };

//   return (
//     <div className="m-4">
//       <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
//         {/* logo */}
//         <img src={logo} alt="logo" className="w-48 select-none" />

//         {/* search Bar */}
//         <form
//           onSubmit={handleSearchSubmit}
//           className="relative flex items-center w-full max-w-md bg-white rounded-lg shadow-md"
//         >
//           <img
//             src={search}
//             alt="search"
//             className="absolute left-3 w-4 h-4 text-gray-400 select-none"
//           />
//           <input
//             type="text"
//             onChange={handleSearchQuery}
//             placeholder="Search for your preferred city..."
//             className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 border-none rounded-lg outline-none"
//           />
//           <button
//             type="submit"
//             className="bg-[#005eff] text-white px-5 py-2 rounded-lg"
//           >
//             Search
//           </button>
//         </form>

//         {/* current location */}
//         <div
//           onClick={handleLocationClick}
//           className="flex items-center gap-3 px-4 text-sm font-medium text-white bg-green-500 rounded cursor-pointer"
//         >
//           <img src={location} alt="location" className="w-4 h-4" />
//           Current Location
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

import React, { useState } from "react";
import logo from "../assets/LogoChristmas.png";
import search from "../assets/search.png";
import location from "../assets/currentLocationIcon.png";
import { toast } from "react-toastify";

const NavBar = ({ onCitySearch, onLocationFetch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle city search query change
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      onCitySearch(searchQuery);
    }
  };

  // Handle setting the location to Bangalore when the button is clicked
  const handleLocationClick = () => {
    const bangaloreLatitude = 12.9716; // Bangalore latitude
    const bangaloreLongitude = 77.5946; // Bangalore longitude
    onLocationFetch(bangaloreLatitude, bangaloreLongitude);
  };

  return (
    <div className="m-4">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row bg-[#050e1fde] p-4 rounded-lg">
        {/* Logo */}
        <img src={logo} alt="logo" className="w-48 select-none" />

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center w-full max-w-md bg-white rounded-lg shadow-md"
        >
          <img
            src={search}
            alt="search"
            className="absolute left-3 w-4 h-4 text-gray-400 select-none"
          />
          <input
            type="text"
            onChange={handleSearchQuery}
            placeholder="Search for your preferred city..."
            className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 border-none rounded-lg outline-none"
          />
          <button
            type="submit"
            className="bg-[#005eff] text-white px-5 py-2 rounded-lg"
          >
            Search
          </button>
        </form>

        {/* Current Location Button */}
        <div
          onClick={handleLocationClick}
          className="flex items-center gap-3 px-4 text-sm font-medium text-white bg-[#050e1fde] rounded cursor-pointer"
        >
          <img src={location} alt="location" className="w-4 h-4" />
          Current Location
        </div>
      </div>
    </div>
  );
};

export default NavBar;
