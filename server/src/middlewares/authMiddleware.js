const jwt = require("jsonwebtoken")

exports.isAuthenticated = (req, res, next) => {
    const cookieName = "token";
    const token = req.cookies[cookieName];

    if (token) {
        try {
            req.body.requestSender = jwt.verify(token, process.env.JWT_SECRET)
            return next();
        } catch (e) {
            res.clearCookie(cookieName)
            return res.status(401).json({ ok: false, message: "Unauthorized!" });
        }
    }
    return res.status(401).json({ ok: false, message: "You must be logged!" });
}

exports.isAuthorized = (req, res, next) => {
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