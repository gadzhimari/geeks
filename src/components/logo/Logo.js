import React, { Component } from "react";
import PropTypes from 'prop-types';
import { ReactComponent as Icon } from './logo.svg';

class Logo extends Component {
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    const { color } = this.props;

    return (
      <Icon
        color={color}
      />
    );
  }
}

export default Logo;
