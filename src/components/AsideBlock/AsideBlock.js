import React, { Component } from 'react';

import './AsideBlock.css';

export default class AsideBlock extends Component {
  state = {
    isAsideBlockOpened: false,
  };

  asideBlockOnCloseHandler = () => {
    this.setState({
      isAsideBlockOpened: false,
    });
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
          onClick={this.asideBlockOnCloseHandler}
          className="aside-block__close-btn fa fa-times"
        />
      </div>
    );
  };

  renderDots = () => {
    return (
      <i
        onClick={this.toggleAsideBlock}
        className="aside-block__dots fas fa-ellipsis-v"
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
