import React, { Component } from 'react';
import { Members } from '../api';

class Member extends Component {
  state = { loading: true, member: {} };

  async componentDidMount() {
    const { data } = await Members.getMember(this.props.match.params.id);

    this.setState({
      loading: false,
      member: data,
    });
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

    return <h2>Waiting for API...</h2>;
  }
}

export default Member;
