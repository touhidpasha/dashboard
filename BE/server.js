const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var app = express();

var corsOptions = {
  origin: "http://localhost:3000", //aloow request from this origin
  credentials: true,
  optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Connecting to the database
const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/dashboard", { //mongodb url/endpoint dashboard:database name
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  }

  console.log("Successfully connected to the database");
};

const DashboardSchema = new mongoose.Schema({//scheme of collection/table
  deiveId: String,
  clientIp: String,
  hostName: String,
  download: String,
  upload: String,
  usageSeconds: String,
  deicreatedAt: String,
});
const Dashboard = mongoose.model("Dashboard", DashboardSchema);

app.get("/", function (req, res) { //route to get all the data from mongodb and returns as responce
  const findAll = async () => {
    try {
      let data = await Dashboard.find();
      console.log("data -> " + data);
      res.status(200).send({ msg: "success", data });
    } catch (err) {
      res
        .status(404)
        .send({ msg: "failure in getting data from DB", err: err });
    }
  };

  findAll();
});
app.listen(5000, () => {
  dbConnect();  //connecting DB after starting server
  console.log("BE servre running at port 5000");
});
