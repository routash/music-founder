import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


class HomeContent extends Component {
  constructor(props){
    super(props);
  }

  render()
  {
    const { loggedIn } = this.props;

    return (
      <div className="content-part">
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              HomeContent
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state,ownProps){
  return {
    loggedIn: state.authentication.loggedIn,
  };
}
export default connect(mapStateToProps)(HomeContent);
