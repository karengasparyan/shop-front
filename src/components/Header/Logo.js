import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink} from "react-router-dom";

class Logo extends Component {
  render() {
    const { style } = this.props;

    return (
        <div style={style} className="col-lg-2 col-md-2">
            <div className="logo">
                <NavLink to="/">
                    <img src="/assets/img/adamex-logo1.png" alt="logo"/>
                </NavLink>
            </div>
        </div>
    );
  }
}

export default Logo;
