const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
require("dotenv").config()
let uri = process.env.URI

mongoose.connect(uri)
    .then(() => {
        console.log("Database is connected");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

userSchema.methods.comparedPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

let Student = mongoose.model("Student", userSchema);

module.exports = Student;
