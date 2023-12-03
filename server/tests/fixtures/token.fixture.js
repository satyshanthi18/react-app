const moment = require("moment");
const config = require("../../configs/config.json");
const { tokenTypes } = require("../../configs/tokens");
const tokenService = require("../../app/services/token.service");
const { userOne, admin } = require("./user.fixture");

const accessTokenExpires = moment().add(
  config.jwt.accessExpirationMinutes,
  "minutes"
);
const userOneAccessToken = tokenService.generateToken(
  userOne._id,
  accessTokenExpires,
  tokenTypes.ACCESS
);
const adminAccessToken = tokenService.generateToken(
  admin._id,
  accessTokenExpires,
  tokenTypes.ACCESS
);

module.exports = {
  userOneAccessToken,
  adminAccessToken,
};
