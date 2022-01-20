"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = new sequelize_1.default.Sequelize('testes', 'alannode', '123', {
    host: 'localhost',
    dialect: 'postgres',
});
exports.default = sequelize;
