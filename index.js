const express = require('express'); 
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors()); 
app.use(express.json());
app.use(require("./routes/record"));
app.use(require("./routes/authentication"));

mongoose.set('strictQuery', false);
//  format
//  mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://admin:o2rRfSYGKkUCHG8s@cluster0.eh378xa.mongodb.net/netsTest?retryWrites=true&w=majority')
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));


app.get("/", (req, res) => {
    return res.json({ message: "Access to this page is not allowed", active: false});
});

app.listen(1337, () => {
    console.log("Node Server running on port 1337");
})
