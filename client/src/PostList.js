import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [posts, setPosts] = useState({});

    async function fetchPosts() {
        const res = await axios.get("http://localhost:4002/posts");
        console.log(res.data);
        setPosts(res.data);
    }

    useEffect(() => {
        fetchPosts();
    },[]);
    console.log(posts);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className='card'  key={post.id}>
                <div className='card-body'>
                <h3>{post.title}</h3>
                <CommentList comments={post.comments}/>
                <CommentCreate postId={post.id}/>
                </div>
            </div>
        )
    })
    return (
        <div className='d-flex flow-row flex-wrap justify-content-between'>
            {renderedPosts}
        </div>
    )
}
export default PostList;