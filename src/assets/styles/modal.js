// https://reactcommunity.org/react-modal/
 import React from "react";

 const modalCustomStyle = {
  overlay: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '-5%',
    left: '20vw',
    backgroundColor: 'rgba(149,149,149,0)',
  },
  content: {
    width: '40%',
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#6d6d6d',
    overflow: 'hidden',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: 30,
  }
};

export default modalCustomStyle;