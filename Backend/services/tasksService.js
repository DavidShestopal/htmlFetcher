const axios = require("axios").default;
const knex = require("../db-config");

async function fetchUrl({ id }) {
  const task = await knex("tasks").where({ id }).first();

  if (!task) {
    throw new Error(`Couldn't Find Task with ${id}`);
  }

  try {
    const response = await axios.get(task.url);
    return (
      await knex("tasks")
        .where({ id })
        .first()
        .update({ html: response.data, status: "completed" })
        .returning("*")
    )[0];
  } catch {
    return (
      await knex("tasks")
        .where({ id })
        .first()
        .update({ status: "failed" })
        .returning("*")
    )[0];
  }
}

async function databaseChecker() {
  const pendingTasks = await knex("tasks").where({ status: "pending" });
  pendingTasks.forEach((task) => {
    fetchUrl(task);
  });
}
module.exports = { fetchUrl, databaseChecker };
