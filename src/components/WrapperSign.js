import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WrapperSign extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    // const { token } = this.props;
    // if (token) {
    //   return <Redirect to="/" />;
    // }
    return (
      <main>
        <div className="layout">
          {this.props.children}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrapperSign);

export default Container;
