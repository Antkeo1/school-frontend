import React, {Component} from 'react'
import {singlePost, remove} from './apiPost'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import DefaultPost from "../images/person.png";
import {Container, 
    Header,
    Body,
    Content,
    Aside,
    Footer
  } from 'react-holy-grail-layout'

class SinglePost extends Component {
    state = {
        post: '',
        redirectToHome: false
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

    deletePost = () => {
        const postId = this.props.match.params.postId
        const token = isAuthenticated().token
        remove(postId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToHome: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete your post?')
        if(answer) {
            this.deletePost()
        }
    }

    renderPost = (post) => {
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

        return (
                <div className="column" >
                    
                   
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
                        {post.body}
                    </p>
                   <div className='container'>
                    <img 
                            src={`${
                                process.env.REACT_APP_API_URL
                            }/post/photo/${post._id}`}
                            alt=''
                            onError={i =>
                                (i.target.src = ``)
                            }
                            className="img-thunbnail mb-3 ml-50"
                            style={{height: '500px', width: '500px', objectFit: 'cover'}}
                        />
                   </div>
                    

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
                             <Link to={`/post/edit/${post._id}`} className='btn btn-raised btn-warning ml-4 btn-sm mr-4'>
                                Update Post
                            </Link>
                            <button onClick={this.deleteConfirm} className='btn btn-raised btn-warning btn-sm'>
                                Delete Post
                            </button>
                        </>
                        
                        }
                    </div>
                </div>
        );
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to={`/`} />
         }

        const {post} = this.state
        return (
            <div>
               <Container>
                   <Body>
                       <Content>
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
                       </Content>

                       <Aside bg='grey' left p={2} style={{'width': '1000px', 'border-right': 'solid black', 'padding-top': '25px'}}>

                        </Aside>

                        <Aside bg='grey' right p={2} style={{'width': '1000px', 'border-left': 'solid black', 'padding-top': '25px'}}>
                        
                        </Aside> 
                   </Body>
               </Container>
            </div>
        )
    }
}

export default SinglePost