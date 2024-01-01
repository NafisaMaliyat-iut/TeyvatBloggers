const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
        user: "teamtento336572@gmail.com", 
        pass: "xrlm dysu rdql xrtw",  
    },
});

const generateToken = () => {
    return crypto.randomBytes(20).toString("hex");
};


module.exports = {transporter, generateToken};