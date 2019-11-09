import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiGroup";
import { Redirect } from "react-router-dom";
import {Container, 
    Body,
    Content
} from 'react-holy-grail-layout'

class NewGroup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            mission: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToCreator: false
        };
    }

    componentDidMount() {
        this.groupData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { name, mission, fileSize } = this.state;
        // if (fileSize > 1000000) {
        //     this.setState({
        //         error: "File size should be less than 100kb",
        //         loading: false
        //     });
        //     return false;
        // }
        if (name.length === 0 || mission.length === 0) {
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
        this.groupData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.groupData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        name: "",
                        mission: "",
                        redirectToCreator: true
                    });
                }
            });
        }
    };

    newGroupForm = (name, mission) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Group Logo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Name of group</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Mission Statement</label>
                <textarea
                    onChange={this.handleChange("mission")}
                    type="text"
                    className="form-control"
                    value={mission}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Create Group
            </button>
        </form>
    );

    render() {
        const {
            name,
            mission,
            user,
            error,
            loading,
            redirectToCreator
        } = this.state;

        if (redirectToCreator) {
            return <Redirect to={`/user/${user._id}`} />;
        }

        return (
            <div >
                <Container>
                    <Body>
                        <Content style={{'margin': '10px 0 0 10px'}}>
                            <h2 className="mt-5 mb-5">Create a Group page</h2>
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
            

                            {this.newGroupForm(name, mission)}
                        </Content>

                       

                        
                    </Body>
                </Container>
            </div>
        );
    }
}

export default NewGroup;