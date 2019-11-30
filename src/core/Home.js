import React from 'react'
import Post from '../post/Post'
import {isAuthenticated} from '../auth'
import { read } from "../user/apiUser";
import {withRouter, Link, Redirect} from 'react-router-dom'
import {Container, Header, Body, Content} from 'react-holy-grail-layout'

class Home extends React.Component {
    constructor(props) {
    super(props);
      this.state = {
        user: {group: []},
        redirectToSignin: false,
        redirectToSingleGroup: false
      }
   
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {   
        this.setState({ user: data});
      }
    });
  };

  componentDidMount() {
    const userId = this.state.user._id
    this.init(userId);
  }

  UNSAFE_componentWillReceiveProps() {
    const userId = isAuthenticated().user._id;
    this.init(userId);
  }


    render() {
        return (
            <div >
                <Container>
                    <Header className='text-center' p={2} style={{'marginTop': '80px'}}>
                        {isAuthenticated().user && (
                            <p>What will you do?</p>
                        )}
                        
                    </Header>
                    
                    <Body>
                        <Content>
                        {isAuthenticated() ? (
                            <div className='container row' style={{marginTop: '50px', display: 'block'}}>
                                <div className='text-center'>
                                    {isAuthenticated().user && isAuthenticated().user.role === 'admin' && (
                                        <div>
                                            <div>
                                                <Link to={'/group/create'} className='btn btn-primary'>
                                                    Create Group
                                                </Link>
                                            </div>

                                            <div>
                                                <Link to={'/myGroups'} className='btn btn-primary'>
                                                    My Groups
                                                </Link>
                                            </div>
                                        </div>

                                    ) }
                                   
                                
                                   

                                    <Link to={'/groups'} className='btn btn-primary'>
                                        Find your Group
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className='jumbotron'>
                            <h2>Home</h2>
                            <p className='lead'>Welcome to School Media</p>
                        </div>
                        )}
                        </Content>
                        
                    
                        
                       
                   
                    </Body>
                </Container>
            </div>
        )
    }
}

export default withRouter(Home)