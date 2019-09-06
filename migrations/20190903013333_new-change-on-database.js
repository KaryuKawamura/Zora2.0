// If new table is created
exports.up = function (knex) {
  return knex.schema
    .createTable('UsersTable', function (table) {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('password', 255).notNullable();
      table.string('horoscope', 255);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('UsersTable');
};