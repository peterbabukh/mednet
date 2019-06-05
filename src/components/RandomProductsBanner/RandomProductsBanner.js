import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TestApiService from '../../utils/test-api-service';
import LoadingSpinner from '../LoadingSpinner';

import messages from './messages';
import { randomProductsBannerOptions } from './constants';

import './RandomProductsBanner.css';

const { updateInterval, cntRandomItems } = randomProductsBannerOptions;
class RandomProductsBanner extends React.PureComponent {
  static defaultProps = {
    updateInterval,
    cntRandomItems,
  };

  static propTypes = {
    updateInterval: PropTypes.number,
    cntRandomItems: PropTypes.number,
  };

  testswapiService = new TestApiService();

  state = {
    products: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updateBanner();
    this.interval = setInterval(this.updateBanner, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onBannerLoaded = products => {
    this.setState({
      products,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateBanner = () => {
    const { cntRandomItems } = this.props;

    this.testswapiService
      .getRandomProducts(cntRandomItems)
      .then(this.onBannerLoaded)
      .catch(this.onError);
  };

  render() {
    const { products, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <LoadingSpinner /> : null;
    const content = hasData ? <BannerView products={products} /> : null;

    return (
      <div className="random-products-banner">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const getProductItem = ({ id, name, img, description, price, type }) => {
  return (
    <li key={id} className="random-products-banner__product-item">
      <img
        className="random-products-banner__product-item__img-preview"
        src={img}
        alt={name}
        title={name}
      />
      <div>
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

getProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

const BannerView = data => {
  const { products } = data;
  return (
    <React.Fragment>
      <ul className="random-products-banner__products-list">
        {products.map(el => {
          return getProductItem(el);
        })}
      </ul>
    </React.Fragment>
  );
};

const Error = () => {
  return <React.Fragment>Error: loading banner data</React.Fragment>;
};

export default RandomProductsBanner;
