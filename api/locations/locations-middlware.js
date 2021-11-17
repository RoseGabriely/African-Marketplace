const Locations = require("./locations-model");

const checkLocationId = async (req, res, next) => {
  try {
    const existing = await Locations.findByFilter(req.params);
    if (!existing) {
      next({
        status: 404,
        message: `location with location_id: ${req.params.location_id} not found`,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateLocation = async (req, res, next) => {
  const { location_name } = req.body;
  if (
    location_name === undefined ||
    typeof location_name !== "string" ||
    !location_name.trim()
  ) {
    next({ status: 400, message: "invalid location_name" });
  } else if (await Locations.findByFilter({ location_name })) {
    next({ status: 400, message: "location_name must be unique" });
  } else {
    next();
  }
};

const validateItem = (req, res, next) => {
  const { item_name, item_description, item_price } = req.body;

  if (
    !item_name ||
    !item_name.trim() ||
    typeof item_name !== "string" ||
    typeof item_price !== "number" ||
    !item_description ||
    !item_description.trim() ||
    typeof item_description !== "string"
  ) {
    next({ status: 400, message: "invalid item" });
  } else {
    next();
  }
};

module.exports = {
  checkLocationId,
  validateLocation,
  validateItem,
};
