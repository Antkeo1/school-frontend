import React from 'react'
import {userList} from './apiUser'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import DefaultProfile from '../images/avatar.jpeg'
import {Container, Header, Body, Content } from 'react-holy-grail-layout'

class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            term: '',
            searched: false,
            searchedUser: '',
            error: '',
            searching: false,
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

    handleChange = event => {
        this.setState({error: ''})
        this.setState({term: event.target.value})
    }

    search = (e) => {
        e.preventDefault()
        this.state.users.map(user => {
            if (user.name === this.state.term) {
                this.setState({searched: true, searchedUser: user})
            } else {
                this.setState({searching: true, error: 'User not found'})
            }
        })

    }

    renderSearcbar = () => {
        return (
       <form className='text-center'>
           <input type='text' placeholder='Search users' value={this.state.term} onChange={this.handleChange} />
           <button onClick={this.search}>Search</button>
       </form>
        )
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
        const {users, error, term, searched, searching, searchedUser} = this.state
        console.log(term)
        if (searched) { return <Redirect to={`user/${searchedUser._id}`}/> } 
        return (
            <div style={{marginTop: '120px'}}>
               <Container>
                   <Header>

                   </Header>
                   <Body>
                       <Content >
                           <h2>All Users</h2>
                            {searching ? (<div className='text-danger'>{error}</div>) : (null)}
                            {this.renderSearcbar()}
                            {this.renderUsers(users)}
                       </Content>
                       
                       

                        

                   </Body>
               </Container>
            </div>
        )
    }
}

export default Users