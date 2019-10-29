import React from 'react'
import {userList} from './apiUser'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import DefaultProfile from '../images/avatar.jpeg'
import {Container, 
    Header,
    Body,
    Content,
    Aside,
    Footer
} from 'react-holy-grail-layout'

class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        userList().then(data => {
            if(data.error) {
                console.log(data.error)   
            } else {
                this.setState({users: data})
                console.log(this.state.users)
            }
        })
    }

    renderUsers = (users) => (
        <div id='users' className='column'>
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>
                <img style={{height: '200px', width: 'auto'}} className='img-thumbnail' src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} onError={i => (i.target.src = `${DefaultProfile}`)} alt={user.name} />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                      {user.email}
                  </p>
                  <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary btn-small">View Profile</Link>
                </div>
              </div>
            ))}
        </div> 
    )


    render() {
        const {users} = this.state
        return (
            <div >
               <Container>
                   <Header>

                   </Header>
                   <Body>
                       <Content style={{'width': '300px', 'margin-top': '10px'}}>
                        <h2 className='mt-5 mb-5'>Users</h2> 
                            {this.renderUsers(users)}
                       </Content>
                       
                       <Aside bg='grey' left p={2} style={{'width': '1000px', 'border-right': 'solid black', 'padding-top': '25px' }}>
                            {isAuthenticated() && (
                                <div>
                                    <div className="aside">
                                        <div >
                                            <Link className=''  to={`/user/${isAuthenticated().user._id}`}  style={{'font-color': 'white'}}>
                                                {`${isAuthenticated().user.name}'s profile`}
                                            </Link>
                                        </div>

                                       <div>
                                            <Link className=''  to={`/uploads`}  >
                                                Uploads
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            )}
                    </Aside>

                        <Aside bg='grey'  right p={2}style={{'border-left': 'solid black', 'padding-top': '25px'}}  >
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

export default Users