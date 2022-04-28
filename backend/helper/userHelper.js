const jwt = require('jsonwebtoken');
module.exports = {
    fetchUser: (req, res, next) => {
        const token = req.headers['auth-token'];
        if (!token) {
            res.send({ error: "access denied..plz use valid token.." });
        }
        else {
            try {
                const data = jwt.verify(token, process.env.SECRETKEY);
                if (!data) {
                    console.log("data not present");
                }
                req.user = data.user;
                next();
            } catch (err) {
                res.send({ error: "access denied..plz use valid token" })
            }
        }
    }
}