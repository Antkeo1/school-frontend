import React, { Component } from "react";
import { uploadByUser, read } from "./apiUpload";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {Container, 
  Body,
  Content,
  Aside
} from 'react-holy-grail-layout'


class Upload extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            uploads: []
        };
       
    }

    loadUploads = userId => {
        const token = isAuthenticated().token;
        uploadByUser(userId, token).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.setState({ uploads: data });
          }
        });
      };

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
          if (data.error) {
            this.setState({ redirectToSignin: true });
          } else {
            this.setState({ user: data});
            this.loadUploads(data._id);
          }
        });
      };

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = isAuthenticated().user._id;
        this.init(userId);
      }

    render() {
        const { user, uploads } = this.state;
       
        return (
            <div>
              <Container>
                

                <Body>
                  <Content style={{'marginTop': '65px'}}>
                  <div>
                      {/* < NewUpload user={user}/> */}
                      <div id='uploadForm'  >
                        <div>
                          <h3 className="text-primary">{user.name} has {uploads.length} Files</h3>
                        </div>
                        <div>
                          <Link to={`/upload/create`} className='btn btn-raised btn-primary'>Add File</Link>
                        </div>
                      </div>
                      <hr />
                      <div id='title'>
                        {uploads.reverse().map((upload, i) => (
                            <div key={i}>
                              
                                <div >
                                    <Link to={`/upload/${upload._id}`} 
                                    >
                                        
                                            <p className="lead">{upload.title}</p>
                                        
                                    </Link>
                                </div>
                            </div>
                        ))}
                      </div>
                  </div> 
                  </Content>
                  
                  <Aside bg='grey' left p={2} style={{'width': '1000px', 'border-right': 'solid black' }}>
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

                        <Aside bg='grey'  right p={2}style={{'border-left': 'solid black' }}  >
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
        );
    }
}

export default Upload;


