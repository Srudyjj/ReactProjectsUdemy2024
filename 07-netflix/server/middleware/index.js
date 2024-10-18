const JWT = require("jsonwebtoken");

const makeError = (res) =>
  res.status(403).json({
    errors: [
      {
        msg: "Unauthorized",
      },
    ],
  });

module.exports = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return makeError(res);

  const jwt = bearerToken.split("Bearer ")[1];
  if (!jwt) return makeError(res);

  try {
    const payload = await JWT.verify(jwt, process.env.JSON_WEB_TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return makeError(res);
  }
};
