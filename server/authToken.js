const { sign } = require('jsonwebtoken');
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

const createAccessToken = (user) => {
    return sign({ userID: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
};

// TODO: add token version
const createRefreshToken = (user) => {
    return sign({ userID: user.id }, REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
};

module.exports = { createAccessToken, createRefreshToken };
