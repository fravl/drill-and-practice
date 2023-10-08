import { sql } from "../database/database.js";

const addQuestion = async (userId, topicId, text) => {
  await sql`INSERT INTO questions
      (user_id, topic_id, question_text)
        VALUES (${userId}, ${topicId}, ${text})`;
};

const getQuestions = async (topicId) => {
  return await sql`SELECT * FROM questions WHERE topic_id=${topicId}`;
};

const getQuestionsCount = async () => {
  const countRow = await sql`SELECT COUNT(*) FROM questions`;
  return countRow[0].count;
};

const getRandomQuestion = async () => {
  return await sql`SELECT * FROM questions
  ORDER BY random()
  LIMIT 1`;
};

const getQuestion = async (questionId) => {
  const rows = await sql`SELECT * FROM questions WHERE id=${questionId}`;
  return rows[0];
};

const deleteQuestion = async (questionId) => {
  await sql`DELETE FROM questions WHERE id=${questionId}`;
};

export {
  addQuestion,
  getQuestions,
  getQuestion,
  getRandomQuestion,
  getQuestionsCount,
  deleteQuestion,
};
