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
        <div id='users' className='row container'>
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
                                            <Link className=''  to={`/user/${isAuthenticated().user._id}`}  style={{'fontColor': 'white'}}>
                                                {`${isAuthenticated().user.name}'s profile`}
                                            </Link>
                                        </div>

                                       <div>
                                            <Link className=''  to={`/uploads/by/${isAuthenticated().user._id}`}  >
                                                Uploads
                                            </Link>
                                        </div>

                                        <div>
                                            <a id='news' style={{color: 'white'}} onClick={() => {
                                                window.open('https://www.google.com/search?sxsrf=ACYBGNRWDFSZNZnR3i_BNLD6hIfbYu-2tg%3A1572800724186&source=hp&ei=1Ai_Xe3cCKKc5wLgqbWgCw&q=education+news&oq=education+news&gs_l=psy-ab.3..0l10.31182.33928..34348...2.0..0.151.1260.14j1......0....1..gws-wiz.....10..35i362i39j35i39j0i131j0i67j0i10i67.WmTEVjwmRyM&ved=0ahUKEwjtltyjw87lAhUizlkKHeBUDbQQ4dUDCAg&uact=5', '_blank')
                                            }} >News</a>
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