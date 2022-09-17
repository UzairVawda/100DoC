const express = require("express");
const router = express.Router();
const dbFuncs = require("../util/dbFuncs");
const uuid = require("uuid");

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';
  
  if (order !== 'asc' && order !== 'desc') {
    order = 'asc';
  }
  
  if (order === 'desc') {
    nextOrder = 'asc';
  }

  const data = dbFuncs.readDB();

  data.sort(function (resA, resB) {
    if (
      (order === 'asc' && resA.name > resB.name) ||
      (order === 'desc' && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.status(200).render("restaurants", {
    data: data,
    numberofRes: data.length,
    nextOrder: nextOrder
  });
});

router.get("/restaurants/:id", function (req, res) {
  const resID = req.params.id;
  const data = dbFuncs.readDB();

  for (const restaurant of data) {
    if (restaurant.id == resID) {
      return res.status(200).render("detailed", { restaurant: restaurant });
    }
  }
  res.status(404).render("404");
});

router.post("/recommendRes", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const data = dbFuncs.readDB();

  data.push(restaurant);
  dbFuncs.writeDB(data);
  res.status(200).redirect("/confirm");
});

module.exports = router;
