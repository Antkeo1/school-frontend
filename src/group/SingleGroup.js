import React, {Component} from 'react'
import {singleGroup, remove, read} from './apiGroup'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import JoinGroupButton from './JoinGroupButton'
import DefaultPost from "../images/person.png";
// import Comment from './Comment'
import {Container, 
    Body,
    Content,
    Aside,
  } from 'react-holy-grail-layout'


class SingleGroup extends Component {
    state = {
        group: '',
        redirectToHome: false,
        redirectToSignIn: false,
        member: false
        // posts: []
    }

    // check follow
  checkMember = group => {
    const jwt = isAuthenticated();
    const match = group.members.find(member => {
        // checking to see if any current of member of group matches the id of the current user
        // if no match, current user isnt a member of group
        // if there is a match, then current user is a member and can not join again
      return member._id === jwt.user._id;
    });
    return match;
    
  };

  clickJoinButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.group._id).then(data => {
        if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ group: data, member: !this.state.member });
      }
    });
  };


    // checkLike = (likes) => {
    //     const userId = isAuthenticated() && isAuthenticated().user._id
    //     let match = likes.indexOf(userId) !== -1
    //     return match;
    // }

    componentDidMount() {
        const groupId = this.props.match.params.groupId
        singleGroup(groupId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                let member = this.checkMember(data);
                this.setState({group: data, member})           
            }
        }) 
    }


  UNSAFE_componentWillReceiveProps(props) {
    const groupId = this.props.match.params.groupId
        singleGroup(groupId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                let member = this.checkMember(data);
                this.setState({group: data, member})
            }
        }) 
  }

    deleteGroup = () => {
        const groupId = this.props.match.params.postId
        const token = isAuthenticated().token
        remove(groupId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToHome: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete your Group page?')
        if(answer) {
            this.deleteGroup()
        }
    }

    renderGroup = (group) => {
        const creatorId = group.createdBy
        ? `/user/${group.createdBy._id}`
        : "";
        
        const creatorName = group.createdBy
        ? group.createdBy.name
        : " Unknown";

        // const {like, likes} = this.state

        const photoUrl = group.createdBy
        ? `${process.env.REACT_APP_API_URL}/user/photo/${
            group.createdBy._id
          }?${new Date().getTime()}`
        : DefaultPost;

        return (
                <div  className='container'>
                    <p className="font-italic mark">
                        Created by{" "}
                        <Link to={`${creatorId}`}>
                        <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' />

                            {creatorName}{" "}
                        </Link>
                        {new Date(group.created).toDateString()}
                    </p>
                    {group.name}
                    <p className="card-text">
                        {group.mission}
                    </p>
                   {/* <div className='container'>
                    <img 
                            src={`${
                                process.env.REACT_APP_API_URL
                            }/group/photo/${group._id}`}
                            alt=''
                            onError={i =>
                                (i.target.src = ``)
                            }
                            className="img-thunbnail mb-3 ml-50"
                            style={{height: '500px', width: '500px', objectFit: 'cover'}}
                        />
                   </div> */}
                   
                    
                    {/* {like ? (
                        <h3 onClick={this.likeToggle}>
                           <i className='fa fa-thumbs-up text-primary bg-dark' style={{padding: '10px', borderRadius: '50%'}}/>{' '}
                        {likes} likes
                    </h3>
                    ) : (
                        <h3 onClick={this.likeToggle}>
                            <i className='fa fa-thumbs-up text-warning bg-dark' style={{padding: '10px', borderRadius: '50%'}}/>{' '}
                        {likes} likes
                    </h3>
                    )} */}

                    <div className='d-inline-block mb-5'>
                        <Link
                            to={`/`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Back to groups
                        </Link>
                        
                       {isAuthenticated().user && 
                        isAuthenticated().user._id === group.createdBy._id ? (
                        <>
                             <Link to={`/group/edit/${group._id}`} className='btn btn-raised btn-warning ml-4 btn-sm mr-4'>
                                Update Group Info
                            </Link>
                            <button onClick={this.deleteConfirm} className='btn btn-raised btn-warning btn-sm'>
                                Delete Group page
                            </button>
                        </>) : (
                            <JoinGroupButton member={this.state.member} onButtonClick={this.clickJoinButton}/>
                        )
                        
                        }

                        {isAuthenticated().user && isAuthenticated().user.role == 'admin' && (
                            <div className='card mt-5'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Admin</h5>
                                    <p className='mb-2 text-danger'>
                                        Edit/Delete as an Admin
                                    </p>
                                    <Link
                                         to={`/group/edit/${group._id}`}
                                        className='btn btn-raised btn-warning'
                                    >
                                        Update Group info
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-5'
                                    >
                                        Delete Group Page
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        );
    }

    render() {
        const {group, mission, comments, member, redirectToHome, redirectToSignIn} = this.state
         console.log(member)
        if(redirectToHome) {
            return <Redirect to={`/`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div>
               <Container>
                   <Body>
                       <Content>
                           <div id='singleGroup' className='text-center'>
                                {!group ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>Loading....</h2>
                                        </div>
                                        ) : (
                                            this.renderGroup(group)
                                        )
                                    }
                                   {/* <div className='container'>
                                        

                                        <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments}/>
                                        
                                    </div> 
                                */}
                            </div>
                       </Content>

                      

                        
                   </Body>
               </Container>
            </div>
        )
    }
}

export default SingleGroup