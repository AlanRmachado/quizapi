import express from "express";
import QuizController from "./controllers/quiz";
import UserControllerClasss from "./controllers/user"

export default function router(app) {
  const rotas = express.Router();


  //Classes
  const Quiz = new QuizController();
  const UserController = new UserControllerClasss();


  //Métodos
  rotas.post("/quiz", Quiz.cadQuiz);
  rotas.get("/quiz/:id", Quiz.getQuiz);
  rotas.post("/user", UserController.cadUser);

  return app.use(rotas)
}

