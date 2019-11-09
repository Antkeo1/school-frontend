import React, {Component} from 'react'
import { isAuthenticated } from "./auth";
import Menu from './core/Menu'
import MainRouter from './MainRouter'
import { Redirect, Link } from "react-router-dom";
import {Container, 
    Body,
    Content,
    Aside,
  } from 'react-holy-grail-layout'


class Side extends Component {
    constructor() {
        super()
        this.state = { 
            redirectToProfile: false,
           
        }
    }

    
    render() {
        const {redirectToProfile} = this.state

        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }

        return (
            <div>
              <Container>

                  <Body>
                    <Menu/>
                        <Content>
                            <MainRouter />
                        </Content>
                      
                      <Aside bg='#d4d9d6' left p={2} style={{'width': '1000px' }}>
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
                                            <a id='news' style={{color: 'black'}} onClick={() => {
                                                window.open('https://www.usnews.com/news/education-news', '_blank')
                                            }} >News</a>
                                        </div>

                                    </div>
                                </div>
                            )}
                    </Aside>

                        <Aside bg='#d4d9d6'  right p={2}  >
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

                                        <div >
                                            <Link className='mb-5'  to={`/groups`}  >
                                                Find Groups
                                            </Link>
                                        </div>

                                        {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                            <div >
                                                <div >
                                                    <div>
                                                        <Link 
                                                            to={'/admin'}
                                                            className='mb=5'
                                                        >
                                                            Admin Dashboard
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        }
                                       

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

export default Side