"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db"));
const Cargos = db_1.default.define('cargos', {
    cargo: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: sequelize_1.DataTypes.STRING },
});
exports.default = Cargos;
