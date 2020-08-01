'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var Tickets = /** @class */ (function () {
  function Tickets() {
    this.queue = [];
  }
  Tickets.prototype.addItem = function (drink) {
    this.queue.push(drink);
    logger.info(drink, 'added to the tickets.');
  };
  Tickets.prototype.removeItem = function () {
    if (this.queue.length) {
      return this.queue.shift();
    }
  };
  return Tickets;
})();
exports.Tickets = Tickets;
