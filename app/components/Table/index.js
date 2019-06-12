import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResponsiveWrapper } from './StyleWrappers';

const TableWrapper = styled.table`
  margin-bottom: 0;
  width: 100%;
  max-width: 100%;
  font-size: 12px;
  background-color: #ffffff;
  border-spacing: 0;
  border-collapse: collapse;
`;

const THead = styled.thead`
  background-color: #073644;
  color: #ffffff;
  border-bottom: 1px solid #d3d3d3;
`;
const HeadCell = styled.td`
  min-width: 100px;
  padding: 10px;
  text-align: left;
`;

const BodyCell = styled.td`
  border-bottom: 1px solid #e3e5e6;
  min-width: 70px;
  padding: 10px;
  text-align: left;
`;
const shortTd = styled.td`
  width: 30px;
  padding-right: 0;
`;

function Table({ ...props }) {
  const {
    tableHead = [],
    tableData = [],
    allowDelete,
    onRemoveRowClicked,
  } = props;
  return (
    <ResponsiveWrapper>
      <TableWrapper>
        {tableHead !== undefined && (
          <THead>
            <tr>
              {tableHead.map((prop, key) => (
                <HeadCell key={key}>{prop}</HeadCell> // eslint-disable-line react/no-array-index-key
              ))}
              {allowDelete !== undefined && <cell />}
            </tr>
          </THead>
        )}
        <tbody>
          {tableData.map((prop, key) => (
            <tr key={prop[0] ? prop[0].title : key}>
              {prop.map(value => (
                <BodyCell key={value.title}>{value.value}</BodyCell>
              ))}
              {allowDelete && (
                <shortTd
                  onClick={clickEvent => {
                    clickEvent.stopPropagation();
                    if (window.confirm('Удалить запись?')) { // eslint-disable-line
                      onRemoveRowClicked(key);
                    }
                  }}
                >
                  DEL
                </shortTd>
              )}
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </ResponsiveWrapper>
  );
}

Table.propTypes = {
  tableHead: PropTypes.array,
  tableData: PropTypes.array,
  allowDelete: PropTypes.bool,
  onRemoveRowClicked: PropTypes.func,
};

export default Table;
