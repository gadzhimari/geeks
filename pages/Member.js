import React, { Component } from 'react';
import Config from '../config';

class Member extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, member: {} }
    }

    async componentDidMount() {
        let response = await fetch(`${Config.host}/members/${this.props.match.params.id}`)
        let data = await response.json()
        this.setState({
            loading: false,
            member: data
        })
    }

    render() {
        if (!this.state.loading) {
            return (
                <div className="member">
                    <div className="container">
                        <div className="member__information">
                            <h2 className="member-title">{this.state.member.name}</h2>
                        </div>
                        <div className="member__description">
                            {this.state.member.position}
                        </div>
                    </div>
                </div>
            );
        }

        return (<h2>Waiting for API...</h2>);
    }
}

export default Member;
