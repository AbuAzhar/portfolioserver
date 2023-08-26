const mongoose = require("mongoose")


    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            require: [true, "Please Enter Your Name"]
        },
        email: {
            type: String,
            require: [true, "Please Enter Your Email"],
            unique: true,
        },
        phone: {
            type: Number,
            require: true,
            minLength: [7],
            maxlength: [12]
        },
        message: {
            type: String,
        }
    })

const UserModel = mongoose.model("Data", userSchema)
module.exports = UserModel;