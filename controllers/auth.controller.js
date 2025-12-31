// const { signAccessToken } = require('../utils/jwt.helper.js');

// exports.login = async (req, res) => {
//     try {
//         // 1. Validate user credentials (e.g., check DB, compare passwords)
//         // const user = await User.findOne({ email: req.body.email });
        
//         // 2. Generate the token
//         const token = signAccessToken(user.id);
        
//         // 3. Send response
//         res.json({ accessToken: token });
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

const bcrypt = require('bcrypt');
const db = require('../config/db');