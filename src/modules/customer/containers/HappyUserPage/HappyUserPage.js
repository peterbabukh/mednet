import React from 'react';
import { withRouter } from 'react-router-dom';

import ProductsCollection from '../../../../containers/ProductsCollection';
import RandomProductsBanner from '../../../../components/RandomProductsBanner';
import WizardForm from './components/WizardForm';

import './HappyUserPage.scss';

class HappyUserPage extends React.PureComponent {
  render() {
    return (
      <ul className="happy-user-page">
        <li>
          <WizardForm />
        </li>
        <li>
          <RandomProductsBanner />
        </li>
        <li>
          <ProductsCollection />
        </li>
      </ul>
    );
  }
}

export default withRouter(HappyUserPage);
