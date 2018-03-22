import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';

class mainPage extends Component {
  render () {
    return(
      <h1> Just render something </h1>
    )
  }
}


function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(mainPage);
