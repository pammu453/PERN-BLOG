import jwt from "jsonwebtoken"

export const authenticateToken = (req, res, next) => {
    const cookie = req.cookies.access_token
    if (!cookie) {
        return res.status(401).json({ message: 'Access denied' })
    }
    //verify token
    const user = jwt.verify(cookie, process.env.SECRET_KEY)

    req.user = user
    next()

}