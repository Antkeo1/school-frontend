import React from 'react'
import Post from '../post/Post'
import {isAuthenticated} from '../auth'
import axios from 'axios';


class Home extends React.Component {
    constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
      }
   
  }

    render() {
        return (
            <div>
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
       </div>
        )
    }
}

export default Home