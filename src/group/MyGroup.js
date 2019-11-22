import React from 'react'
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read, groupsByUser } from "../user/apiUser";

class MyGroup extends React.Component {
    constructor() {
        super();
        this.state = {
          user: { group: [] },
          redirectToSignin: false,
          groups: [],
        };
      }

      createdGroup = () => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        groupsByUser(userId, token).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.setState({ groups: data });
          }
        });
      }

      init = () => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
          if (data.error) {
            this.setState({ redirectToSignin: true });
          } else {
            this.setState({ user: data});
            this.createdGroup(data._id)
          }
        });
      };

      componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
      }

    render() {
        const {groups} = this.state
        console.log(groups)
        return (
            <div>
                  <div className="col-md-3" style={{marginTop: '80px'}}>
                        <h3 className="text-primary">{groups.length} Groups Created</h3>
                        <hr />
                        {groups.map((group, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/group/${group._id}`}>
                                        <div>
                                            <p className="lead">{group.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        )
    }
}

export default MyGroup