const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/NETS")
  .then(() => console.log("Connected successfully"))
  .catch((error) => console.log(error));

const user = require("./Routes/user");
const unit = require("./Routes/unit");
const chapter = require("./Routes/chapter");
const overviewReport = require("./Routes/overviewReport");
const quizSubmission = require("./Routes/quizSubmissions");
const KtSession = require("./Routes/ktsession");

app.use(user);
app.use(unit);
app.use(chapter);
app.use(overviewReport);
app.use(quizSubmission);
app.use(KtSession);

app.listen(1337, () => console.log("Server is connected on 1337"));
