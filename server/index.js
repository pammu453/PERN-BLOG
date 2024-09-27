import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import './db/db.js'
dotenv.config()

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import blogRoutes from './routes/blog.route.js'

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}!`)
})