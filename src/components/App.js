import React, { Component } from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import Search from './frontend/search/Search';

class App extends Component{
  render() {
    return (
    	<Switch>
      			<Route path="/" component={Search} />

    	</Switch>
    );
  }
}
export default App;
