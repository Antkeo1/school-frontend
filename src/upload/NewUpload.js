import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiUpload";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import {Container, 
    Body,
    Content,
    Aside,
  } from 'react-holy-grail-layout'


class NewUpload extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: '',
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToUpload: false
        };
        this.onChange = editorState => this.setState({editorState})

    }

    componentDidMount() {
        this.uploadData = new FormData();
        this.setState({ user: isAuthenticated().user});
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb",
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
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.uploadData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToUpload: true
                    });
                }
            });
        }
    };

    newPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted"></label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx,.xls,image/*,.doc, .zip, .docx,.ppt, .pptx,.txt,.pdf, .html, .rtf" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Title of file</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Description of file</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
                
            </div>

            <div className='row'>
                <button
                    onClick={this.clickSubmit}
                    className="btn btn-raised btn-primary"
                    style={{'margin-left': '10px'}}
                >
                    Upload File
                </button>
                <Link className='btn btn-raised ml-5' to={'/uploads'}>Back</Link>
            </div>
        </form>
    );

    render() {
        const {
            title,
            body,
            error,
            loading,
            redirectToUpload
        } = this.state;

        if (redirectToUpload) {
            return <Redirect to={`/uploads/by/${isAuthenticated().user._id}`} />;
        }

        return (
            <div>
                <Container>
                    <Body>
                        <Content style={{'margin': '50px 0 0 10px'}}>
                        <div
                            className="alert alert-danger"
                            style={{ display: error ? "" : "none" }}
                        >
                            {error}
                        </div>

                        {loading ? (
                            <div className="jumbotron text-center">
                                <h2>Loading...</h2>
                            </div>
                        ) : (
                            ""
                        )} 
        

                        {this.newPostForm(title, body)}
                        </Content>

                        

                    </Body>
                </Container>
            </div>
        );
    }
}

export default NewUpload;