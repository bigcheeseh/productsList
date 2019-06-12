import React from 'react';
import PropTypes from 'prop-types';
import Paginator from 'components/Paginator';
import { PaginatorWrapper, CommonTableWrapper } from './StyleWrappers';

class PaginatorWrapperComponent extends React.PureComponent {
  render() {
    return (
      <CommonTableWrapper>
        {this.renderPaginator()}
        {this.props.children}
        {this.renderPaginator()}
      </CommonTableWrapper>
    );
  }

  renderPaginator = () => (
    <PaginatorWrapper>
      <Paginator
        limit={this.props.limit}
        page={this.props.page}
        count={this.props.count}
        onPageChange={this.props.onPageChange}
      />
    </PaginatorWrapper>
  );
}

PaginatorWrapperComponent.propTypes = {
  children: PropTypes.node.isRequired,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
};

export default PaginatorWrapperComponent;
