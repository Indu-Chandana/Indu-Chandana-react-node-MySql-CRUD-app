import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location.pathname.split("/"))

    const bookId = location.pathname.split("/")[2]
    //     let text = "Hello world!";
    // let result = text.slice(0, 2);

    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: "",
        cover: "",
    })

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:8800/books/"+ bookId , book).then((res) => console.log(res))
            navigate("/")
        } catch (error) {
            console.log('err handleClick', error)
        }
    }
    return (
        <div className='form'>
            <h1>Update the Book</h1>
            <input type="text" placeholder='title' onChange={handleChange} name="title" />
            <input type="text" placeholder='desc' onChange={handleChange} name="desc" />
            <input type="number" placeholder='price' onChange={handleChange} name="price" />
            <input type="text" placeholder='cover' onChange={handleChange} name="cover" />
            <button onClick={handleClick} className="formButton">Update</button>
        </div>
    )
}

export default Update