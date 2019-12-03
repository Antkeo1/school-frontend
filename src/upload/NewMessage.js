import React from 'react'
import { isAuthenticated } from "../auth";
import {message, unmessage} from './apiUpload'
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpeg";
import {Container, Body, Content } from 'react-holy-grail-layout'

class NewMessage extends React.Component {
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

    addMessage = e => {
       if(this.isValid) {
        e.preventDefault()

        if(!isAuthenticated()) {
            this.setState({error: 'Please sign in to leave a comment'})
            return false
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id
            const groupId = this.props.groupId
            const token = isAuthenticated().token
            

            message(userId, token, groupId, {text: this.state.text})
                .then(data => {
                    if(data.error) {
                        console.log(data.error)
                    } else {
                        this.setState({text: ''})
                        // push up data to parent component
                        this.props.updateMessage(data.messages)
                    }
                })
            }
       }
    }

    deleteComment = (comment) => {
        const userId = isAuthenticated().user._id
        const groupId = this.props.groupId
        const token = isAuthenticated().token
        

        unmessage(userId, token, groupId, comment)
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
         }`
       
         // const {comments} = this.props
         const {error} = this.state
         
        return (
            <div>
                <Container>
                    <Body>
                        <Content >
                            <form className='container' onSubmit={this.addMessage}>
                                <div className='form-group row'>
                                    <textarea style={{ width: "950px" }} type='text' placeholder='Let Admin know of your new work' value={this.state.text} onChange={this.handleChange} className='form-control'/>
                                    <button className="btn btn-raised btn-primary btn-sm mt-2" style={{color: 'white', 'margin-left':'900px'}}  >Message Admin</button>
                                </div>
                            </form>

                            <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                                {error}
                            </div>
                        </Content>

                       
                    </Body>
                </Container>
            </div>
        )
    }
}

export default NewMessage