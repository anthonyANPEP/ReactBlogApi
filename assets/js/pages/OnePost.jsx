import React, { useState,useEffect } from 'react'
import postsAPI from '../services/postsAPI';
import moment from 'moment';

const OnePost = ({ match }) => {

    const [post, setPost] = useState({})

    useEffect(( ) => {
        const id = match.params.id;

         postsAPI.findOne(id)
            .then(data => setPost(data))
            .catch(error => console.log(error.response));
    }, []);



    return (
        <>
            <h2 className="text-center">{post.title}</h2>
            <br />
            <p className="text-center h3">{post.content}</p>
            <br />
            <br />
            <p className="text-center">Posté le {moment.locale('fr'), moment(post.sendAt).format('Do MMMM YYYY à H:mm:ss')} écrit par {post.id &&
                <strong>{post.author.pseudo}</strong>} </p>
            
        </>
     );
}
 
export default OnePost;