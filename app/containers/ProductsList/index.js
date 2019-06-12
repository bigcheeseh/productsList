import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { tableHeaders } from './tableHeaders';
import { itemsReducer } from './reducers';
import saga from './saga';
import { getItems } from './actions';
import { selectGoods } from './selectors';
import { GOODS_REDUCER_NAME } from './constants';
import * as Styled from './StyledComponents';
import TableWithPaginator from '../../components/Table/TableWithPaginator';

class ProductsList extends React.PureComponent {
  limit = 5;

  state = {
    limit: this.limit,
    page: this.props.goods.page,
  };

  componentDidMount = () => {
    this.props.getItems(this.state.limit, this.state.page);
  };

  render() {
    const { goods } = this.props;
    const headers = this.setTableHeaders();
    return (
      <Styled.Wrapper>
        <Helmet>
          <title>ProductsList</title>
          <meta name="description" content="Description of ProductsList" />
        </Helmet>
        <Styled.TableSection>
          <TableWithPaginator
            tableHeaders={headers}
            tableData={goods.data}
            limit={this.state.limit}
            page={this.state.page + 1}
            count={goods.count}
            onPageChange={this.onPageChange}
          />
        </Styled.TableSection>
      </Styled.Wrapper>
    );
  }

  onPageChange = page => {
    const { limit } = this.state;
    this.setState({ page: page - 1 });
    this.props.getItems(limit, page - 1);
  };

  onLimitChange = limit => {
    this.setState({ limit, page: 0 });
    this.props.getItems(limit, this.defaultPage);
  };

  setTableHeaders = () => [
    ...tableHeaders,
    {
      key: 'custom',
      name: 'Подробно',
      component: prop => (
        <Styled.Link>
          <NavLink to={`/products/${prop.id}`}>Просмотр</NavLink>
        </Styled.Link>
      ),
    },
  ];
}

ProductsList.propTypes = {
  getItems: PropTypes.func.isRequired,
  goods: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  goods: selectGoods(state),
});

const mapDispatchToProps = {
  getItems,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: GOODS_REDUCER_NAME,
  reducer: itemsReducer,
});
const withSaga = injectSaga({ key: GOODS_REDUCER_NAME, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductsList);
