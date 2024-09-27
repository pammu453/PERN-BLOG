import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [blogs, setblogs] = useState([]);

    const cat = useLocation().search

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get((`/blogs/${cat}`))
                setblogs(res.data.blogs)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlogs()
    }, [cat])

    return (
        <div className="mt-20">
            <div className="flex flex-col gap-14">
                {
                    blogs.length === 0 ? <span className="text-2xl text-center mt-5" >No blogs found</span> :
                        blogs.map((blog, index) => {
                            const isEven = index % 2 === 0
                            return (
                                <div key={blog.id} className={`flex flex-col lg:flex-row gap-6 lg:gap-12 border-b-2 pb-2 items-start ${isEven ? "" : 'lg:flex-row-reverse'}`}>
                                    {/* Blog content */}
                                    <div className="flex-1">
                                        <h2 className="font-bold text-2xl md:text-4xl text-gray-800 hover:text-green-600 transition-colors">
                                            {blog.title}
                                        </h2>
                                        <p className="mt-4 text-gray-600 leading-relaxed line-clamp-3">
                                            <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                                        </p>
                                        <Link
                                            to={`/blog/${blog.id}`}
                                            className="mt-4 inline-block border p-2 border-green-400 hover:bg-green-400  text-green-500 hover:text-green-700 font-semibold transition-colors"
                                        >
                                            Read More →
                                        </Link>
                                    </div>

                                    {/* Blog image */}
                                    <div className="flex-1">
                                        <img
                                            src={blog.img}
                                            alt={blog.title}
                                            className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300 object-cover"
                                        />
                                    </div>
                                </div>
                            );
                        })
                }
            </div>
        </div>

    )
}

export default Home