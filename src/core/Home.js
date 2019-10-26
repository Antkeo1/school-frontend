import React from 'react'
import Post from '../post/Post'
import {isAuthenticated} from '../auth'
import {Link, withRouter} from 'react-router-dom'
import {Container, 
            Header,
            Body,
            Content,
            Aside,
            Footer
        } from 'react-holy-grail-layout'


class Home extends React.Component {
    constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
      }
   
  }

    render() {
        return (
            <div >
                <Container>
                    <Header bg='grey' p={2} style={{'margin-top': '10px'}}>
                        {/* <h1>Welcome {isAuthenticated().user.name}</h1> */}
                    </Header>
                    
                    <Body>
                        <Content>
                        {isAuthenticated() ? (
                            <div className='container'>
                            <Post/>
                        </div>
                        ) : (
                            <div className='jumbotron'>
                            <h2>Home</h2>
                            <p className='lead'>Welcome to School Media</p>
                        </div>
                        )}
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
                        
                        <Footer bg='grey' p={2} >
                            
                        </Footer>
                   
                    </Body>
                </Container>
            </div>
        )
    }
}

export default withRouter(Home)