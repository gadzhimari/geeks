import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import cn from 'cn-decorator';

import './PostPagination.scss';

@cn('PostPagination')
class PostPagination extends PureComponent {
  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };

  render(cn) {
    const { pageCount, onPageChange } = this.props;

    return (
      <div className={cn()}>
        <ReactPaginate
          nextLabel={''}
          previousLabel={''}
          previousClassName={cn('paginationItemPrev')}
          nextClassName={cn('paginationItemNext')}
          previousLinkClassName={cn('paginationLinkItemPrev')}
          nextLinkClassName={cn('paginationLinkItemNext')}
          breakLabel={<span>..</span>}
          breakClassName={cn('paginationItemBreak')}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={onPageChange}
          containerClassName={cn('paginationList')}
          subContainerClassName={'pages pagination'}
          activeClassName={cn('paginationItemActive')}
          pageClassName={cn('paginationItem')}
          pageLinkClassName={cn('paginationItemLink')}
        />
      </div>
    );
  }
}

export default PostPagination;
