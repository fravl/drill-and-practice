import { sql } from "../database/database.js";

const getQuestionAnswers = async (questionId) => {
  return await sql`SELECT * FROM question_answer_options WHERE question_id=${questionId}`;
};

const getCorrectQuestionAnswers = async (questionId) => {
  return await sql`SELECT * FROM question_answer_options WHERE question_id=${questionId} AND is_correct=TRUE`;
};

const getQuestionAnswer = async (optionId) => {
  return await sql`SELECT * FROM question_answer_options WHERE id=${optionId}`;
};

const addQuestionAnswer = async (questionId, optionText, isCorrect) => {
  await sql`INSERT INTO question_answer_options 
      (question_id, option_text, is_correct)
        VALUES (${questionId}, ${optionText}, ${isCorrect})`;
};

const deleteQuestionAnswer = async (answerId) => {
  await sql`DELETE FROM question_answer_options WHERE id=${answerId}`;
};

export {
  getQuestionAnswers,
  getQuestionAnswer,
  getCorrectQuestionAnswers,
  addQuestionAnswer,
  deleteQuestionAnswer,
};
