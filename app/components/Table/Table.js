import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResponsiveWrapper } from './StyleWrappers';

const TableWrapper = styled.table`
  margin-bottom: 0;
  width: 100%;
  min-width: ${props => props.columnsAmount * 110}px;
  font-size: 12px;
  background-color: #ffffff;
  border-spacing: 0;
  border-collapse: collapse;
`;

const THead = styled.thead`
  width: 100%;
  background-color: #073644;
  color: #ffffff;
  border-bottom: 1px solid #d3d3d3;
`;

const TRow = styled.tr`
  border-bottom: '1px solid #e3e5e6';
`;

const HeadCell = styled.td`
  padding: 20px 10px;
  text-align: left;
`;

const BodyCell = styled.td`
  min-width: 70px;
  max-width: 110px;
  padding: 10px;
  text-align: left;
`;

class Table extends React.PureComponent {
  render() {
    return (
      <ResponsiveWrapper limit={this.props.limit}>
        <TableWrapper columnsAmount={this.props.tableHeaders.length}>
          <THead>{this.renderHeaders()}</THead>
          {this.renderRows()}
        </TableWrapper>
      </ResponsiveWrapper>
    );
  }

  renderHeaders = () => (
    <tr>{this.props.tableHeaders.map(this.renderHeaderCell)}</tr>
  );

  renderHeaderCell = prop => <HeadCell key={prop.key}>{prop.name}</HeadCell>;

  renderRows = () => (
    <tbody>{this.props.tableData.map(this.renderColumns)}</tbody>
  );

  renderColumns = prop => (
    <TRow key={prop.id}>
      {this.props.tableHeaders.map(header =>
        this.renderColumnCells(prop, header),
      )}
    </TRow>
  );

  renderColumnCells = (prop, header) => (
    <BodyCell key={prop.id + header.key}>
      {this.getPropValue(prop, header, header.wrapper)}
    </BodyCell>
  );

  getPropValue = (prop, field, wrapper) => {
    const propValue = prop[field.key];
    if (field.key === 'custom') {
      return field.component(prop);
    }
    if (!propValue) {
      return '-';
    }
    if (typeof propValue === 'string' || typeof propValue === 'number') {
      if (wrapper) {
        return wrapper(propValue);
      }
      return propValue;
    }

    return propValue.name;
  };
}

Table.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
};

export default Table;
