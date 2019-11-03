import React from 'react'
import { isAuthenticated } from "../auth";
import {comment, uncomment} from './apiPost'
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpeg";
import {Container, 
    
    Body,
    Content,
    
  } from 'react-holy-grail-layout'

class Comment extends React.Component {
    state = {
        text: ''
    }

    handleChange = event => {
        this.setState({text: event.target.value})
    }

    addComment = e => {
        e.preventDefault()
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

    render() {
       
       const photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${
           isAuthenticated().user._id
         }?${new Date().getTime()}`
       
         const {comments} = this.props
        return (
            <div>
                <Container>
                    <Body>
                        <Content >
                            <h2 className='mt-5 mb-5'>
                                Leave a comment
                            </h2>

                            <form className='container'>
                                <div className='form-group row'>
                                    <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' />
                                    <textarea style={{ width: "950px" }} type='text' onChange={this.handleChange} className='form-control'/>
                                    <button className="btn btn-raised btn-primary btn-sm" style={{color: 'white', 'margin-left':'900px'}} onClick={this.addComment} >Comment</button>
                                </div>
                            </form>

                            <div className="col-md-12 col-md-offset-2">
                                <h3 className="text-primary">
                                    {comments.length} Comments
                                </h3>
                                <hr />
                                {comments.reverse().map((comment, i) => (
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
                                                    <div  className='row ml-2 commentInfo'>
                                                        
                                                        <div className="nav navbar-nav navbar-right"><p>{new Date(comment.created).toDateString()}</p></div>

                                                    </div>
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