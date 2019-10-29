import React, { Component } from "react";
import { uploadByUser, read } from "./apiUpload";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {Container, 
  Header,
  Body,
  Content,
  Aside,
  Footer
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
                  <Content style={{'margin-top': '65px'}}>
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
                        {uploads.map((upload, i) => (
                            <div key={i}>
                                <div >
                                    <Link to={`/upload/${upload._id}`}>
                                        <div >
                                            <p className="lead">{upload.title}</p>
                                        </div>
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


