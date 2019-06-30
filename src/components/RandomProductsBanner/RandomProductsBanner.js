import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { fetchBanner } from '../../containers/Dashboard/actions';
import {
  makeSelectProducts,
  makeSelectError,
} from '../../containers/Dashboard/selectors';
import { randomProductsBannerOptions } from './constants';

import './RandomProductsBanner.scss';

const { updateInterval, amountRandomProducts } = randomProductsBannerOptions;

const getProductItem = product => {
  const productToJs = product.toJS();
  const { id, name, img, type, price, description } = productToJs;

  return (
    <li
      key={`random-product-banner-item-${id}`}
      className="random-products-banner__product-item"
    >
      <img
        className="random-products-banner__product-item__img-preview"
        src={img}
        alt={name}
        title={name}
      />
      <div className="random-products-banner__product-item__info">
        <h4 className="random-products-banner__product-item__name">{name}</h4>
        <span className="random-products-banner__product-item__type">
          {type}
        </span>
        <span className="random-products-banner__product-item__price">
          <FormattedMessage {...messages.productPrice} />: ${price}
        </span>
        <span className="random-products-banner__product-item__description">
          {description}
        </span>
      </div>
    </li>
  );
};

const BannerView = data => {
  const { products } = data;

  return (
    <React.Fragment>
      <ul className="random-products-banner__products-list">
        {products.map(product => {
          return getProductItem(product);
        })}
      </ul>
    </React.Fragment>
  );
};

class RandomProductsBanner extends React.PureComponent {
  componentDidMount() {
    const { updateInterval } = this.props;

    this.updateBanner();
    this.interval = setInterval(this.updateBanner, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateBanner = () => {
    const { amountRandomProducts, fetchBanner } = this.props;

    fetchBanner(amountRandomProducts);
  };

  render() {
    const { randomProducts, error } = this.props;
    const content = !error ? <BannerView products={randomProducts} /> : null;

    return (
      <div className="random-products-banner">
        {error}
        {content}
      </div>
    );
  }
}

RandomProductsBanner.defaultProps = {
  updateInterval,
  amountRandomProducts,
};

RandomProductsBanner.propTypes = {
  updateInterval: PropTypes.number.isRequired,
  amountRandomProducts: PropTypes.object,
  randomProducts: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  fetchBanner: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  randomProducts: makeSelectProducts(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchBanner: amountRandomProducts =>
      dispatch(fetchBanner(amountRandomProducts)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RandomProductsBanner);
