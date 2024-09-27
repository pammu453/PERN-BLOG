import express from 'express'
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from '../controllers/blog.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', getBlogs)
router.get('/:id', getBlogById)
router.delete('/:id', authenticateToken, deleteBlog)
router.post('/', authenticateToken, createBlog)
router.put('/:id',authenticateToken, updateBlog)

export default router