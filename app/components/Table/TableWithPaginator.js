import React from 'react';
import PropTypes from 'prop-types';
import PaginatorWrapper from './PaginatorWrapper';
import Table from './Table';

class TableWithPaginator extends React.PureComponent {
  render() {
    return (
      <PaginatorWrapper {...this.props}>
        <Table {...this.props} />
      </PaginatorWrapper>
    );
  }
}

TableWithPaginator.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
};

export default TableWithPaginator;
