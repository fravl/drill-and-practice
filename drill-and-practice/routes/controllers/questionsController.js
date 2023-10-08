import * as questionsService from "../../services/questionsService.js";
import * as topicsService from "../../services/topicsService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";
import { validasaur } from "../../deps.js";

const addQuestion = async ({ params, request, response, render, user }) => {
  const body = request.body({ type: "form" });
  const bodyParams = await body.value;

  const questionData = {
    question_text: bodyParams.get("question_text"),
  };

  const [passes, errors] = await validasaur.validate(questionData, {
    question_text: [validasaur.required, validasaur.minLength(1)],
  });

  if (!passes) {
    render("topicDetails.eta", {
      topic: await topicsService.getTopic(params.tId),
      questions: await questionsService.getQuestions(params.tId),
      questionText: questionData.question_text,
      validationErrors: errors,
    });
  } else {
    await questionsService.addQuestion(
      user.id,
      params.tId,
      bodyParams.get("question_text")
    );

    response.redirect(`/topics/${params.tId}`);
  }
};

const showQuestionDetails = async ({ params, render }) => {
  render("questionDetails.eta", {
    question: await questionsService.getQuestion(params.qId),
    question_answer_options: await questionAnswerService.getQuestionAnswers(
      params.qId
    ),
  });
};

const deleteQuestion = async ({ params, response }) => {
  await questionsService.deleteQuestion(params.qId);

  response.redirect(`/topics/${params.tId}`);
};

export { addQuestion, showQuestionDetails, deleteQuestion };
