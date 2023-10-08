import * as topicsService from "../../services/topicsService.js";
import * as questionsService from "../../services/questionsService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";
import * as quizAnswerService from "../../services/quizAnswerService.js";

const showTopics = async ({ render }) => {
  render("quiz.eta", {
    topics: await topicsService.getTopicsWithQuestionCount(),
  });
};

const quizTopic = async ({ response, params }) => {
  const questionRows = await questionsService.getQuestions(params.tId);

  if (questionRows && questionRows.length > 0) {
    const qId =
      questionRows[Math.floor(Math.random() * questionRows.length)].id;
    response.redirect(`/quiz/${params.tId}/questions/${qId}`);
  } else {
    response.body = "No questions for this topic exist.";
  }
};

const showQuizQuestion = async ({ params, render }) => {
  render("quizQuestion.eta", {
    question: await questionsService.getQuestion(params.qId),
    question_answer_options: await questionAnswerService.getQuestionAnswers(
      params.qId
    ),
  });
};

const checkQuizAnswer = async ({ params, response, user }) => {
  await quizAnswerService.addQuizAnswer(user.id, params.qId, params.oId);
  const chosenAnswerRows = await questionAnswerService.getQuestionAnswer(
    params.oId
  );

  if (chosenAnswerRows[0].is_correct) {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
  }
  if (!chosenAnswerRows[0].is_correct) {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
  }
};

const correctAnswer = async ({ render, params }) => {
  render("correct.eta", { topicId: params.tId });
};

const incorrectAnswer = async ({ render, params }) => {
  render("incorrect.eta", {
    topicId: params.tId,
    correctAnswers: await questionAnswerService.getCorrectQuestionAnswers(
      params.qId
    ),
  });
};

export {
  showTopics,
  quizTopic,
  checkQuizAnswer,
  showQuizQuestion,
  correctAnswer,
  incorrectAnswer,
};
