const express = require('express');
require("dotenv").config();
const cors = require("cors")
const route = require('./src/routes/index');
const db = require('./src/config/db');
const app = express();
const passport = require('./src/config/passport');

//middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

db();
app.use('/', route)
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server running on  ${PORT}`)
})