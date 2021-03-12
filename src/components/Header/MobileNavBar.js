import React, {Component, Fragment} from 'react';
import ReactProSlider from './ReactProSlider';

class MobileNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  showMenu = () => {
    const {show} = this.state;
    this.setState({show: !show})
  };

  render() {
    const {show} = this.state;
    const {catalog} = this.props;
    return (
      <Fragment>
        <i className="contactIcon fa fa-phone"/>
        <a className="ContactTel" href="tel:+79996955303">8 (999) 695-53-03</a>
        <div onClick={this.showMenu} className="slicknav_menu">
          <span className="slicknav_btn slicknav_collapsed">
          <span className="slicknav_menutxt">MENU</span>
          <span className="slicknav_icon">
                  <span className="slicknav_icon-bar"/>
                  <span className="slicknav_icon-bar"/>
                  <span className="slicknav_icon-bar"/>
                </span>
          </span>
        </div>
        <ReactProSlider show={show} catalog={catalog}/>
      </Fragment>
    );
  }
}

export default MobileNavBar;
