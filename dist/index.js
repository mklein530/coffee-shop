"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var fs_1 = __importDefault(require("fs"));
var coffee_counter_1 = require("./coffee-counter");
var barista_1 = require("./barista");
var menu_1 = require("./menu");
var util_1 = __importDefault(require("util"));
var log_file = fs_1.default.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
var log_stdout = process.stdout;
console.log = function (log) {
    log_file.write(util_1.default.format(log) + '\n');
    log_stdout.write(util_1.default.format(log) + '\n');
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    function prompt() {
        return new Promise(function (resolve, reject) {
            commandLine.question('What drink would you like? (Enter None to exit)\n', function (answer) {
                if (answer === 'None' || answer === 'none') {
                    console.log('Exiting coffee shop');
                    resolve();
                    process.exit(0);
                }
                if (menu_1.MENU[answer]) {
                    barista.addWorkloadItem(answer);
                }
                else {
                    console.log(answer, "is not on the menu. Please choose something else or type 'none' to exit.\n");
                }
                resolve();
            });
        });
    }
    var commandLine, coffeeCounter, barista;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                commandLine = readline_1.default.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
                coffeeCounter = new coffee_counter_1.CoffeeCounter();
                barista = new barista_1.Barista(coffeeCounter);
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, prompt()];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}); })();