const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/economy/purchase/free_gems', {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  console.log(`
╔═╦╗╔╦╗╔═╦═╦╦╦╦╗╔═╗
║╚╣║║║╚╣╚╣╔╣╔╣║╚╣═╣ 
╠╗║╚╝║║╠╗║╚╣║║║║║═╣
╚═╩══╩═╩═╩═╩╝╚╩═╩═╝
                                                  
By : ${chalk.bold('elmintz#1306')}
`);

  const auth = rs.question('Masukin kode auth kalianz : ');
  console.log('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Kode autentikasi tidak valid..`));
      break;

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;
      const gems = data.User.Gems;

console.log(chalk.bgBlack(`\r[ ${moment().format('HH:mm:ss')} ] ${chalk.red(`User By AnaelDev: ${username}`)} | ${chalk.blue(`Your region By AnaelDev : ${country}`)} | ${chalk.green(`Crown By AnaelDev: ${crown}`)}`));
      await sleep(6000);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Akun luh ud keban aowkwkwk`));
     break;
    }
  }


})();
