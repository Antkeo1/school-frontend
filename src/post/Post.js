import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/person.png";
import { Link } from "react-router-dom";


class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page: 1
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

    componentDidMount() {
        this.loadPosts(this.state.page);
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
            <div  className="row">
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
                        <div id='post' style={{width: '500px'}} className="card col-md-4" key={i}>
                            <div className="card-body" >
                                
                               
                                <p className="font-italic mark">
                                    Posted by{" "}

                                    <Link to={`${posterId}`}>
                                        <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' />

                                        {posterName}{" "}
                                    </Link>
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
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm"
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
                    {!posts.length ? "Loading..." : "Recent Posts"}
                </h2>

                {this.renderPosts(posts)}

                
            </div>
        );
    }
}

export default Posts;


