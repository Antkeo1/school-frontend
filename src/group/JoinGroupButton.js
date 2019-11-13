import React, { Component } from "react";
import { joinGroup, leaveGroup} from "./apiGroup";

class JoinGroupButton extends Component {
    followClick = () => {
        this.props.onButtonClick(joinGroup);
    };

    unfollowClick = () => {
        this.props.onButtonClick(leaveGroup);
    };

    render() {
        return (
            <div className="d-flex">
                {!this.props.member ? (
                    <button
                        onClick={this.followClick}
                        style={{backgroundColor: 'blue', color: 'white'}}
                        className="btn btn-raised mr-5"
                    >
                        Join
                    </button>
                ) : (
                    <button
                        onClick={this.unfollowClick}
                        className="btn btn-warning btn-raised"
                    >
                        Leave
                    </button>
                )}
            </div>
        );
    }
}

export default JoinGroupButton;