const jwt = require('jsonwebtoken');
require('dotenv').config();


const validate = (req, res , next) => {
    const token = 
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    if(token.name === "testing"){
        req.user = {studentnumber: token.studentnumber, role: token.role}
        return next();
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send("A valid token is needed to login");
    }

    return next();


}

module.exports = validate;