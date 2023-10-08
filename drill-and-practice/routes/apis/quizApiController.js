import * as questionsService from "../../services/questionsService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";

const getRandomQuestion = async ({ response }) => {
  const questionCount = await questionsService.getQuestionsCount();
  if (questionCount > 0) {
    const randomQuestionRows = await questionsService.getRandomQuestion();
    const randomQuestion = randomQuestionRows[0];
    const answerOptions = await questionAnswerService.getQuestionAnswers(
      randomQuestion.id
    );
    response.body = {
      questionId: randomQuestion.id,
      questionText: randomQuestion.question_text,
      answerOptions: answerOptions.map((o) => {
        return { optionId: o.id, optionText: o.option_text };
      }),
    };
  } else {
    response.body = {};
  }
};

const postQuestionAnswer = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const answer = await body.value;

  if (
    !answer.questionId ||
    !answer.optionId ||
    isNaN(answer.questionId) ||
    isNaN(answer.optionId)
  ) {
    response.status = 401;
    return;
  }
  const questionAnswer = await questionAnswerService.getQuestionAnswer(
    parseInt(answer.optionId)
  );

  if (
    !questionAnswer ||
    questionAnswer.length === 0 ||
    questionAnswer[0].question_id != answer.questionId
  ) {
    response.status = 404;
    return;
  }

  response.body = { correct: questionAnswer[0].is_correct };
};
export { getRandomQuestion, postQuestionAnswer };
