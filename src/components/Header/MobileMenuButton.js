import React, {Component} from 'react';

class MobileMenuButton extends Component {

  render() {
    const {showMobileMenu} = this.props
    return (
        <div onClick={showMobileMenu} className="slicknav_menu">
          <span className="slicknav_btn slicknav_collapsed">
          <span className="slicknav_menutxt">MENU</span>
          <span className="slicknav_icon">
                  <span className="slicknav_icon-bar"/>
                  <span className="slicknav_icon-bar"/>
                  <span className="slicknav_icon-bar"/>
                </span>
          </span>
        </div>
    );
  }
}

export default MobileMenuButton;
