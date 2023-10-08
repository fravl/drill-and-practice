import { sql } from "../database/database.js";
import { validasaur } from "../deps.js";

export function unique(table, column) {
  return async function uniqueRule(value) {
    if (typeof value !== "string" && typeof value !== "number") {
      return invalid("unique", { value, table, column });
    }
    const data = await findOne(table, column, value);
    if (data !== null && data.length !== 0) {
      return validasaur.invalid("unique", { value, table, column });
    }
  };
}

const findOne = async (table, column, value) => {
  const rows = await sql`SELECT * FROM ${sql(table)} WHERE ${sql(
    column
  )} = ${value}`;
  return rows;
};
