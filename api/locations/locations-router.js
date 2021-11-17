const router = require("express").Router();
const {
  checkLocationId,
  validateLocation,
  validateItem,
} = require("./locations-middlware");
const Locations = require("./locations-model");

router.get("/", (req, res, next) => {
  Locations.findAllLocations()
    .then((locations) => {
      res.json(locations);
    })
    .catch(next);
});

router.get("/:location_id", checkLocationId, (req, res, next) => {
  Locations.findByLocationId(req.params.location_id)
    .then((location) => {
      res.status(200).json(location);
    })
    .catch(next);
});

router.post("/", validateLocation, (req, res, next) => {
  Locations.addLocation(req.body)
    .then((location) => {
      res.status(201).json(location);
    })
    .catch(next);
});

router.post(
  "/:location_id/item",
  checkLocationId,
  validateItem,
  (req, res, next) => {
    Locations.addItem(req.params.location_id, req.body)
      .then((newItem) => {
        res.status(201).json(newItem);
      })
      .catch(next);
  }
);

module.exports = router;
