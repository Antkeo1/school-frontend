import React from 'react'
import axios from 'axios';
import { Redirect } from "react-router-dom";


class UploadFile extends React.Component {
    constructor(props) {
    super(props);
      this.state = {
        selectedFile: [],
        uploadSucess: false,
        fileUrl: '',
        files: [],
      }
   
  }

  maxSelectFile = (event) => {
    let files = event.target.files
    if(files.length > 3) {
        const message = 'Only 2 can be uploaded at a time'
        event.target.value = null
        console.log(message)
        return false
    }
    return true
  }

    render() {
        if(this.state.uploadSucess === true) {
            return <Redirect to={`/`} />
         }
        return (
            <div className='container'>
                <div className='row'>
                    <div className='offset-md-3 col-md-6'>
                        <div className='form-group files'>
                            <label>Upload your file</label>
                            <input type="file" name="file" multiple className='form-control'
                                onChange={event => {
                                    const files = event.target.files
                                    if(this.maxSelectFile(event)) {
                                        this.setState({
                                            selectedFile: files
                                        })
                                    }
                            }}/>
                        </div>
                 <button type="button" className="btn btn-success btn-block" 
                    onClick={() => {
                        const data = new FormData()
                        for(var i = 0; i < this.state.selectedFile.length; i++) {
                            data.append('file', this.state.selectedFile[i])
                        }
                        
                        axios.post('http://localhost:8000/api/upload/new', data, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                              },
                              body: JSON.stringify(data)
                        }).then(res => {
                            this.setState({ uploadSucess: true, fileUrl: res.config.url})
                            console.log(this.state.uploadSucess)
                        })
                    }}>Upload</button> 
                  
                   {/* <button onClick={() => {
                       const data = new FormData()
                       data.append('file', this.state.files)
                       axios.get('http://localhost:8000/api/upload/view', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                          },
                          body: JSON.stringify(data)
                    }).then(res => {
                        this.setState({files: res})
                        console.log(this.state.files)
                    })
                   }}>View</button> */}
                   
                   </div>
                 </div>  
       </div>
        )
    }
}

export default UploadFile