"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var menu_1 = require("./menu");
var Barista = /** @class */ (function () {
    function Barista(coffeeCounter) {
        this.workload = [];
        this.announcementMade = true;
        this.coffeeCounter = coffeeCounter;
        this.timer = this.initTimer();
    }
    Barista.prototype.removeTimer = function () {
        clearInterval(this.timer);
    };
    /**
     * Removes the first item from the queue
     */
    Barista.prototype.removeItemFromWorkload = function () {
        return this.workload.shift();
    };
    /**
     * Adds an item to the queue
     * @param drink
     */
    Barista.prototype.addWorkloadItem = function (drink) {
        var menuItem = drink && menu_1.MENU[drink];
        if (menuItem) {
            this.workload.push({ name: menuItem.name, currentTime: menuItem.time });
        }
        else {
            console.log('That item is not on the menu.\n');
        }
    };
    /**
     * Prints the status of each drink in the queue
     */
    Barista.prototype.showStatusOfDrinks = function () {
        this.workload.forEach(function (item) {
            console.log(item.name, 'will be completed in', item.currentTime / 1000, 'seconds.\n');
        });
    };
    /**
     * "Works on a drink item," that is, it decrements 1 second from the first item's time until it is done,
     * at which point it removes it from the item queue.
     */
    Barista.prototype.workOnDrinks = function () {
        var currentItem = this.workload && this.workload.length ? this.workload[0] : null;
        if (currentItem) {
            this.announcementMade = false;
            // subtract a second from the item's time
            currentItem.currentTime -= 1000;
            // this.showStatusOfDrinks();
            if (currentItem.currentTime === 0) {
                // this item is done being made
                this.removeItemFromWorkload();
                console.log(currentItem.name, 'is done! Adding to coffee counter.\n');
                // set it on the coffee counter with a timer of 3 seconds
                this.coffeeCounter.addDrink({ name: currentItem.name, currentTime: 3000 });
                return;
            }
        }
        else if (!this.announcementMade) {
            console.log("No items in the barista's workload queue.\n");
            this.announcementMade = true;
        }
    };
    Barista.prototype.initTimer = function () {
        var _this = this;
        return setInterval(function () {
            _this.workOnDrinks();
        }, 1000);
    };
    return Barista;
}());
exports.Barista = Barista;
