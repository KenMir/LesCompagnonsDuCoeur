const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({


    firstname: String,
    lastname: String,
    email: String,
    password: String,
    number: Number,
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;