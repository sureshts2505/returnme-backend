const jwt = require("jsonwebtoken");
const SECRET_KEY = "mysupersecretkey";

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).send("No token");

    try {
        const verify = jwt.verify(token, SECRET_KEY);
        req.user = verify;
        next();
    } catch {
        res.status(400).send("Invalid token");
    }
};

module.exports = auth;