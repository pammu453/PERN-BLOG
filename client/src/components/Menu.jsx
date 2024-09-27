import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"

const Menu = ({cat}) => {
    const [blogs, setBlogs] = useState();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get((`/blogs/?=${cat}`))
                setBlogs(res.data.blogs)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlogs()
    }, [cat])

    return (
        <div>
            <h2 className='text-center font-serif text-2xl'>Other Posts you may like</h2>
            <div>
                {
                    blogs && blogs.map(blog => (
                        <div key={blog.id} className="p-4">
                            <img src={blog.img} alt={blog.title} />
                            <h3 className='text-xl'>{blog.title}</h3>
                            <Link
                                to={`/blog/${blog.id}`}
                                className="mt-4 inline-block border p-2 border-green-400 hover:bg-green-400  text-green-500 hover:text-green-700 font-semibold transition-colors"
                            >
                                Read More →
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Menu
