const request = require("request");

// fetches IP address
const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    // if error, return error
    if (error) {
      callback(error, null);
      return;
    }
    // if status code not 200, return status code and body
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // if no errors, return IP
    const decoded = JSON.parse(body);
    callback(null, decoded.ip);
  });
};

module.exports = { fetchMyIP };
