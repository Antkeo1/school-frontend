import React, { Component } from "react";
import { list, read} from "./apiGroup";
import DefaultPost from "../images/person.png";
import { Link } from "react-router-dom";
import {isAuthenticated} from '../auth'
import { Content } from "react-holy-grail-layout";


class Groups extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            groups: [],
            page: 1,
            like: false,
            likes: 0
        };
    }

    // checkMembers = user => {
    //     const jwt = isAuthenticated();
    //     const match = user.followers.find(follower => {
    //       // one id has many other ids (followers) and vice versa
    //       return follower._id === jwt.user._id;
    //     });
    //     return match;
    //   };

    loadGroups = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ groups: data });
                

            }
        });
    };

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
          if (data.error) {
            this.setState({ redirectToSignin: true });
          } else {
            // let following = this.checkFollow(data);
            this.setState({ user: data });
            this.loadGroups(data._id);
          }
        });
      };

    // checkLike = (likes) => {
    //     const userId = isAuthenticated().user._id
    //     let match = likes.indexOf(userId) !== -1
    //     return match;
    // }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        this.init(userId);
        this.loadGroups(this.state.groups)
        
    }

    // likeToggle = () => {
    //     let callApi = this.state.like ? unlike : like
    //     const userId = isAuthenticated().user._id
    //     const postId = this.state.post._id
    //     const token = isAuthenticated().token
        
    //     callApi(userId, token, postId).then(data => {
    //         if(data.error) {
    //             console.log(data.error)
    //         } else {
    //             this.setState({
    //                 like: !this.state.like,
    //                 likes: data.likes.length
    //             })
    //         }
    //     })
    // }

    // loadMore = number => {
    //     this.setState({ page: this.state.page + number });
    //     this.loadPosts(this.state.page + number);
    // };

    // loadLess = number => {
    //     this.setState({ page: this.state.page - number });
    //     this.loadPosts(this.state.page - number);
    // };

    renderGroups = groups => {

        return (
            <div  id='post' className='row container'>
                {groups.map((group, i) => {
                    // console.log(post.postedBy.photo)
                    const creatorId = group.createdBy
                        ? `/user/${group.createdBy._id}`
                        : "";
                    const creatorName = group.createdBy
                        ? group.createdBy.name
                        : " Unknown";

                        const photoUrl = group.createdBy
                        ? `${process.env.REACT_APP_API_URL}/user/photo/${
                            group.createdBy._id
                          }?${new Date().getTime()}`
                        : DefaultPost;
                          
                        // const fileUrl = `${
                        //     process.env.REACT_APP_API_URL
                        // }/post/photo/${post._id}`

                    return (
                        <div  className="card col-md-6 mb-4" key={i}>
                            <div  >
                                
                               
                                <p className="font-italic mark mt-4">
                                    Created by{" "}

                                    <Link to={`${creatorId}`}>
                                        <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' />

                                        {creatorName}{" "}
                                    </Link>
                                    on{' '}
                                    {new Date(group.created).toDateString()}
                                </p>
                                <br />
                                {group.name}
                                <p className="card-text">
                                    
                                    {group.mission.substring(0, 100)}
                                </p>                                  
                             
                                {/* <img
                                    src={`${
                                        process.env.REACT_APP_API_URL
                                    }/post/photo/${post._id}`}
                                    alt=''
                                    onError={i =>
                                        (i.target.src = ``)
                                    }
                                    className="img-thunbnail mb-3"
                                    style={{ height: "200px", width: "100%" }}
                                /> */}
                                {/* <p className='text-primary' >
                                    {post.likes.length} likes
                                </p> */}
                                <Link
                                    to={`/group/${group._id}`}
                                    className="btn btn-raised btn-primary btn-sm mb-4"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { user, groups } = this.state;
       
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    {!groups.length ? "Loading..." : ""}
                </h2>
                <Content  >
                    {this.renderGroups(groups)}
                    
                </Content>
                
            </div>
        );
    }
}

export default Groups;


