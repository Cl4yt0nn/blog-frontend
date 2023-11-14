import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
    
    const [blogForm, setBlogForm] = useState([]);

    useEffect(() => {
        axios
            .get("https://blog-app-backend-cw2g.onrender.com/posts/display-post")
            .then((res) => {
                setBlogForm(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); 

    useEffect(() => {
        console.log(blogForm)
    }, [blogForm])

    return (   
        <div className="blogsDisplay">
            {blogForm.map((blog, index) => {
                return (
                    <Link to={`/view/${blog._id}`} className="blog" key={index}>
                        <img src={blog.imageURL} alt={blog.title + " image"} width="100" />
                        <h1 className="hph1">{blog.title}</h1><br />
                        <h2 className="hph2">{blog.author}</h2><br />
                        <p className="hpp">{blog.description}</p>
                    </Link>
                );
            })}
        </div>
);
}


            

export default HomePage;



       
