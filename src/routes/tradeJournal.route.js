const express = require("express");
const route = express.Router();

const {
  createTradeJournal,
  getAllTradeJournals,
  getTradeJournal,
  updateTradeJournal,
  deleteTradeJournal,
} = require("../controllers/tradeJournal.controller");

route.post("/", createTradeJournal);
route.get("/", getAllTradeJournals);
route.get("/:id", getTradeJournal);
route.put("/:id", updateTradeJournal);
route.delete("/:id", deleteTradeJournal);

module.exports = route;
