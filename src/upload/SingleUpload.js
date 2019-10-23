import React, {Component} from 'react'
import {singleUpload, remove} from './apiUpload'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import DefaultPost from "../images/person.png";
import PDF from 'react-pdf-to-image'
import FileViewer from 'react-file-viewer';
import { Document, Page, pdfjs } from 'react-pdf'



class SingleUpload extends Component {
    state = {
        upload: '',
        numPages: null,
        pageNumber: 1,
        redirectToUpload: false
    }

    componentDidMount = () => {
        const uploadId = this.props.match.params.uploadId
        pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.js"
        singleUpload(uploadId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({upload: data})
            }
        }) 
    }

    onDocumentLoadSuccess = ({numPages}) => {
        this.setState({numPages})
    }

    deleteUpload = () => {
        const uploadId = this.props.match.params.uploadId
        const token = isAuthenticated().token
        remove(uploadId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToUpload: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete your upload?')
        if(answer) {
            this.deleteUpload()
        }
    }

    onError = e => {
        console.logError(e, 'error in file viewer')
    }
    

    renderUpload = (upload) => {
        const uploaderId = upload.uploadedBy
        ? `/user/${upload.uploadedBy._id}`
        : "";
    const uploaderName = upload.uploadedBy
        ? upload.uploadedBy.name
        : " Unknown";

        const photoUrl = upload.uploadedBy
        ? `${process.env.REACT_APP_API_URL}/user/photo/${
            upload.uploadedBy._id
          }?${new Date().getTime()}`
        : DefaultPost;

        const fileUrl = `${
            process.env.REACT_APP_API_URL
        }/upload/photo/${upload._id}`

        const type = 'pdf'

        

        return (
                <div className="column" >
                    
                   
                    <p className="font-italic mark">
                        Uploaded by{" "}
                        <Link to={`${uploaderId}`}>
                        <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' />

                            {uploaderName}{" "}
                        </Link>
                        {new Date(upload.created).toDateString()}
                    </p>
                    <br />
                    
                    
                    <p className="card-text">
                        {upload.body}
                    </p>
                    <img
                        src={`${
                            process.env.REACT_APP_API_URL
                        }/upload/photo/${upload._id}`}
                        alt=''
                        onError={i =>
                            (i.target.src = ``)
                        }
                        className="img-thunbnail mb-3 ml-50"
                        style={{height: 'auto', width: '100%', objectFit: 'cover'}}
                    />
                    <div className='container'> 
                        <iframe src={fileUrl} style={{height: '500px', width: '100%', objectFit: 'cover'}}></iframe>
                    </div>
                    <div>
                    {/* <Document file={{url: fileUrl}} onDocumentLoadSuccess={this.onDocumentLoadSuccess}> 
                        <Page pageNumber={this.state.pageNumber} />
                    </Document>
                    <p>Page {this.state.pageNumber} of {this.state.numPages}</p> */}
                    
                    {/* <object data={fileUrl} type='application/pdf'>
                        <iframe src={fileUrl}></iframe>
                    </object> */}
                    
                    {/* <FileViewer
                        fileType={type}
                        filePath={fileUrl}
                    /> */}

                    </div>
                    <div className='d-inline-block'>
                        <Link
                            to={`/uploads`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Back to uploads
                        </Link>
                       {isAuthenticated().user && 
                        isAuthenticated().user._id === upload.uploadedBy._id &&  
                        <>
                             <Link to={`/upload/edit/${upload._id}`} className='btn btn-raised btn-warning ml-4 btn-sm mr-4'>
                                Update Upload
                            </Link>
                            <button onClick={this.deleteConfirm} className='btn btn-raised btn-warning btn-sm'>
                                Delete Upload
                            </button>
                        </>
                        
                        }
                    </div>
                </div>
        );
    }

    render() {
        if(this.state.redirectToUpload) {
            return <Redirect to={`/uploads`} />
         }

        const {upload} = this.state
        return (
            <div className='text-center'>
                {!upload ? ( 
                <div className='jumbotron text-center'>
                    <h2>Loading....</h2>
                </div>
                ) : (
                    this.renderUpload(upload)
                )
            }
            </div>
        )
    }
}

export default SingleUpload