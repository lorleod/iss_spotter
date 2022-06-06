const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then(data => console.log(data))
  .catch(error => console.log("error: " + error));


// nextISSTimesForMyLocation((error, flyOverTimes) => {
//   if (error) {
//     console.log("Error: ", error);
//     return;
//   }

//   for (const time of flyOverTimes) {
//     console.log(`Next pass at ${flyOverTimes.risetime} for ${flyOverTimes.duration} seconds!`);
//   }
// });

// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// // fetch my IP address
// fetchMyIP((error, IP) => {
//   // get geo coordinates using IP address
//   if (error) {
//     console.log("Error: ", error);
//     return;
//   }

//   fetchCoordsByIP(IP, (error, coords) => {
//     if (error) {
//       console.log("Error: ", error);
//       return;
//     }
//     // get ISS info using geo coordinates
//     fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
//       if (error) {
//         console.log("Error: ", error);
//         return;
//       }
//       console.log(flyOverTimes);
//     });
//   });
// });
