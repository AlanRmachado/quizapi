"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quiz_1 = __importDefault(require("./controllers/quiz"));
function router(app) {
    const rotas = express_1.default.Router();
    rotas.get("/oi", quiz_1.default.sum);
    rotas.post("/cadquiz", quiz_1.default.cadQuiz);
    rotas.post("/cadusuario", quiz_1.default.cadUser);
    rotas.post("/cadcargo", quiz_1.default.cadCargo);
    rotas.get("/usuarios", quiz_1.default.getUsuarios);
    rotas.get("/cargos", quiz_1.default.getCargos);
    return app.use(rotas);
}
exports.default = router;
