const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const ideasRouter = require('./routes/ideas');
app.use('/ideas', ideasRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});