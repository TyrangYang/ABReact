const { sign } = require('jsonwebtoken');
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

const createAccessToken = (user) => {
    return sign({ userID: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
};

const createRefreshToken = (user) => {
    return sign({ userID: user.id, tokenVersion: user.tokenVersion }, REFRESH_TOKEN_SECRET, {
        expiresIn: '1d',
    });
};

module.exports = { createAccessToken, createRefreshToken };
