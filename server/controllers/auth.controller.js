import { pool } from '../db/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { email, password, username } = req.body
    try {
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const userCheck = await pool.query('SELECT * FROM users WHERE email=$1', [email])
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await pool.query('INSERT INTO users (email,username,password) VALUES ($1,$2,$3) RETURNING *', [email, username, hashedPassword])

        res.status(201).json({ message: 'User registered successfully' })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const user = await pool.query('SELECT * FROM users WHERE username=$1', [username])
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const validPassword = bcrypt.compareSync(password, user.rows[0].password)
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        var token = jwt.sign({ id: user.rows[0].id }, process.env.SECRET_KEY);

        const required_data = {
            id: user.rows[0].id,
            username: user.rows[0].username,
            email: user.rows[0].email
        }

        res.cookie('access_token', token, { httpOnly: true });
        res.status(200).json({ message: 'Logged in successfully', required_data })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

export const logout = (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logged out successfully' })
}