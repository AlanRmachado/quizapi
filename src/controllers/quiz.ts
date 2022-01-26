import { Request, Response } from 'express';
import { format } from 'date-fns-tz';

//types
import TypeQuiz from "../@interfaces/quiz"
import db from "../db/db"
import QuizModel from '../models/quiz';
import QuestionsModel from '../models/questions';
import AnswersModel from '../models/answers';



export default class QuizController {



  public async cadQuiz(req: Request<{}, {}, TypeQuiz>, res: Response): Promise<Response> {
    try {
      // Validação dos parâmetros

      if (!req.body) return res.status(409).json({ status: 409, message: "Bad request" });
      if (!req.body.descricao || !req.body.quiz || !req.body.user || req.body.quiz.length === 0) {
        return res.status(409).json({ status: 409, message: "Bad request" });
      }

      const body = req.body;

      // Inicia a inserção
      const t = await db.transaction();
      try {

        const hasQuiz = await QuizModel.findAll({
          where: {
            descricao: body.descricao
          }
        });

        if (hasQuiz.length > 0) {
          return res.status(200).json({ status: 2, message: "Quiz já existe" });
        }

        const quiz = await QuizModel.create({
          descricao: body.descricao,
          user: body.user,
        }, { transaction: t });

        for (let i = 0; i < body.quiz.length; i++) {
          const q = body.quiz[i];

          const question = await QuestionsModel.create({
            descricao: q.question,
            quiz: quiz.quiz
          }, { transaction: t });

          for (let j = 0; j < q.answers.length; j++) {
            const a = q.answers[j];
            await AnswersModel.create({
              descricao: a.descricao,
              question: question.question,
              simbol: a.simbol,
              value: a.value
            }, { transaction: t });
          }
        }

        await t.commit();

      } catch (error) {
        t.rollback();
        return res.status(500).json({ status: 500, message: error });
      }

      return res.status(200).json({ status: 0, message: "success" });

    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  }





  public async getQuiz(req: Request, res: Response): Promise<Response> {
    const quiz_id = req.params.id;

    if (!quiz_id) return res.status(409).json({ status: 409, message: "Bad request" });

    const quiz = await QuizModel.findAll({
      where: {
        quiz: quiz_id
      }
    });

    if (quiz.length === 0) return res.status(404).json({ status: 409, message: "Not found" });

    const resultQuiz: any = [];

    for (const q of quiz) {
      const { descricao, user } = q;

      const question: any = await QuestionsModel.findAll({
        where: {
          quiz: q.quiz
        }
      });

      if (!question) return res.status(404).json({ status: 409, message: "Not found or incomplete" });

      let questionObject: any = {};
      let auxQuix: Array<any>;
      auxQuix = [];
      for (const qs of question) {
        questionObject.answers = [];

        const answers: AnswersModel[] = await AnswersModel.findAll({
          where: {
            question: qs.question
          }
        });

        for (const a of answers) {
          questionObject.answers.push(a);
        }

        auxQuix.push({
          question: qs.descricao,
          answers: questionObject.answers
        })
      }



      resultQuiz.push({
        descricao,
        user,
        quiz: auxQuix
      })



    }


    return res.status(200).json({ data: resultQuiz });
  }



}
