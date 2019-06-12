import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Spinner from '../../components/Spinner';
import { getItem } from './actions';
import { selectCurrentItem } from './selectors';
import { CURRENT_ITEM_REDUCER_NAME } from './constants';
import { itemReducer } from './reducers';
import { currentItemSaga } from './saga';
import { tableHeaders } from './tableHeaders';
import * as Styled from './StyledComponents';
import Table from '../../components/Table/Table';

class ProductPage extends React.PureComponent {
  componentDidMount = () => {
    this.props.getItem(this.props.match.params.id);
  };

  render() {
    const { data } = this.props.currentItem;
    if (this.props.currentItem.isFetching) return <Spinner />;
    return (
      <Styled.Wrapper>
        <Helmet>
          <title>ProductPage</title>
          <meta name="description" content="Description of ProductPage" />
        </Helmet>
        <Styled.TableSection>
          <Styled.Link>
            <NavLink to="/products">Весь список</NavLink>
          </Styled.Link>
          <Table tableHeaders={tableHeaders} tableData={[data]} limit={1} />
        </Styled.TableSection>
        {this.renderProductDescription()}
      </Styled.Wrapper>
    );
  }

  renderImages = () => {
    const { Itemimages } = this.props.currentItem.data;
    if (Itemimages) {
      return (
        <Styled.ImagesWrapper>
          {Itemimages.map(this.renderImage)}
        </Styled.ImagesWrapper>
      );
    }
    return undefined;
  };

  renderImage = image => (
    <Styled.ImageWrapper key={image.link}>
      <LazyLoadImage height={300} src={image.link} />
    </Styled.ImageWrapper>
  );

  renderProductDescription = () => {
    const { data } = this.props.currentItem;
    return (
      <div>
        {this.renderImages()}
        {this.renderItemInfo(`Описание акции`, data.action)}
        {this.renderItemInfo(`Условия акции`, data.actionterm)}
        {this.renderItemInfo(
          `Тип КБ`,
          data.Cashbacktype && data.Cashbacktype.name,
        )}
        {this.renderItemInfo(`Величина КБ`, data.cashbackamount)}
        {this.renderItemInfo(
          `Минимально количество покупок`,
          this.getMinAmount(data.restrictions),
        )}
        {this.renderItemInfo(
          `Максимальное количество покупок`,
          this.getMaxAmount(data.restrictions),
        )}
      </div>
    );
  };

  renderItemInfo = (title, description) => (
    <Styled.TextWrapper>
      <h3>{title}</h3>
      {description || ' - '}
    </Styled.TextWrapper>
  );

  getMaxAmount = restrictions => {
    if (restrictions) {
      return restrictions.count && restrictions.count.max;
    }

    return undefined;
  };

  getMinAmount = restrictions => {
    if (restrictions) {
      return restrictions.count && restrictions.count.min;
    }

    return undefined;
  };
}

ProductPage.propTypes = {
  currentItem: PropTypes.object.isRequired,
  getItem: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentItem: selectCurrentItem(state),
});

const mapDispatchToProps = {
  getItem,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: CURRENT_ITEM_REDUCER_NAME,
  reducer: itemReducer,
});

const withSaga = injectSaga({
  key: CURRENT_ITEM_REDUCER_NAME,
  saga: currentItemSaga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductPage);
