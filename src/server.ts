import express from 'express';
import routers from './routes';
import Quiz from "./models/quiz"
import Questions from "./models/questions"
import Answers from "./models/answers"
import Users from "./models/users"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routers(app);





async function InitDataBase() {
  await Quiz.sync();
  await Questions.sync();
  await Answers.sync();
  await Users.sync();
}

InitDataBase();

app.listen(5003, () => {
  console.log('Servidor ON');
});
