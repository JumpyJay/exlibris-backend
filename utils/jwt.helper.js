const jwt = require('jsonwebtoken');

// Logic for signing an access token
const signAccessToken = (userId) => {
    const payload = { id: userId };
    const secret = process.env.ACCESS_TOKEN_SECRET; // Store this in your .env file
    const options = { expiresIn: '15m' }; // Token expires in 15 minutes

    return jwt.sign(payload, secret, options);
};

function signRefreshToken(session) {
  return jwt.sign(
    { sub: session.userId, sid: session.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d", issuer: "exlibris", audience: "exlibris-web" }
  );
}

module.exports = { signAccessToken, signRefreshToken };