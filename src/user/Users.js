import React from 'react'
import {userList} from './apiUser'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import DefaultProfile from '../images/avatar.jpeg'
import {Container, 
    Header,
    Body,
    Content,
    Aside
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
        <div id='users' className='row container '>
            {users.map((user, i) => (
                <div className="card col-md-6 mt-5" key={i}>
                <img style={{height: '200px', width: 'auto', marginTop: '10px'}} className='img-thumbnail' src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} onError={i => (i.target.src = `${DefaultProfile}`)} alt={user.name} />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                      {user.role}
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
                       <Content >
                       
                            {this.renderUsers(users)}
                       </Content>
                       
                       

                        

                   </Body>
               </Container>
            </div>
        )
    }
}

export default Users