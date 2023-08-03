require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/TaskRoutes");

const app = express();
const server = require("http").createServer(app);

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//middle vware
app.use(express.json()); //post coming request data checks
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/Task", taskRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    server.listen(process.env.PORT, () => {
      console.log(`listening to port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
