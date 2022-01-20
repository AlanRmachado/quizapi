"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_tz_1 = require("date-fns-tz");
const cargos_1 = __importDefault(require("../models/cargos"));
const usuarios_1 = __importDefault(require("../models/usuarios"));
class QuizController {
    static sum(req, res) {
        return res.json({ result: 20 * 85 });
    }
    static cadQuiz(req, res) {
        res.status(200).json({ message: 'Foi' });
    }
    static cadUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body || {};
            if (!body.nome || !body.idade || !body.cargo) {
                return res.status(409).json({ message: 'Faltam campos no body' });
            }
            const hasUser = yield usuarios_1.default.findAll({
                where: {
                    nome: body.nome,
                },
            });
            if (hasUser.length > 0) {
                return res.status(200).json({ message: 'Cadastro já existe' });
            }
            const hasCargo = yield cargos_1.default.findAll({
                where: {
                    cargo: body.cargo,
                },
            });
            if (hasCargo.length === 0) {
                return res.status(404).json({ message: 'Cargo informado não existe.' });
            }
            const userCreate = yield usuarios_1.default.create({
                nome: body.nome,
                idade: body.idade,
                cargo: body.cargo,
            });
            return res.status(200).json({ message: 'Sucesso', id: userCreate.usuario });
        });
    }
    static cadCargo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body || {};
            if (!body.nome) {
                return res.status(409).json({ message: 'Faltam campos no body' });
            }
            const hasCargo = yield cargos_1.default.findAll({
                where: {
                    cargo: body.cargo,
                },
            });
            if (hasCargo.length === 0) {
                return res.status(404).json({ message: 'Cargo informado não existe.' });
            }
            const cargoCreate = yield cargos_1.default.create(...body);
            return res.status(200).json({ message: 'Sucesso', id: cargoCreate.cargo });
        });
    }
    static getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield usuarios_1.default.findAll();
            let result = users;
            if (users.length > 0) {
                result = users.map((u) => ({
                    nome: u.nome,
                    idade: u.idade,
                    cargo: u.cargo,
                    createdAt: (0, date_fns_tz_1.format)(u.createdAt, 'dd/MM/yyyy HH:mm', {
                        timeZone: 'America/Sao_Paulo',
                    }),
                }));
            }
            return res.status(200).json({ message: 'Sucesso', users: result });
        });
    }
    static getCargos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cargos = yield cargos_1.default.findAll();
            return res.status(200).json({ message: 'Sucesso', cargos });
        });
    }
}
exports.default = QuizController;
