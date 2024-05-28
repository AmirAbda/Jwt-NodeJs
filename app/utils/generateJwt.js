const jwt = require("jsonwebtoken");
require("dotenv").config();

const options = {
    expiresIn: "1h",
};

async function generateJwt(email, userId) {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }

        const payload = { email: email, id: userId };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
        return { error: false, token: token };
    } catch (error) {
        return { error: true, message: error.message };
    }
}

module.exports = { generateJwt };
