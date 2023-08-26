const mongoose = require("mongoose");

const dataBaseConnetivity = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    })
    .then((data) => {
      console.log(`DataBase Working Properly ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(`DataBase not Working ${err}`);
    });
};

module.exports = dataBaseConnetivity;
