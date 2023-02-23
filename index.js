const express = require("express");const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// route imports
app.use(require("./routes/sample"));
app.use(require("./routes/authentication"));
app.use(require("./routes/users"));
app.use(require("./routes/departments"));
app.use(require("./routes/jobtitles"));
app.use(express.urlencoded({ extended: true }));// PostMan | POST -> Body -> x-www-form-urlencoded
app.use(express.json());
app.use(cors());
// uncomment this to allow cors only for localhost:3000
// app.use(cors({origin: ["http://localhost:3000"],methods: "GET,POST,PUT,DELETE,OPTIONS",}));


const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_LOCAL_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Database connected!")
    app.listen(PORT, () => {
      console.log("Node Server running on port " + PORT);
    });
  })
  .catch((err) => console.log(err));