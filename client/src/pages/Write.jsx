import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { handleImageUpload } from '../utils/imageUpload';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const Write = () => {
    const [blogData, setblogData] = useState({
        title: '',
        description: '',
        cat: 'Art',
    });
    const [value, setValue] = useState('');
    const [image, setImage] = useState(null)
    const [quillError, setquillError] = useState('');

    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    const blogId = searchParams.get('blogID');
    const title = searchParams.get('title')
    const description = searchParams.get('description')
    const cat = searchParams.get('cat')

    const handleCategoryChange = (e) => {
        setblogData({ ...blogData, cat: e.target.value });
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleEditorChange = (value) => {
        setValue(value);
        setquillError('');
    }

    const submiteHandler = async (e) => {
        e.preventDefault();
        const quillText = value.replace(/<(.|\n)*?>/g, '').trim();
        if (!quillText) {
            setquillError('Content is required');
            return;
        }
        const image_url = await handleImageUpload(image)
        const updatedBlogData = { ...blogData, description: value, img: image_url };
        setblogData(updatedBlogData);

        try {
            const response = await axios.post('/blogs', updatedBlogData);
            navigate(`/blog/${response.data.blog.id}`)

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (blogId && description) {
            setblogData({
                title,
                description,
                cat,
            });
            setValue(description); // Ensure that description is present before setting value
        }
    }, [blogId, description, title, cat]);


    const editHandler = async () => {
        const quillText = value.replace(/<(.|\n)*?>/g, '').trim();
        if (!quillText) {
            setquillError('Content is required');
            return;
        }

        try {
            let updatedBlogData = { ...blogData, description: value }; // Ensure description is from the editor content

            // If a new image is uploaded, upload and update the image URL
            if (image) {
                const image_url = await handleImageUpload(image);
                updatedBlogData = { ...updatedBlogData, img: image_url }; // Update blog data with the new image URL
            }

            console.log(updatedBlogData)

            await axios.put(`/blogs/${blogId}`, updatedBlogData); // Now use the updatedBlogData with img if present
            navigate(`/blog/${blogId}`);
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <form onSubmit={submiteHandler} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className='flex flex-col md:flex-row mt-20 gap-5'>
                {/* Blog content input */}
                <div className='flex-[7]'>
                    <div className='flex flex-col gap-5'>
                        <input
                            value={blogData.title}
                            onChange={(e) => setblogData({ ...blogData, title: e.target.value })}
                            type="text"
                            placeholder='Title'
                            className='w-full p-3 bg-green-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            required
                        />
                        <input
                            type="file"
                            accept='image/*'
                            placeholder='Title'
                            className='w-full p-3 bg-green-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            required
                            onChange={handleImageChange}
                        />
                        <ReactQuill
                            style={{ width: '100%' }}
                            theme="snow"
                            value={value}
                            onChange={handleEditorChange}
                        />
                        <p className='text-red-500 text-sm'>{quillError && quillError}</p>
                    </div>
                </div>

                {/* Category selection */}
                <div className='flex-[2] border p-4 rounded-md shadow-md bg-white'>
                    <h1 className='text-center font-bold text-lg md:text-xl'>Select Category</h1>
                    <div className='flex flex-col gap-4 mt-4'>
                        <label className="flex items-center">
                            <input type="radio" value="Art" name="category" onChange={handleCategoryChange} className="mr-2" checked={blogData.cat === 'Art'} /> Art
                        </label>
                        <label className="flex items-center">
                            <input type="radio" value="Science" name="category" onChange={handleCategoryChange} className="mr-2" checked={blogData.cat === 'Science'} /> Science
                        </label>
                        <label className="flex items-center">
                            <input type="radio" value="Technology" name="category" onChange={handleCategoryChange} className="mr-2" checked={blogData.cat === 'Technology'} /> Technology
                        </label>
                        <label className="flex items-center">
                            <input type="radio" value="Cinema" name="category" onChange={handleCategoryChange} className="mr-2" checked={blogData.cat === 'Cinema'} /> Cinema
                        </label>
                        <label className="flex items-center">
                            <input type="radio" value="Design" name="category" onChange={handleCategoryChange} className="mr-2" checked={blogData.cat === 'Design'} /> Design
                        </label>
                        <label className="flex items-center">
                            <input type="radio" value="Food" name="category" onChange={handleCategoryChange} className="mr-2" checked={blogData.cat === 'Food'} /> Food
                        </label>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            {
                blogId ? (
                    <button
                        type='button'
                        onClick={editHandler}
                        className='w-full bg-blue-300 text-white mt-6 py-3 rounded-md font-semibold hover:bg-blue-500 transition-colors'>
                        Edit
                    </button>
                ) : (
                    <button
                        type='submit'
                        className='w-full bg-green-300 text-white mt-6 py-3 rounded-md font-semibold hover:bg-green-500 transition-colors'>
                        Post
                    </button>
                )
            }
        </form>
    )
}

export default Write
