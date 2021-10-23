const axios = require("axios");
const chalk = require("chalk");
const API_END_POINT = require('../config.json').JDoodle_API_ENDPOINT;

module.exports = async (language, script, stdin = "") => {
    let res = await axios({
      url: API_END_POINT,
      method: "POST",
      timeout: 5000,
      data: {
        script,
        language,
        stdin,
        clientId: process.env.ClientID,
        clientSecret: process.env.ClientSecret,
      },
    }).catch(err => {
        console.error(chalk.red(err.toString()));
    });

    if(!res)
        return { err: "No Response from API." };
    return res.data;
};
