let jwt = require("jsonwebtoken");

let auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    let decoded = jwt.verify(token, "monday");
    if (decoded) {
      req.body.user = decoded.userID;
      next();
    } else {
      res.status(400).send({ msg: "Wrong Token" });
    }
  } else {
    res.status(400).send({ msg: "Please Login first" });
  }
};

module.exports = {
  auth,
};
