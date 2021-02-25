import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import HeaderContainer from "./Header/HeaderContainer";
import Footer from "./Footer/Footer";


class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    return (
      <main>
        <HeaderContainer />
        {this.props.children}
        <Footer />
      </main>
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
)(Wrapper);

export default Container;
