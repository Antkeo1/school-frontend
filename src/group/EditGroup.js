import React, {Component} from 'react'
import { singleGroup, update } from './apiGroup';
import { isAuthenticated } from "../auth";
import { Redirect} from "react-router-dom";
import {Container, 
    Body,
    Content
  } from 'react-holy-grail-layout'


class EditGroup extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            name: '',
            mission: '',
            redirectToGroup: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (groupId) => {
        singleGroup(groupId).then(data => {
            if (data.error) {
                this.setState({redirectToGroup: true})
            } else {
                this.setState({id: data._id, name: data.name, mission: data.mission, error: ''})
            }
        })
    }

    componentDidMount() {
        this.groupData = new FormData()
        const groupId = this.props.match.params.groupId
        this.init(groupId)
    }

    isValid = () => {
        const { name, mission, fileSize } = this.state;
        if (fileSize > 10000000) {
            this.setState({
                error: "File size to large",
                loading: false
            });
            return false;
        }
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
            const groupId = this.state.id
            const token = isAuthenticated().token;

            update(groupId, token, this.groupData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        name: "",
                        mission: "",
                        redirectToGroup: true
                    });
                }
            });
        }
    };

    editGroupForm = (name, mission) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Change Logo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Group Name</label>
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
                Update Group info
            </button>
        </form>
    );


    render() {
        const {id, name, mission, redirectToGroup, error, loading} = this.state

        if (redirectToGroup) {
            return <Redirect to={`/group/${id}`} />;
        }

        return (
            <div>
              <Container>
                  <Body>
                      <Content style={{'margin': '60px 0 0 10px'}}>
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
                        {/* <img style={{height: '200px', width: 'auto'}} className='img-thumbnail' src={`${process.env.REACT_APP_API_URL}/group/photo/${id}`} onError={i => (i.target.src = ``)} alt='' /> */}


                        {this.editGroupForm(name, mission)}
                      </Content>

                      
                  </Body>
              </Container>
            </div>
        )
    }
}

export default EditGroup