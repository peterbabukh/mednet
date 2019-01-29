import * as React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import Modal from '../Modal';

import { makeSelectModalParams } from '../../containers/ModalRoot/selectors';

export class OverlayMessage extends React.PureComponent {
  renderMessage(msg) {
    return (
      <span>
        {typeof msg === 'string' ? msg : <FormattedMessage {...msg} />}
      </span>
    );
  }

  render() {
    const {
      message,
      confirmText,
      cancelText,
      confirmCallback,
      overlayClassName,
      contentClassName,
      dialogClassName,
      canCloseOverlay,
    } = this.props.params;

    return message ? (
      <Modal
        overlayClassName={overlayClassName}
        contentClassName={contentClassName}
        dialogClassName={classnames('overlay-message', dialogClassName)}
        confirmText={confirmText || 'OK'}
        cancelText={cancelText}
        confirmCallback={confirmCallback}
        canCloseOverlay={canCloseOverlay}
      >
        {Array.isArray(message) ? (
          message.map((msg, index) => (
            <div className="grid-row" key={`overlay-message-${index}`}>
              {this.renderMessage(msg)}
            </div>
          ))
        ) : (
          <div className="grid-row">{this.renderMessage(message)}</div>
        )}
      </Modal>
    ) : null;
  }
}

OverlayMessage.propTypes = {
  params: PropTypes.shape({
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    overlayClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    dialogClassName: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    confirmCallback: PropTypes.func,
    cancelCallback: PropTypes.func,
    canCloseOverlay: PropTypes.bool,
  }),
};

const mapStateToProps = createStructuredSelector({
  params: makeSelectModalParams(),
});

export default connect(mapStateToProps)(OverlayMessage);
