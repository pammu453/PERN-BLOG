import { pool } from '../db/db.js'

export const getBlogs = async (req, res) => {
    try {
        const q = req.query.cat ? 'SELECT id, title, description, img FROM blogs WHERE cat=$1' : 'SELECT id, title, description, img FROM blogs'
        const params = req.query.cat ? [req.query.cat] : [];
        const blogs = await pool.query(q, params)
        res.json({ blogs: blogs.rows })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const blog = await pool.query('SELECT title, description, username, date, img, uid, cat FROM blogs INNER JOIN users ON blogs.uid = users.id WHERE blogs.id=$1', [req.params.id])
        res.json({ blog: blog.rows[0] })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        await pool.query('DELETE FROM blogs WHERE id = $1 AND uid = $2', [req.params.id, req.user.id])
        res.json({ message: 'Blog deleted successfully' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

export const createBlog = async (req, res) => {
    try {
        const { title, description, cat, img } = req.body
        const newBlog = await pool.query('INSERT INTO blogs (title, description, cat, img, uid) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, description, cat, img, req.user.id])
        res.json({ blog: newBlog.rows[0] })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { title, description, cat, img } = req.body;

        let query;
        let values;

        if (img) {
            query = 'UPDATE blogs SET title=$1, description=$2, cat=$3, img=$4, date=CURRENT_TIMESTAMP WHERE id=$5 AND uid=$6';
            values = [title, description, cat, img, req.params.id, req.user.id];
        } else {
            query = 'UPDATE blogs SET title=$1, description=$2, cat=$3,date=CURRENT_TIMESTAMP WHERE id=$4 AND uid=$5';
            values = [title, description, cat, req.params.id, req.user.id];
        }

        await pool.query(query, values);

        res.json({ message: 'Blog updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};
