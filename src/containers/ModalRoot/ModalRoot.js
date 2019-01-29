import * as React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import OverlayMessage from '../../components/OverlayMessage';

import { makeSelectModalComponent } from './selectors';
import { MODAL_ROOT } from './constants';
import { OVERLAY_MESSAGE_COMPONENT } from '../../constants';

import './ModalRoot.css';

const MODAL_COMPONENTS = {
  [OVERLAY_MESSAGE_COMPONENT]: OverlayMessage,
};

export class ModalRoot extends React.PureComponent {
  render() {
    const { component } = this.props;

    if (!component) return <div id={MODAL_ROOT} />;

    const SpecificModal = MODAL_COMPONENTS[component.type] || null;
    return <SpecificModal />;
  }
}

ModalRoot.propTypes = {
  component: PropTypes.shape({
    type: PropTypes.string,
    data: PropTypes.any,
  }),
};

const mapStateToProps = createStructuredSelector({
  component: makeSelectModalComponent(),
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'modal', reducer });

export default compose(
  withReducer,
  withConnect,
)(ModalRoot);
