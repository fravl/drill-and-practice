import { sql } from "../database/database.js";
import { isAdmin } from "./userService.js";

const addTopic = async (userId, name) => {
  if (await isAdmin(userId)) {
    await sql`INSERT INTO topics
  (user_id, name)
    VALUES (${userId}, ${name})`;
  }
};

const getTopics = async () => {
  return await sql`SELECT * FROM topics ORDER BY name ASC`;
};

const getTopicCount = async () => {
  const countRow = await sql`SELECT COUNT(*) FROM topics`;
  return countRow[0].count;
};

const getTopicsWithQuestionCount = async () => {
  return await sql`
  SELECT t.id, t.name, COUNT(q.id) AS question_count
  FROM topics t
  LEFT JOIN questions q ON t.id = q.topic_id
  GROUP BY t.id, t.name
  ORDER BY t.name ASC;`;
};

const getTopic = async (topicId) => {
  const rows = await sql`SELECT * FROM topics WHERE id=${topicId}`;
  return rows[0];
};

const deleteTopic = async (topicId, userId) => {
  if (await isAdmin(userId)) {
    await sql`DELETE FROM topics WHERE id=${topicId}`;
  }
};

export {
  addTopic,
  getTopics,
  getTopic,
  getTopicCount,
  getTopicsWithQuestionCount,
  deleteTopic,
};
