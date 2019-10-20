import React, {Component} from 'react'
import { singleUpload, update } from './apiUpload';
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";



class EditUpload extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            title: '',
            body: '',
            redirectToProfile: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (uploadId) => {
        singleUpload(uploadId).then(data => {
            if (data.error) {
                this.setState({redirectToProfile: true})
            } else {
                this.setState({id: data._id, title: data.title, body: data.body, error: ''})
            }
        })
    }

    componentDidMount() {
        this.uploadData = new FormData()
        const uploadId = this.props.match.params.uploadId
        this.init(uploadId)
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size to large",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.uploadData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const postId = this.state.id
            const token = isAuthenticated().token;

            update(postId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });
                }
            });
        }
    };

    editPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="txt/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Edit File
            </button>
        </form>
    );


    render() {
        const {id, title, body, redirectToProfile, error, loading} = this.state

        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }

        return (
            <div className='container'>
                <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                {loading ? ( 
                <div className='jumbotron text-center'>
                    <h2>Loading....</h2>
                </div>
                ) : (
                    ""
                )
            }
                <img style={{height: '200px', width: 'auto'}} className='img-thumbnail' src={`${process.env.REACT_APP_API_URL}/post/photo/${id}`} onError={i => (i.target.src = ``)} alt='' />


                {this.editPostForm(title, body)}
            </div>
        )
    }
}

export default EditUpload