import React, { useContext, useEffect, useState } from 'react'
import Menu from '../components/Menu'
import { MdDelete, MdModeEdit } from "react-icons/md";
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment'
import { AuthContext } from '../context/authContext.js'

const Single = () => {
    const [blog, setblog] = useState({});

    const { currentUser } = useContext(AuthContext)

    const { id: blogID } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get((`/blogs/${blogID}`))
                setblog(res.data.blog)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlog()
    }, [blogID])

    const deleteHandler = async () => {
        if (window.confirm('Are you sure you want to delete blog')) {
            try {
                await axios.delete(`/blogs/${blogID}`)
                navigate("/")
            } catch (error) {
                console.log(error.response.message)
            }
        }
    }

    const editHandler = async () => {
        navigate(`/write/?blogID=${blogID}&title=${blog.title}&description=${blog.description}&cat=${blog.cat}`)
    }

    return (
        <div className='flex flex-row gap-5 mt-20'>
            <div className="flex-[5] h-96 flex flex-col gap-8">
                {
                    blog && <>
                        <img className='h-full object-cover w-full' src={blog.img} alt="" />
                        <div className='flex flex-row gap-4 items-center'>
                            <img className='w-10 h-10 rounded-full border-2 border-spacing-2 border-slate-700' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2XpA_J7m2G2hSns2UcaNwHO1vTC96DqbiGw&s" alt="" />
                            <div className='flex flex-col'>
                                <h1 className='font-bold'>{blog.username}</h1>
                                <p>Posted {moment(blog.date).fromNow()}</p>
                            </div>
                            {
                                currentUser?.id === blog.uid && (
                                    <div className='flex gap-4'>
                                        <span onClick={deleteHandler} className='cursor-pointer text-xl text-red-600'><MdDelete /></span>
                                        <span onClick={editHandler} className='cursor-pointer text-xl text-green-600'><MdModeEdit /></span>
                                    </div>
                                )
                            }
                        </div>
                        <h1 className='text-4xl font-bold'>{blog.title}</h1>
                        <p className='text-justify leading-8 first-letter:font-bold'>
                            <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                        </p>
                    </>
                }
            </div>
            <div className="flex-[2]">
                <Menu cat={blog.cat} />
            </div>
        </div >
    )
}

export default Single