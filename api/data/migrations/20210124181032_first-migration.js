exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 36).unique().notNullable();
      users.string("password", 100).notNullable();
    })
    .createTable("locations", (tbl) => {
      tbl.increments("location_id");
      tbl.string("location_name", 128).unique().notNullable();
    })
    .createTable("items", (tbl) => {
      tbl.increments("item_id");
      tbl
        .integer("location_id")
        .unsigned()
        .notNullable()
        .references("location_id")
        .inTable("locations")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl.string("item_name", 128).notNullable();
      tbl.string("item_description", 128).notNullable();
      tbl.string("item_price", 128).notNullable();
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("items");
  await knex.schema.dropTableIfExists("locations");
  await knex.schema.dropTableIfExists("users");
};
