import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Icon } from './logo.svg';

import './Logo.scss';

class Logo extends Component {
  static propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    const { color, onClick, ...restProps } = this.props;

    return (
      <span className="logo" onClick={onClick} {...restProps}>
        <Icon fill={color} />
      </span>
    );
  }
}

export default Logo;
