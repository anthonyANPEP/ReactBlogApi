import React, { useEffect, useState } from 'react';
import moment from 'moment';
import postsAPI from '../services/postsAPI';
import { Link } from 'react-router-dom';
import PostsLoader from '../components/loaders/PostsLoader';

const PostsPage = props => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(async () => {
        try {
            await postsAPI.findAll()
                .then(data => setPosts(data))
            setLoading(false);
        } catch (error) {
            error => console.log(error.response);
        }
        
            
    }, []);
        
    const handleSearch = ({ currentTarget }) => {
        const value = currentTarget.value;
        setSearch(value);
    }

    const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <h3 className="text-center" >Nos articles</h3>
            <div className="form-group m-2">
                <input type="text"
                    className="form-control p-2 form-control-lg"
                    placeholder="Rechercher un post"
                    onChange={handleSearch}
                    value={search}
                />
            </div>
            <div className="container">
                <div className="row justify-content-between">
                    {filteredPosts.map(post =>
                        <div className="card text-white bg-secondary m-2 col-lg-3" key={post.id} >
                            <h3 className="card-header text-center">{ post.title }</h3>
                            <span className="badge bg-primary mb-1">Posté le { moment.locale('fr'), moment(post.sendAt).format('Do MMMM YYYY à H:mm:ss')}</span>
                        <div className="card-body ">
                            <p className="card-text text-center text-truncate">{ post.content }</p>
                        </div>
                        <div className="d-flex justify-content-end mb-2">
                            <span className="badge bg-primary">écrit par { post.author.pseudo }</span>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link type="button" className="btn btn-info mb-3" to={`/post/${post.id}`} >Voir le post</Link>
                        </div>
                    </div>)}
                </div>
            </div>
            {loading && <PostsLoader/>}
        </>
     );
}
 
export default PostsPage;