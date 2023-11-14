import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function HomePage() {
    
    const [blogForm, setBlogForm] = useState([]);
    const [recommended, setRecommended] = useState([]);

    let params = useParams();
    let navigate = useNavigate();

    function bigger(x) {
        if (x < 3) {
            return x;
        } else {
            return 3;
        }
    }

    useEffect(() => {
        axios
            .get("https://blog-app-backend-cw2g.onrender.com/posts/view/" + params.id)
            .then((res) => {
                setBlogForm(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:10000/posts/display-post")
            .then((res) => {
                let blogList = res.data.data;
                console.log(blogList);
            
                const shuffledArray = blogList.slice(); // Create a copy of the input array
                for (let i = shuffledArray.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Shuffle the array
                }
    
                const newRecommended = shuffledArray.slice(0, bigger(blogList.length));
    
                setRecommended(newRecommended);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        console.log(recommended);
    }, [recommended])

    return (   
        <div className="dispContainer">
            <div className="dispBody">
                <h1 className="dispTitle">{blogForm.title}</h1>
                <h2 className="dispAuthor">By: {blogForm.author}</h2>
                <img src={blogForm.imageURL} alt="image" className="dispImg" />
                <p className="dispText">{blogForm.text}</p>
            </div>
            <div className="dispRecommended">
                {recommended.map((blog, key) => {
                    return (
                        <div className="dispRecBlog" key={key} onClick={() => location.replace(`/view/${blog._id}`)}>
                            <img src={blog.imageURL} alt="img" className="recLeft" />
                            <div className="recRight">
                                <h2>{blog.title}</h2>
                                <div>{blog.description}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
);
}


            

export default HomePage;
