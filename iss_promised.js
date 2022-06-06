const request = require("request-promise-native");

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json")
};


/*
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function (body) {
  const decoded = JSON.parse(body).ip;
  return request(`https://api.ipbase.com/json/${decoded}`);
};

const fetchISSFlyOverTimes = function (body) {
  const decoded = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${decoded.latitude}&lon=${decoded.longitude}`);
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => {
    const decoded = JSON.parse(body);
    return decoded;
  });
};









//   , (error, response, body) => {
//     // if error, return error
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     // if status code not 200, return status code and body
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
//     // if no errors, return coords
//     const decoded = JSON.parse(body);
//     const coords = {};
//     coords.latitude = decoded.latitude;
//     coords.longitude = decoded.longitude;
//     callback(null, coords);
//   });
// };




// /**
//  * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
//  * Input:
//  *   - An object with keys `latitude` and `longitude`
//  *   - A callback (to pass back an error or the array of resulting data)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The fly over times as an array of objects (null if error). Example:
//  *     [ { risetime: 134564234, duration: 600 }, ... ]
//  */
//  const fetchISSFlyOverTimes = function(coords, callback) {
//   request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
//     // if error, return error
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     // if status code not 200, return status code and body
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
//     // if no errors, return IP
//     const decoded = JSON.parse(body);
//     callback(null, decoded.response);
//   });
// };

// /**
//  * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
//  * Input:
//  *   - A callback with an error or results.
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The fly-over times as an array (null if error):
//  *     [ { risetime: <number>, duration: <number> }, ... ]
//  */
// const nextISSTimesForMyLocation = function(callback) {
//   // fetch my IP address
//   fetchMyIP((error, IP) => {
//     // get geo coordinates using IP address
//     if (error) {
//       callback(error, null);
//     }
//     fetchCoordsByIP(IP, (error, coords) => {
//       if (error) {
//         callback(error, null);
//       }
//       // get ISS info using geo coordinates
//       fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
//         if (error) {
//           callback(error, null);
//         }
//         callback(null, flyOverTimes)
//       });
//     });
//   });
// }

module.exports = { nextISSTimesForMyLocation };;
