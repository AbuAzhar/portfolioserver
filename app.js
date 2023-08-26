const express = require("express");
const app = express();
const dotenv = require("dotenv");
const User = require("./models/userModel");
const dataBaseConnetivity = require("./config/db"); // Correct the path if needed
const body_parser = require("body-parser");
const PORT = process.env.PORT || 3001
// DOTENV
dotenv.config({ path: "config/config.env" });

// database connection
dataBaseConnetivity(); // Call the function to establish the database connection

// middleware
app.use(express.json());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.post("https://abuazhar-portfolio.onrender.com", async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      phone,
      message,
    });
    res.status(200).json({
      success: true,
      message: "Your Form Submitted",
    });
  } catch (error) {
    console.log(`Error saving form data ${error}`);
    res.status(500).json({
      success: false,
      message: "Error Saving Form data",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
