import React from 'react';
import { withRouter } from 'react-router-dom';

import ProductsCollection from '../../../../containers/ProductsCollection';
import RandomProductsBanner from '../../../../components/RandomProductsBanner';
import WizardForm from '../../../../components/WizardForm';

class HappyUserPage extends React.PureComponent {
  render() {
    return (
      <div>
        <ul>
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
      </div>
    );
  }
}

export default withRouter(HappyUserPage);
