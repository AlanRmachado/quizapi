"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db"));
const cargos_1 = __importDefault(require("./cargos"));
const Usuarios = db_1.default.define('usuarios', {
    usuario: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: sequelize_1.DataTypes.STRING },
    idade: { type: sequelize_1.DataTypes.INTEGER },
    cargo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: cargos_1.default,
            key: 'cargo',
        },
    },
});
exports.default = Usuarios;
