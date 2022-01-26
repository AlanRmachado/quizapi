export default interface IQuiz {
  descricao: string,
  user: number;
  quiz: {
    question: string;
    answers: {
      descricao: string;
      simbol: string;
      value: number;
    }[]
  }[]
}