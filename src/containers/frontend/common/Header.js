import React, {Component} from 'react';
import logo from '../../../logo.png';
import { Route,Link,Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { momentsActions,userActions,alertActions } from '../../../actions';
import { history } from '../../../helpers';
import PopUp from './PopUp';

const styLeft = {float : "left"}
const styWidth = {width: "100%"}
const st = {width: "35px", height: "35px", borderRadius: "50%"}

class Header extends Component {
  constructor(props){
    super(props);

    let user = JSON.parse(localStorage.getItem('user'));

    this.state = {
      userData: (user ? user : ''),
      searchVal: '',
    }
  }

  logout = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    userActions.logout()
  }

  handleKeyUp = (event) =>{
    //event.preventPropagation();
    const { dispatch,user } = this.props;
    var stringVal = event.target.value;
    this.setState({
        searchVal: stringVal,
    });
    if(stringVal.trim())
    { var val = event.target.value; }
    else { var val = ''; }
    const data = {
      search: val,
      user_id: user.id
    }
    dispatch(userActions.searchProcess(data));
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
  }

  handleBodyClick = () => {
    const { dispatch } = this.props;
    dispatch(userActions.emptySearchProcess());
  }

  SearchGo = (event) => {
    event.preventDefault();
    const { dispatch,user } = this.props;
    const { searchVal } = this.state;
    if(searchVal.trim())
    { var val = searchVal; }
    else { var val = ''; }
    if(val){
      history.push('/search/'+val);
    }
  }

  render(){
    const {searchProcess,user} = this.props;
    let {userData} = this.state;
    return (
      <div className="nav-main">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link to="/" className="navbar-brand" href><img src="/frontend/images/home-logo.png" alt="logo" /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            {user != undefined ? (
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to="/" className="nav-link" href><i className="fas fa-home" />Home</Link>
                </li>

                  <li className="nav-item">
                    <Link to="/instants/today" className="nav-link"><i className="fas fa-smile" />Instants</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/notifications" className="nav-link disabled"><i className="fas fa-bell" />Notifications</Link>
                  </li>
                    <li className="nav-item">
                      <button type="button" data-toggle="modal" data-target="#message" className="message">
                           <i className="fas fa-envelope"></i>Messages
                  	  </button>
                    </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <div className="search-main">
                  <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  name="searchtext"
                  onChange={this.handleKeyUp}
                  autoComplete="off"
                  required
                  />
                  <button onClick={this.SearchGo}><i className="fas fa-search" /></button>
                </div></form>
                <div className="nav-right">
                <div className="dropdown">
            		  <button className="btn1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            			<span>
                  {user.profile_image && user != undefined ?
                    (<img style={st} src={user.profile_image} alt="Profile Image" />)
                    : (<i className="fas fa-user"></i>)
                  }
                  </span>
            		  </button>
            		  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            		   <div className="user">
            			 <h3>{userData.name}</h3>
            			  <h4>{userData.username}</h4>
            		   </div>
                  <Link to={"/"+userData.username.replace("@","")} className="dropdown-item" >Profile</Link>
                  <Link to={"/"+userData.username.replace("@","")+"/lists"} className="dropdown-item" >Lists</Link>
                  <Link to={"/"+userData.username.replace("@","")+"/instants"} className="dropdown-item" >Instants</Link>
                  <Link to="/settings/account-setting" className="dropdown-item" >Settings and Privacy Policy</Link>
                  <Link to="/pages/help-centers" className="dropdown-item" >Help Center</Link>
                  <Link to="" onClick={this.logout} className="dropdown-item" >Log out</Link>
            		  </div>
            		</div>
                <button type="button" data-toggle="modal" data-target="#exampleModal" className="spark_link" data-dismiss="modal">
            	   Sparks
            	  </button>
              </div>
            </div>
            ) : ('')
            }

            {searchProcess.searchData != undefined ?
            (
              <div className="srch-pop">
                {searchProcess.searchData.string.length > 0 ? (
                	<ul className="strings">
                    {searchProcess.searchData.string.map((string, index) => (
                      <li key={index}>
                        <Link to={"/search/"+string.string} style={styWidth} onClick={() => this.handleUserSelect(string.string)} >
                          <span style={styLeft}>{string.string}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : ('')}
                {searchProcess.searchData.hashtag.length > 0 ? (
                	<ul className="hashtags">
                    {searchProcess.searchData.hashtag.map((hash, index) => (
                  		<li>
                        <Link to={"/search/"+hash.hashtag.replace("#", "")} style={styWidth} onClick={() => this.handleUserSelect(hash.hashtag)} >
                          <span style={styLeft}>{hash.hashtag}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : ('')}
                {searchProcess.searchData.username.length > 0 ? (
                  <ul className="users">
                    {searchProcess.searchData.username.map((userAccount, index) => (
                      <li>
                        <Link to={"/"+userData.username.replace("@","")} style={styWidth} onClick={() => this.handleUserSelect(userAccount.username)} >
                          <span style={styLeft}>
                            <img src={userAccount.profile_image} alt=""/>
                          </span>
                          <h6 style={styLeft}>{userAccount.username}</h6>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : ('')}
              </div>
            ) : ('')}
          </nav>
        </div>
        {user != undefined ? (
          <PopUp/>
          ) : ('')
        }
        <ToastContainer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  //console.log(state.searchprocess);
    return {
        user: state.authentication.user,
        searchProcess: state.searchprocess != undefined ? state.searchprocess : [],
    };
}
export default connect(mapStateToProps)(Header);
