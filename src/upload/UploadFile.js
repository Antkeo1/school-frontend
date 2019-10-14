import React from 'react'
import axios from 'axios';


class UploadFile extends React.Component {
    constructor(props) {
    super(props);
      this.state = {
        selectedFile: [],
        uploadSucess: false,
        fileUrl: ''
      }
   
  }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='offset-md-3 col-md-6'>
                        <div className='form-group files'>
                            <label>Upload your file</label>
                            <input type="file" name="file" className='form-control'
                                onChange={event => {
                                    {this.setState({
                                        selectedFile: event.target.files[0],
                                        loaded: 0
                                    })}
                                    console.log(event.target.files)
                            }}/>
                        </div>
                 <button type="button" className="btn btn-success btn-block" 
                    onClick={() => {
                        const data = new FormData()
                        data.append('file', this.state.selectedFile)
                        axios.post('http://localhost:8000/upload/new', data, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                              },
                              body: JSON.stringify(data)
                        }).then(res => {
                            this.setState({uploadSucess: true, fileUrl: res.config.url})
                            console.log(this.state.fileUrl)
                        })
                    }}>Upload</button> 
                   {this.state.selectedFile ? (
                       <div>
                           {this.state.selectedFile.name}
                       </div>
                   ) : null}
                   
                   </div>
                 </div>  
       </div>
        )
    }
}

export default UploadFile