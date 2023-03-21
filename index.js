const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.urlencoded({ extended: true })); // if we want to test with postman x-www-form-urlencoded
app.use(express.json());

//route imports
app.use(require("./routes/sample"));
app.use(require("./routes/authentication"));
app.use(require("./routes/users"));
app.use(require("./routes/userroles"));
app.use(require("./routes/departments"));
app.use(require("./routes/jobtitles"));
app.use(require("./routes/chapters"));
app.use(require("./routes/user"));
app.use(require("./routes/unit"));
app.use(require("./routes/chapter"));
app.use(require("./Routes/overviewReport"));
app.use(require("./Routes/quizSubmissions"));
app.use(require("./Routes/ktsessionRating"));
app.use(require("./routes/articleRating"));
app.use(require("./routes/leaderboard"));
app.use(require("./routes/submissionTable"));
app.use(require("./routes/evaluateSubmission"));
app.use(require("./routes/general"));

mongoose.set("strictQuery", false);
// format
// mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
const connUrl = "mongodb://127.0.0.1:27017/nets";
// const connUrl = "mongodb://localhost:27017/NETS";
// const connUrl = "mongodb+srv://admin:o2rRfSYGKkUCHG8s@cluster0.eh378xa.mongodb.net/netsTest?retryWrites=true&w=majority";
mongoose
  .connect(connUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true, //make this also true
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  return res.json({
    message: "Access to this page is not allowed",
    active: false,
  });
});

app.listen(1337, () => {
  ``;
  console.log("Node Server running on  port 1337");
});
