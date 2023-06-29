const mongoose = require('mongoose');
const chalk = require('chalk');

async function connect() {
  await mongoose.connect(process.env.DATABASE_URL, (error) => {
    if (error) console.error(error);
    else console.log(chalk.green('Connected to Database!'));
  });
}

module.exports.connect = connect;
