import axios from 'axios';

export const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'weit7blw');

    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dloylpool/image/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
