import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'cn-decorator';

import { SOCIAL_NETWORKS } from '../../config';
import './Social.scss';

@cn('Social')
class Social extends Component {
  static propTypes = {
    title: PropTypes.object.isRequired,
    showTitle: PropTypes.boolean,
  };

  static defaultProps = {
    showTitle: true,
    title: 'Share',
  };

  render(cn) {
    const { title, showTitle } = this.props;

    return (
      <div className={cn()}>
        {showTitle && <span className={cn('title')}>{title}</span>}
        <div className={cn('list')}>
          {SOCIAL_NETWORKS.map((network) => (
            <a
              href={network.url}
              title={network.name}
              className={cn('item')}
              target="_blank"
            >
              {network.name}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default Social;
