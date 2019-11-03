import React from 'react'
import {findPeople, follow} from './apiUser'
import {Link} from 'react-router-dom'
import DefaultProfile from '../images/avatar.jpeg'
import {isAuthenticated} from '../auth'
import {Container, 
    Body,
    Content,
    Aside,
} from 'react-holy-grail-layout'

class FindPeople extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            error: '',
            open: false
        }
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token

        findPeople(userId, token).then(data => {
            if(data.error) {
                console.log(data.error)   
            } else {
                this.setState({users: data})
            }
        })
    }

    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token

        follow(userId, token, user._id)
            .then(data => {
                if(data.error) {
                    this.setState({error: data.error})
                } else {
                    let toFollow = this.state.users 
                    toFollow.splice(i, 1)
                    this.setState({users: toFollow, open: true, followMessage: `following ${user.name}`})
                }
            })
    }

    renderUsers = (users) => (
        <div className='row'>
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>
                <img style={{height: '200px', width: 'auto'}} className='img-thumbnail' src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} onError={i => (i.target.src = `${DefaultProfile}`)} alt={user.name} />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                      {user.email}
                  </p>
                  <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary btn-small">View Profile</Link>
                    <button onClick={() => this.clickFollow(user, i)} className='btn btn-raised btn-info float-right btn-small'>
                        Follow
                    </button>
                </div>
              </div>
            ))}
        </div> 
    )


    render() {
        const {users, open, followMessage} = this.state
        return (
            <div>
               <Container>
                   <Body>
                       <Content style={{'margin-top': '10px'}}>
                       <h2 className='mt-5 mb-5'>People you may know</h2> 
                        {open && (
                            <div className='alert alert-success'>
                                <p>{followMessage}</p>
                            </div>
                        )}

                        {this.renderUsers(users)}
                       </Content>

                       <Aside bg='grey' left p={2} style={{'width': '1000px', 'border-right': 'solid black' }}>
                       {isAuthenticated() && (
                                <div>
                                    <div className="aside">
                                        <div >
                                            <Link className=''  to={`/user/${isAuthenticated().user._id}`}  style={{'fontColor': 'white'}}>
                                                {`${isAuthenticated().user.name}'s profile`}
                                            </Link>
                                        </div>

                                       <div>
                                            <Link className=''  to={`/uploads/by/${isAuthenticated().user._id}`}  >
                                                Uploads
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            )}
                    </Aside>

                        <Aside bg='grey'  right p={2}style={{'border-left': 'solid black' }}  >
                        {isAuthenticated() && (
                                <div>
                                    <div className="aside">
                                        <div >
                                            <Link className='mb-5'  to={`/findpeople`}  >
                                                Find People
                                            </Link>
                                        </div>

                                        <div >
                                            <Link className='mb=5'  to={`/post/create`}  >
                                                Create Post
                                            </Link>
                                        </div>

                                       

                                    </div>
                                </div>
                            )}
                        </Aside>
                   </Body>
               </Container>
            </div>
        )
    }
}

export default FindPeople