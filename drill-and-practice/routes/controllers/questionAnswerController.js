import * as questionsService from "../../services/questionsService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";
import { validasaur } from "../../deps.js";

const addQuestionAnswer = async ({ params, request, response, render }) => {
  const body = request.body({ type: "form" });
  const bodyParams = await body.value;

  const answerData = {
    option_text: bodyParams.get("option_text"),
  };

  const [passes, errors] = await validasaur.validate(answerData, {
    option_text: [validasaur.required, validasaur.minLength(1)],
  });

  if (!passes) {
    render("questionDetails.eta", {
      question: await questionsService.getQuestion(params.qId),
      question_answer_options: await questionAnswerService.getQuestionAnswers(
        params.qId
      ),
      optionText: answerData.option_text,
      validationErrors: errors,
    });
  } else {
    const isCorrect = !!bodyParams.get("is_correct");

    await questionAnswerService.addQuestionAnswer(
      params.qId,
      bodyParams.get("option_text"),
      isCorrect
    );

    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
  }
};

const deleteQuestionAnswer = async ({ params, response }) => {
  await questionAnswerService.deleteQuestionAnswer(params.oId);

  response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

export { addQuestionAnswer, deleteQuestionAnswer };
