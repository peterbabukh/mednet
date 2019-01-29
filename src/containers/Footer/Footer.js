import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import './Footer.css';

export class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <section>
          <FormattedMessage {...messages.copyright} />
          &nbsp; TeamCoFounder
        </section>
      </div>
    );
  }
}

export default Footer;
