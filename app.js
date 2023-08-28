const express = require("express");
const app = express();
const dotenv = require("dotenv");
const User = require("./models/userModel");
const dataBaseConnetivity = require("./config/db");
const cors = require("cors");
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 4500

dotenv.config({ path: "config/config.env" });

// const dbConnection = dataBaseConnetivity();
dataBaseConnetivity(); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: `${process.env.SENDER_MAIL}`, // Your email address (sender)
    pass: `${process.env.SENDER_PASSWORD}`, // Your email password or app-specific password
  },
});


app.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("Error in contact form");
      return res.status(400).json({
        success: false,
        message: "Error: Fill in all fields in the contact form",
      });
    }

    const user = await User.create({
      name,
      email,
      phone,
      message,
    });

    // Send email to user using Nodemailer
    const userMailOptions = {
      from: process.env.SENDER_MAIL,
      to: email,
      subject: "Thank you for contacting us",
      text: `Hello ${name},\n\nThank you for reaching out to us. Your message has been received, and we will get back to you shortly.\n\nBest regards,\n Abu Azhar`,
    };

    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.log("Error sending user email:", error);
      } else {
        console.log("User email sent:", info.response);
      }
    });

    // Send email to yourself (notification email)
    const adminMailOptions = {
      from:email,
      to: process.env.SENDER_MAIL,
      subject: "New Contact Form Submission",
      text: `A new contact form has been submitted:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.log("Error sending admin email:", error);
      } else {
        console.log("Admin email sent:", info.response);
      }
    });

    res.status(200).json({
      success: true,
      message: "Your Contact Form has been submitted successfully",
    });
  } catch (error) {
    console.log("Error saving form data:", error);
    res.status(500).json({
      success: false,
      message: "Error Saving Form data",
    });
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
