const express = require("express");
const app = express();
const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://chaimaboutou:chadmin@cluster0.5hulyzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoURL).then(() => { console.log("db connected") }).catch((e) => (console.log(e)));

require("./UserModel")
const User = mongoose.model("UserInfo")

app.get("/", (req, res) => {
    res.send({ status: "Started" })
})

app.listen(5051, () => {
    console.log("node js server started")
})

app.post("/signup", async (req, res) => {
    const { lname, fname, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.send({ status: "error", data: "User already exists!" });
    }
    try {
        await User.create({
            lname: lname,
            fname: fname,
            email: email,
            password: password,
        });
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        res.send({ status: error, data: error });
    }

})