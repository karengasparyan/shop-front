import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink} from "react-router-dom";

class Logo extends Component {
  render() {
    return (
        <div className="col-lg-2 col-md-2">
            <div className="logo">
                <NavLink to="/">
                    <img src="/assets/img/adamex-logo1.png" alt="logo"/>
                </NavLink>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logo);

export default Container;
