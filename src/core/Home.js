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
                        
                    
                        
                       
                   
                    </Body>
                </Container>
            </div>
        )
    }
}

export default withRouter(Home)