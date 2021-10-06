const mongoose = require('mongoose');
const chalk = require('chalk');

async function connect() {
    await mongoose.connect(process.env.DatabaseURI,  (error) => {
        if(error)
            console.error(error);
        else
            console.log(chalk.green("Connected to Database!"));
    });
}

module.exports.connect = connect;