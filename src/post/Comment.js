import React from 'react'
import { isAuthenticated } from "../auth";
import {comment, uncomment} from './apiPost'
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpeg";
import {Container, Body, Content } from 'react-holy-grail-layout'

class Comment extends React.Component {
    state = {
        text: '',
        error: ''
    }

    handleChange = event => {
        this.setState({error: ''})
        this.setState({text: event.target.value})
    }

    isValid = () => {
        const {text} = this.state
        if(!text.length > 0 || text.length > 150) {
            this.setState({
                error: "Comment should not be empty and must be less than 150 characters"
            })
            return false
        }
        return true
    }

    addComment = e => {
       if(this.isValid) {
        e.preventDefault()

        if(!isAuthenticated()) {
            this.setState({error: 'Please sign in to leave a comment'})
            return false
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id
            const postId = this.props.postId
            const token = isAuthenticated().token
            

            comment(userId, token, postId, {text: this.state.text})
                .then(data => {
                    if(data.error) {
                        console.log(data.error)
                    } else {
                        this.setState({text: ''})
                        // push up data to parent component
                        this.props.updateComments(data.comments)
                    }
                })
            }
       }
    }

    deleteComment = (comment) => {
        const userId = isAuthenticated().user._id
        const postId = this.props.postId
        const token = isAuthenticated().token
        

        uncomment(userId, token, postId, comment)
            .then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    // push up data to parent component
                    this.props.updateComments(data.comments)
                }
            })
    }

    deleteConfirm = (comment) => {
        let answer = window.confirm('Are you sure you want to delete your comment?')
        if(answer) {
            this.deleteComment(comment)
        }
    }

    render() {
       
       const photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${
           isAuthenticated().user._id
         }?${new Date().getTime()}`
       
         const {comments} = this.props
         const {error} = this.state

        return (
            <div>
                <Container>
                    <Body>
                        <Content >
                            <h2 className='mt-5 mb-5'>
                                Leave a comment
                            </h2>

                            <form className='container' onSubmit={this.addComment}>
                                <div className='form-group row'>
                                    <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' />
                                    <textarea style={{ width: "950px" }} type='text' placeholder='Leave a comment' value={this.state.text} onChange={this.handleChange} className='form-control'/>
                                    <button className="btn btn-raised btn-primary btn-sm mt-2" style={{color: 'white', 'margin-left':'900px'}}  >Comment</button>
                                </div>
                            </form>

                            <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                                {error}
                            </div>

                            <div className="col-md-12 col-md-offset-2">
                                <h3 className="text-primary">
                                    {comments.length} Comments
                                </h3>
                            
                                {comments.map((comment, i) => (
                                    
                                    <div key={i}>
                                        <nav>
                                           
                                            <div className='navbar'>
                                                    <Link to={`/user/${comment.postedBy._id}`}>
                                                    <img
                                                        style={{
                                                            borderRadius: "50%",
                                                            border: "1px solid black"
                                                        }}
                                                        className="float-left mr-2"
                                                        height="30px"
                                                        width="30px"
                                                        onError={i =>
                                                            (i.target.src = `${DefaultProfile}`)
                                                        }
                                                        src={`${
                                                            process.env.REACT_APP_API_URL
                                                        }/user/photo/${comment.postedBy._id}`}
                                                        alt={comment.postedBy.name}
                                                    />
                                                    <p className='text-primary'>{comment.postedBy.name}{" "}</p>
                                                    
                                                    </Link>
                                                    <p>{comment.text}</p>
                                                    <span>
                                                    <div className="nav navbar-nav navbar-right">{new Date(comment.created).toDateString()}</div>
                                                {isAuthenticated().user && 
                                                    isAuthenticated().user._id === comment.postedBy._id &&  
                                                    <>
                                                        <span onClick={() => this.deleteConfirm(comment)} className='text-danger'>
                                                            Remove
                                                        </span>
                                                        
                                                    </>
                                                    
                                                    }
                                                </span>
                                            </div>
                                            
                                                
                                            
                                        </nav>
                                    </div>
                                ))}
                            </div>
                        </Content>

                       
                    </Body>
                </Container>
            </div>
        )
    }
}

export default Comment