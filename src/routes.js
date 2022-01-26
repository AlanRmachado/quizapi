import express from "express";
import QuizController from "./controllers/quiz";
import UserControllerClasss from "./controllers/user"
import JwtMiddleware from "./middlewares/login"

export default function router(app) {
  const rotas = express.Router();


  //Classes
  const Quiz = new QuizController();
  const UserController = new UserControllerClasss();


  //Métodos
  rotas.post("/quiz", Quiz.cadQuiz);
  rotas.get("/quiz/:id", [JwtMiddleware.tokenValidate], Quiz.getQuiz);
  rotas.post("/user", UserController.cadUser);
  rotas.post("/login", UserController.Login);

  return app.use(rotas)
}

