import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; //this can be accessed by controllers
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};