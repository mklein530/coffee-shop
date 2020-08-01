"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoffeeCounter = /** @class */ (function () {
    function CoffeeCounter() {
        this.drinks = [];
        this.announcementMade = true;
        this.interval = this.initTimer();
    }
    /**
     * Removes drinks that have been picked up (have been on the counter for 3 seconds)
     * @returns removed drinks
     */
    CoffeeCounter.prototype.pickUpDrinks = function () {
        var drinksNotRemoved = [];
        var drinksRemoved = this.drinks.filter(function (drink) {
            drink.currentTime -= 1000;
            if (drink.currentTime > 0) {
                drinksNotRemoved.push(drink);
                return false;
            }
            else {
                return true;
            }
        });
        this.drinks = drinksNotRemoved;
        return drinksRemoved;
    };
    CoffeeCounter.prototype.addDrink = function (drink) {
        this.drinks.push(drink);
    };
    CoffeeCounter.prototype.removeTimer = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    /**
     * Sets a timer that removes drinks every second if the drink has been on the counter for 3 seconds
     */
    CoffeeCounter.prototype.initTimer = function () {
        var _this = this;
        return setInterval(function () {
            var removedDrinks = _this.pickUpDrinks();
            if (removedDrinks && removedDrinks.length) {
                removedDrinks.forEach(function (drink) {
                    console.log(drink, 'has been picked up from the coffee counter.\n');
                });
                _this.announcementMade = false;
            }
            else {
                if (!_this.announcementMade) {
                    console.log('All drinks have been picked up.\n');
                    // only announce this once
                    _this.announcementMade = true;
                }
            }
        }, 1000);
    };
    return CoffeeCounter;
}());
exports.CoffeeCounter = CoffeeCounter;
