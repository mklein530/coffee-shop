import { MENU, MenuItem } from './menu';
import { CoffeeCounter } from './coffee-counter';
import { WorkloadItem } from './workload-item';
import { logger } from './log';

export class Barista {
  workload: WorkloadItem[] = [];
  timer: NodeJS.Timeout;
  coffeeCounter: CoffeeCounter;
  announcementMade: boolean = true;

  constructor(coffeeCounter: CoffeeCounter) {
    this.coffeeCounter = coffeeCounter;
    this.timer = this.initTimer();
  }

  removeTimer() {
    clearInterval(this.timer);
  }

  /**
   * Removes the first item from the queue
   */
  private removeItemFromWorkload() {
    return this.workload.shift();
  }

  /**
   * Adds an item to the queue
   * @param drink
   */
  addWorkloadItem(drink: MenuItem) {
    const menuItem = drink && MENU[drink];
    if (menuItem) {
      this.workload.push({ name: menuItem.name as MenuItem, currentTime: menuItem.time });
    } else {
      logger.info('That item is not on the menu.\n');
    }
  }

  /**
   * Prints the status of each drink in the queue
   */
  private showStatusOfDrinks() {
    this.workload.forEach((item) => {
      logger.info(item.name, 'will be completed in', item.currentTime / 1000, 'seconds.\n');
    });
  }

  /**
   * "Works on a drink item," that is, it decrements 1 second from the first item's time until it is done,
   * at which point it removes it from the item queue.
   */
  private workOnDrinks() {
    const currentItem = this.workload && this.workload.length ? this.workload[0] : null;
    if (currentItem) {
      this.announcementMade = false;
      // subtract a second from the item's time
      currentItem.currentTime -= 1000;
      // this.showStatusOfDrinks();
      if (currentItem.currentTime === 0) {
        // this item is done being made
        this.removeItemFromWorkload();
        logger.info(currentItem.name, 'is done! Adding to coffee counter.\n');
        // set it on the coffee counter with a timer of 3 seconds
        this.coffeeCounter.addDrink({ name: currentItem.name, currentTime: 3000 });
        return;
      }
    } else if (!this.announcementMade) {
      logger.info("No items in the barista's workload queue.\n");
      this.announcementMade = true;
    }
  }

  private initTimer() {
    return setInterval(() => {
      this.workOnDrinks();
    }, 1000);
  }
}
