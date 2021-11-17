const db = require("../data/db-config");

async function addUser(user) {
  return await db("users").insert(user, ["user_id", "username", "password"]);
}

function findByUsername(username) {
  return db("users").where(username).first();
}

function findByFilter(filter) {
  return db("users").where(filter);
}

module.exports = {
  addUser,
  findByUsername,
  findByFilter,
};
