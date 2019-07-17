exports.up = function(knex) {
  return knex.schema.createTable("notes", table => {
    table.increments();
    table.string("title", 128).notNullable();
    table.text("note_body");
    table.integer("user_id").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("notes");
};
