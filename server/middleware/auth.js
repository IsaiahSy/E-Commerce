import jwt, { decode } from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];

        if(token) {
            let decodeData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.userId = decodeData?.id;
        }

        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized." });
    }
}

export default auth;