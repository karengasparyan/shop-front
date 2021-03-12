import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../components/Wrapper';

class Error404 extends Component {
  render() {
    return (
      <Wrapper>
        <h1>ERROR 404!</h1>
      </Wrapper>
    );
  }
}

const mapStateToProps = () => ({

});
const mapDispatchToProps = {

};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Error404);

export default Container;
