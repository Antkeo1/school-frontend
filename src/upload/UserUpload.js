import React, { Component } from "react";
import { uploadByUser, read } from "./apiUpload";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {Container, 
  Body,
  Content,
  Aside,
} from 'react-holy-grail-layout'


class UserUpload extends Component {
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
        const userId = this.props.match.params.userId;
        this.init(userId);
      }
    
      componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
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
                        
                        {isAuthenticated().user && isAuthenticated().user._id === user._id ? ( 
                          <div>
                            <Link to={`/upload/create`} className='btn btn-raised btn-primary'>Add File</Link>
                          </div> 
                          ) : ( null)
                         }

                      </div>
                      <hr />
                      <div id='title'>
                        {uploads.reverse().map((upload, i) => (
                            <div key={i}>
                              
                                <div className='column'>
                                    <Link to={`/upload/${upload._id}`}>
                                      <p className="lead">{upload.title}  {upload.body}</p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                      </div>
                  </div> 
                  </Content>
                  
                  <Aside bg='grey' left p={2} style={{'width': '1000px', 'border-right': 'solid black' }}>
                  {isAuthenticated() &&  (
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

export default UserUpload;


