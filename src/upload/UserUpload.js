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
            uploads: [],
            url: ''
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
        const { user, uploads, url } = this.state;
       
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
                                    <Link to={url}>
                                      <p className="lead">{upload.title}:  {upload.body}</p>
                                      
                                    </Link>
                                    <a id='news' style={{color: 'black'}} onClick={() => {
                                                window.open(upload.url, '_blank')
                                            }} >{upload.title}:  {upload.body}</a>
                                </div>
                            </div>
                        ))}
                      </div>
                  </div> 
                  </Content>
                  
                  

                            
                </Body>
              </Container>
            </div>
        );
    }
}

export default UserUpload;


