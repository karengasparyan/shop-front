import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect, withRouter} from "react-router-dom";
import PropTypes from "prop-types";

class BrandCrumb extends Component {
  static propTypes = {
    brandCrumb: PropTypes.string.isRequired,
  }

  redirectHome = () => {
    this.props.history.push('/')
  }

  render() {
    const { crumb } = this.props
    return (
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <a onClick={this.redirectHome}><i className="fa fa-home"/> ГЛАВНАЯ</a>
                <span>{crumb}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = {
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BrandCrumb));

export default Container;
