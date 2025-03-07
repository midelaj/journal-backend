const express = require("express");
const passport = require("passport");
const userRoute = require("./user.route");
const tradeJournalRoute = require("./tradeJournal.route");
const route = express.Router();

route.use('/user',userRoute);
route.use('/trade',passport.authenticate("jwt", {session:false}),tradeJournalRoute);

module.exports = route;