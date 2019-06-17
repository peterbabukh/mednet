import React from 'react';

import './AsideBlock.scss';

export default class AsideBlock extends React.PureComponent {
  state = {
    isAsideBlockOpened: false,
  };

  toggleAsideBlock = () => {
    const { isAsideBlockOpened } = this.state;
    this.setState({
      isAsideBlockOpened: !isAsideBlockOpened,
    });
  };

  renderAsideBlock = () => {
    return (
      <div className="aside-block__content">
        <i
          onClick={this.toggleAsideBlock}
          className="aside-block__close-btn fa fa-times"
        />
      </div>
    );
  };

  renderDots = () => {
    return (
      <i
        onClick={this.toggleAsideBlock}
        className="aside-block__dots fa fa-ellipsis-v"
      />
    );
  };

  render() {
    const { isAsideBlockOpened } = this.state;

    return (
      <div className="aside-block">
        {isAsideBlockOpened ? this.renderAsideBlock() : this.renderDots()}
      </div>
    );
  }
}
