import React from 'react'
import Post from '../post/Post'
import {isAuthenticated} from '../auth'
import {Link, withRouter} from 'react-router-dom'
import {Container, 
            Header,
            Body,
            Content,
            Aside,
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
                    <Header bg='grey' p={2} style={{'marginTop': '10px'}}>
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
                        
                     <Aside bg='grey' left p={2} style={{'width': '1000px', 'borderRight': 'solid black' }}>
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

                        <Aside bg='grey'  right p={2}style={{'borderLeft': 'solid black' }}  >
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

export default withRouter(Home)