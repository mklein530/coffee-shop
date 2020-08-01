import readline from 'readline';
import fs from 'fs';
import { CoffeeCounter } from './coffee-counter';
import { Barista } from './barista';
import { MENU, MenuItem } from './menu';
import { logger } from './log';

const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
const log_stdout = process.stdout;

(async () => {
  const commandLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const coffeeCounter = new CoffeeCounter();
  const barista = new Barista(coffeeCounter);

  function prompt() {
    return new Promise((resolve, reject) => {
      commandLine.question('What drink would you like? (Enter None to exit)\n', (answer) => {
        if (answer === 'None' || answer === 'none') {
          logger.info('Exiting coffee shop');
          resolve();
          process.exit(0);
        }
        if (MENU[answer as MenuItem]) {
          barista.addWorkloadItem(answer as MenuItem);
        } else {
          logger.info(answer, "is not on the menu. Please choose something else or type 'none' to exit.\n");
        }
        resolve();
      });
    });
  }

  while (true) {
    await prompt();
  }
})();
