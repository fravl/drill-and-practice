import { sql } from "../database/database.js";

const addQuizAnswer = async (userId, questionId, optionId) => {
  return await sql`INSERT INTO question_answers
  (user_id, question_id, question_answer_option_id)
    VALUES (${userId}, ${questionId}, ${optionId})`;
};

const getQuizAnswerCount = async () => {
  const countRow = await sql`SELECT COUNT(*) FROM question_answers`;
  return countRow[0].count;
};

export { addQuizAnswer, getQuizAnswerCount };
