import { WorkloadItem } from './workload-item';

export class CoffeeCounter {
  private drinks: WorkloadItem[] = [];
  private interval: NodeJS.Timeout;
  private announcementMade = true;

  constructor() {
    this.interval = this.initTimer();
  }

  /**
   * Removes drinks that have been picked up (have been on the counter for 3 seconds)
   * @returns removed drinks
   */
  private pickUpDrinks() {
    const drinksNotRemoved: WorkloadItem[] = [];
    const drinksRemoved = this.drinks.filter((drink) => {
      drink.currentTime -= 1000;
      if (drink.currentTime > 0) {
        drinksNotRemoved.push(drink);
        return false;
      } else {
        return true;
      }
    });
    this.drinks = drinksNotRemoved;
    return drinksRemoved;
  }

  addDrink(drink: WorkloadItem) {
    this.drinks.push(drink);
  }

  removeTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  /**
   * Sets a timer that removes drinks every second if the drink has been on the counter for 3 seconds
   */
  private initTimer() {
    return setInterval(() => {
      const removedDrinks = this.pickUpDrinks();
      if (removedDrinks && removedDrinks.length) {
        removedDrinks.forEach((drink) => {
          console.log(drink, 'has been picked up from the coffee counter.\n');
        });
        this.announcementMade = false;
      } else {
        if (!this.announcementMade) {
          console.log('All drinks have been picked up.\n');
          // only announce this once
          this.announcementMade = true;
        }
      }
    }, 1000);
  }
}
