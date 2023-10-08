import { sql } from "../database/database.js";

const addUser = async (email, password) => {
  await sql`INSERT INTO users
      (email, password)
        VALUES (${email}, ${password})`;
};

const isAdmin = async (userId) => {
  const rows =
    await sql`SELECT * FROM users WHERE id = ${userId} AND admin = true`;
  return rows.length > 0;
};

const findUserByEmail = async (email) => {
  const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
  return rows;
};

export { addUser, findUserByEmail, isAdmin };
