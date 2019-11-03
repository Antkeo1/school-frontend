import React from 'react'
import { isAuthenticated } from "../auth";
import {comment, uncomment} from './apiUpload'
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpeg";
import {Container, 
    Body,
    Content,
    
  } from 'react-holy-grail-layout'

class FileComment extends React.Component {
    state = {
        text: ''
    }

    handleChange = event => {
        this.setState({text: event.target.value})
    }

    addComment = e => {
        e.preventDefault()
        const userId = isAuthenticated().user._id
        const uploadId = this.props.uploadId
        const token = isAuthenticated().token
        

        comment(userId, token, uploadId, {text: this.state.text})
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
                           
                            <hr />

                            <div className="col-md-12 col-md-offset-2">
                                <h3 className="text-primary">
                                    {comments.length} Comments
                                </h3>
                                <hr />
                                {comments.reverse().map((comment, i) => (
                                    <div key={i}>
                                        <nav >
                                            <div className='navbar'>
                                            <Link to={`/user/${comment.uploadedBy._id}`}>
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
                                                    }/user/photo/${comment.uploadedBy._id}`}
                                                    alt={comment.uploadedBy.name}
                                                />
                                                <p className="text-primary mr-5">
                                                        {comment.uploadedBy.name}
                                                    </p>
                                            </Link>
                                                <div>
                                                    <p className="lead mr-5">
                                                        {comment.text}
                                                    </p>
                                                </div>
                                                <div className="nav navbar-nav navbar-right">{new Date(comment.created).toDateString()}</div>
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

export default FileComment