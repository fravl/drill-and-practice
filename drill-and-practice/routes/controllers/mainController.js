import * as topicsService from "../../services/topicsService.js";
import * as questionsService from "../../services/questionsService.js";
import * as quizAnswerService from "../../services/quizAnswerService.js";

const showMain = async ({ render }) => {
  render("main.eta", {
    topicCount: await topicsService.getTopicCount(),
    questionCount: await questionsService.getQuestionsCount(),
    answerCount: await quizAnswerService.getQuizAnswerCount(),
  });
};

export { showMain };
