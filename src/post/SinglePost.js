import React, {Component} from 'react'
import {singlePost} from './apiPost'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'

class SinglePost extends Component {
    state = {
        post: ''
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({post: data})
            }
        }) 
    }

    renderPost = (post) => {
        const posterId = post.postedBy
        ? `/user/${post.postedBy._id}`
        : "";
    const posterName = post.postedBy
        ? post.postedBy.name
        : " Unknown";
        return (
                <div className="column" >
                    
                   
                    <p className="font-italic mark">
                        Posted by{" "}
                        <Link to={`${posterId}`}>
                            {posterName}{" "}
                        </Link>
                        {new Date(post.created).toDateString()}
                    </p>
                    <br />
                    
                    <img
                        src={`${
                            process.env.REACT_APP_API_URL
                        }/post/photo/${post._id}`}
                        alt=''
                        onError={i =>
                            (i.target.src = ``)
                        }
                        className="img-thunbnail mb-3 ml-50"
                        style={{height: 'auto', width: '100%', objectFit: 'cover'}}
                    />
                    <p className="card-text">
                        {post.body}
                    </p>
                    <div className='d-inline-block'>
                        <Link
                            to={`/`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Back to posts
                        </Link>
                       {isAuthenticated().user && 
                        isAuthenticated().user._id === post.postedBy._id &&  
                        <>
                             <button className='btn btn-raised btn-warning ml-4 btn-sm mr-4'>
                                Update Post
                            </button>
                            <button className='btn btn-raised btn-warning btn-sm'>
                                Delete Post
                            </button>
                        </>
                        
                        }
                    </div>
                </div>
        );
    }

    render() {
        const {post} = this.state
        return (
            <div className='text-center'>
                {!post ? ( 
                <div className='jumbotron text-center'>
                    <h2>Loading....</h2>
                </div>
                ) : (
                    this.renderPost(post)
                )
            }
            </div>
        )
    }
}

export default SinglePost