const jwt = require("jsonwebtoken");
const checkauth = (req, res, next) => {
const { authorization } = req.headers;
console.log(req.headers);
    try {
        const token= authorization.split(' ')[1];
        const decode= jwt.verify(token, process.env.TSECRET);
        const {name, id}= decode;
        req.name = decode.name;
        req.userid =id;
        next();
    } catch (error) {
        console.log(error);
        next("Authentication error")
    }
}
module.exports = checkauth;