"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Configurations of logger.
 */
var winston_1 = __importDefault(require("winston"));
var consoleConfig = [new winston_1.default.transports.Console()];
exports.logger = winston_1.default.createLogger({
    transports: consoleConfig,
});
