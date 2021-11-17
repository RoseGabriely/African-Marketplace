const db = require("../data/db-config");

function findAllLocations() {
  return db("locations");
}

async function findByLocationId(id) {
  const locations = await db("locations as l")
    .leftJoin("items as i", "l.location_id", "i.location_id")
    .select(
      "l.location_id",
      "l.location_name",
      "i.item_id",
      "i.item_name",
      "i.item_description",
      "i.item_price"
    )
    .where("l.location_id", id)
    .orderBy("l.location_id", "asc");

  let results = { items: [] };
  for (let item of locations) {
    if (!results.location_id) {
      results.location_id = item.location_id;
      results.location_name = item.location_name;
    }
    if (item.item_id) {
      results.items.push({
        item_id: item.item_id,
        item_name: item.item_name,
        item_description: item.item_description,
        item_price: item.item_price,
      });
    }
  }
  return results;
}

async function addLocation(location) {
  return await db("locations").insert(location, [
    "location_id",
    "location_name",
  ]);
}

function findByFilter(filter) {
  return db("locations").where(filter).first();
}

function addItem(location_id, item) {
  return db("items").insert({ ...item, location_id }, [
    "item_id",
    "item_name",
    "item_description",
    "item_price",
  ]);
}

module.exports = {
  findAllLocations,
  findByLocationId,
  addLocation,
  findByFilter,
  addItem,
};
