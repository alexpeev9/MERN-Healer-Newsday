const jwt = require("jsonwebtoken")

const adminMiddleware = (req, res, next) => {
    const cookieName = "token";
    const token = req.cookies[cookieName];

    if (token) {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET)
            if(data.isAdmin == true)
            {
                return next();
            }
            return res.status(401).json({ ok: false, message: "Not Administrator!" })
        } catch (e) {
            res.clearCookie(cookieName)
            return res.status(401).json({ ok: false, message: "Unauthorized!" });
        }
    }
    return res.status(401).json({ ok: false, message: "You must be logged!" });
}

module.exports = adminMiddleware
