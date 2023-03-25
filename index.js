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
app.use(express.static("public")); // store files in server

//route imports
app.use(require("./routes/authentication"));

app.use(require("./routes/users"));
app.use(require("./routes/sample"));
app.use(require("./routes/userroles"));
app.use(require("./routes/departments"));
app.use(require("./routes/jobtitles"));
app.use(require("./routes/chapters"));
app.use(require("./routes/chapterReport"));
app.use(require("./routes/unit"));
app.use(require("./routes/chapter"));
app.use(require("./routes/overviewReport"));
app.use(require("./routes/quizSubmissions"));
app.use(require("./routes/ktsessionRating"));
app.use(require("./routes/articleRating"));
app.use(require("./routes/leaderboard"));
app.use(require("./routes/submissionTable"));
app.use(require("./routes/evaluateSubmission"));
app.use(require("./routes/general"));
app.use(require("./routes/guidanceTicket"));
app.use(require("./routes/discussionForum"));
app.use(require("./routes/ktSessionComment"));
app.use(require("./routes/articlelComment"));
app.use(require("./routes/report"));
app.use(require("./routes/downloadSubmission"));

app.use("/units", require("./routes/units"));
app.use("/kts", require("./routes/ktsessions"));
app.use("/arts", require("./routes/articles"));

app.use((req, res, next) => {
  console.log("Server Accessed");
  next();
});

mongoose.set("strictQuery", false);
// format
// mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
// const connUrl = "mongodb://127.0.0.1:27017/nets";
// const connUrl = "mongodb://localhost:27017/NETS";
const connUrl =
  "mongodb+srv://admin:o2rRfSYGKkUCHG8s@cluster0.eh378xa.mongodb.net/netsTest?retryWrites=true&w=majority";

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
