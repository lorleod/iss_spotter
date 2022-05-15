const { nextISSTimesForMyLocation } = require("./iss");

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetch my IP address
fetchMyIP((error, IP) => {
  // get geo coordinates using IP address
  if (error) {
    console.log("Error: ", error);
    return;
  }

  fetchCoordsByIP(IP, (error, coords) => {
    if (error) {
      console.log("Error: ", error);
      return;
    }
    // get ISS info using geo coordinates
    fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
      if (error) {
        console.log("Error: ", error);
        return;
      }
      console.log(flyOverTimes);
    });
  });
});
