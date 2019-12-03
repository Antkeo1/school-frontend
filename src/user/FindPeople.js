import React from 'react'
import {findPeople, follow, searchUser} from './apiUser'
import {Link, Redirect} from 'react-router-dom'
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
            term: '',
            searched: false,
            searchedUser: '',
            error: '',
            searching: false,
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

    handleChange = event => {
        this.setState({error: ''})
        this.setState({term: event.target.value})
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
       <form>
           <input type='text' value={this.state.term} onChange={this.handleChange} />
           <button onClick={this.search}>Search</button>
       </form>
        )
    }

    renderUsers = (users) => (
        <div className='row container'>
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
        const {users, error, open, term, searched, searching, searchedUser, followMessage} = this.state
        console.log(term)
        if (searched) { return <Redirect to={`user/${searchedUser._id}`}/> } 
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

export default FindPeople