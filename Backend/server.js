const express = require("express");
const app = express();
const knex = require("./db-config");
var cors = require("cors");
const port = 3000;
const { databaseChecker } = require("./services/tasksService");

setInterval(databaseChecker, 5000);

app.use(express.json());
app.use(cors());

app.get("/urls", async (req, res) => {
  const tasks = await knex("tasks");

  res.json({ tasks });
});

app.get("/urls/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await knex("tasks").where({ id }).first();
    res.json({ task });
  } catch {
    res.sendStatus(404);
  }
});

app.post("/urls", async (req, res) => {
  const url = req.body.url;
  const createdTask = await knex("tasks").insert({ url }).returning("*");
  console.log(createdTask);
  res.json({ createdTask });
});

app.delete("/urls/:id", async (req, res) => {
  const id = req.params.id;
  await knex("tasks").where({ id }).delete();
  res.sendStatus(204);
});

app.listen(port, () => console.log(`app listening on port ${port}`));
