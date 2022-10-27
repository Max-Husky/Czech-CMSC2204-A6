const express = require('express');
const mongoose = require('mongoose');

const dbUrl = "mongodb+srv://admin:M5tMmEGQ2K73p8G@cluster0.j7moqfs.mongodb.net/users?retryWrites=true&w=majority";

const PORT = 80;

// setting up mongo db connection
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Mongo Connected');
});

db.on('error', console.log.bind(console));

const User = db.model("User", require('./models/User.js'));

// setting up express
const app = express();
app.use(express.json());

app.listen(
  PORT,
  () => console.log(`Server Running on port: ${PORT}`);
);

// get one user
app.get('/getUser', async (req, res) => {
  try {
    let result = (await User.findOne({})).toJSON();
    res.status(200).send(result);
    console.debug('Successful Get: ' + result);
  } catch (err) {
    res.status(500).send(err);
    console.debug("Failed Get: " + err);
  };
});

// adding a user function
app.post("/addUser", async (req, res) => {
  try {
    let user = new User(req.body);
    await user.save();
    res.status(200).send(`Added user ${user.username} successfully`);
    console.debug('Successful Post: ' + user.toJSON());
  } catch (err) {
    res.status(500).send(err);
    console.debug('Failed Post: ' + err);
  }
});

process.on('exit', () => {db.close()});
