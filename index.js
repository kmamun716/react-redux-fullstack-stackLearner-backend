const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require('passport');
require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup passport
app.use(passport.initialize())
require('./passport')(passport)

//routes
app.use('/api/user/', require('./routes/userRoute'));
app.use('/api/transaction', require('./routes/transactionRoute'));

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

app.listen(port, () => {
  console.log(`server is running at port: ${port}`);
  //mongoose connection
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g1juc.mongodb.net/moneyManagement?retryWrites=true&w=majority`,
    () => {
      console.log("database connected successfully");
    }
  );
});
