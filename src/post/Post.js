import React, { Component } from "react";
import { list, like , unlike} from "./apiPost";
import DefaultPost from "../images/person.png";
import { Link } from "react-router-dom";
import {isAuthenticated} from '../auth'
import { Content } from "react-holy-grail-layout";


class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page: 1,
            like: false,
            likes: 0
        };
    }

    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
                

            }
        });
    };

    checkLike = (likes) => {
        const userId = isAuthenticated().user._id
        let match = likes.indexOf(userId) !== -1
        return match;
    }

    componentDidMount() {
        this.loadPosts(this.state.posts)
    }

    likeToggle = () => {
        let callApi = this.state.like ? unlike : like
        const userId = isAuthenticated().user._id
        const postId = this.state.post._id
        const token = isAuthenticated().token
        
        callApi(userId, token, postId).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                })
            }
        })
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };

    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };

    renderPosts = posts => {
        return (
            <div  id='post' className='row container'>
                {posts.map((post, i) => {
                    // console.log(post.postedBy.photo)
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";

                        const photoUrl = post.postedBy
                        ? `${process.env.REACT_APP_API_URL}/user/photo/${
                            post.postedBy._id
                          }?${new Date().getTime()}`
                        : DefaultPost;
                          
                        // const fileUrl = `${
                        //     process.env.REACT_APP_API_URL
                        // }/post/photo/${post._id}`

                    return (
                        <div  className="card col-md-6 mb-4" key={i}>
                            <div  >
                                
                               
                                <p className="font-italic mark mt-4">
                                    Posted by{" "}

                                    <Link to={`${posterId}`}>
                                        <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' />

                                        {posterName}{" "}
                                    </Link>
                                    on{' '}
                                    {new Date(post.created).toDateString()}
                                </p>
                                <br />
                                <p className="card-text">
                                    {post.body.substring(0, 100)}
                                </p>                                  
                             
                                <img
                                    src={`${
                                        process.env.REACT_APP_API_URL
                                    }/post/photo/${post._id}`}
                                    alt=''
                                    onError={i =>
                                        (i.target.src = ``)
                                    }
                                    className="img-thunbnail mb-3"
                                    style={{ height: "200px", width: "100%" }}
                                />
                                <p className='text-primary' >
                                    {post.likes.length} likes
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm mb-4"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts } = this.state;
       
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    {!posts.length ? "Loading..." : ""}
                </h2>
                <Content  >
                    {this.renderPosts(posts)}
                </Content>
                
            </div>
        );
    }
}

export default Posts;


