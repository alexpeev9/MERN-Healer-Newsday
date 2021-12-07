const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const cookieName = "token";
    const token = req.cookies[cookieName];

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET)
            return next();
        } catch (e) {
            res.clearCookie(cookieName)
            return res.status(401).json({ ok: false, message: "Unauthorized!" });
        }
    }
    return res.status(401).json({ ok: false, message: "You must be logged!" });
}

module.exports = authMiddleware
