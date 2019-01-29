import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';
import { BUTTON_VARIANTS } from '../../components/Button/constants';
import { hideOverlayModal } from '../../containers/ModalRoot/actions';

const { minSize, primary } = BUTTON_VARIANTS;

export class Modal extends React.PureComponent {
  closeOverlay = () => {
    const { canCloseOverlay = false, hideOverlayModal } = this.props;

    if (canCloseOverlay) {
      return hideOverlayModal();
    }
  };

  onConfirm = () => {
    const { confirmCallback } = this.props;

    confirmCallback && confirmCallback();
    this.closeDialog();
  };

  onCancel = () => {
    const { cancelCallback } = this.props;

    cancelCallback && cancelCallback();
    this.closeDialog();
  };

  closeDialog = () => {
    this.props.hideOverlayModal();
  };

  render() {
    const {
      overlayClassName = '',
      contentClassName = '',
      dialogClassName = '',
      children = null,
      confirmText = '',
      cancelText = '',
    } = this.props;

    return (
      <div className="modal-overlay">
        <div
          className={`modal-overlay__overlay ${overlayClassName}`}
          onClick={this.closeOverlay}
        />
        <div className={`modal-overlay__content ${contentClassName}`}>
          <div className={`modal-overlay__dialog ${dialogClassName}`}>
            {children}
            <div className="modal-overlay__btn-container">
              {confirmText && (
                <Button
                  variant={[minSize, primary]}
                  className="modal-overlay__btn"
                  onClick={this.onConfirm}
                >
                  {confirmText}
                </Button>
              )}
              {cancelText && (
                <Button
                  variant={minSize}
                  className="modal-overlay__btn"
                  onClick={this.onCancel}
                >
                  {cancelText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  overlayClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  dialogClassName: PropTypes.string,
  children: PropTypes.node,
  dispatch: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmCallback: PropTypes.func,
  cancelCallback: PropTypes.func,
  canCloseOverlay: PropTypes.bool,
  hideOverlayModal: PropTypes.func,
};

export const mapDispatchToProps = dispatch => ({
  hideOverlayModal: () => dispatch(hideOverlayModal()),
  dispatch,
});

export default connect(
  null,
  mapDispatchToProps,
)(Modal);
