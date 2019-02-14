#!/usr/bin/env node
const validator = require("email-validator");
const argv = require("yargs").argv;
const axios = require("axios");
const account = argv._[0];
const chalk = require('chalk');

if(validator.validate(account)) {
  const encodedAccount = encodeURIComponent(account);
  const url = `https://haveibeenpwned.com/api/v2/breachedaccount/` + encodedAccount;

  axios
    .get(url, {headers: {"User-Agent": "pawned"}})
    .then(response =>   {
      for(let element of response.data) {
        console.log(``)
        console.log(chalk.red.bold.underline(element.Name))
        console.log(element.Description)

      }
    })
    .catch(error => {
      console.log("You have NOT been pawned! Lucky, you!")
    })
}
