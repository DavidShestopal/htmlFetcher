/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("tasks", (t) => {
    t.increments("id");
    t.string("url").notNullable();
    t.text("html");
    t.string("status").notNullable().defaultTo("pending");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("tasks");
};
