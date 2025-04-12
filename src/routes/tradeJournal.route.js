const express = require("express");
const route = express.Router();

const {
  createJournal,
  updateJournal,
  getAllJournal,
  updateAllJournal,
} = require("../controllers/journalController");

route.post("/trade", createJournal);
route.put("/trade/:id", updateJournal);
route.get("/trade", getAllJournal);
route.put("/trade", updateAllJournal);

module.exports = route;
