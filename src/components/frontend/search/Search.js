import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import {getMusicList} from '../../../actions';
import { musicActions } from '../../../actions';
import { connect } from 'react-redux';
import './style.css';

const Style = {
  textAlign: 'center'
};

class Search extends Component{
constructor(props){
    super(props);
    this.state = {
      searchfield: '',
      isLoading: true,
      check: ''
    };

    //this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.setIsLoadingState = this.setIsLoadingState.bind(this);
}

async componentDidMount() {
  const { dispatch } = this.props;
  await  dispatch(musicActions.getMusicList());
   this.setState({isLoading: false});
  //this.props.getMusicList();
  //console.log(this.props.getMusicList());
}

handleInputChange = (event) =>{
    //this.setState({value: event.target.value});
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    //console.log(this.state);
    this.setIsLoadingState(true);
    event.preventDefault();
     const { dispatch } = this.props;
     await dispatch(musicActions.musicSearch(this.state.searchfield));
     this.setIsLoadingState(false);
  }

  setIsLoadingState = async (val) => {
    await this.setState({ isLoading: val });
    //alert('A name was submitted: ' + this.state.isLoading);
  } 

  render() {
    const {musicList} = this.props;
    console.log(this.state.isLoading);
    return (
      <main className="music">
        <Helmet>
          <title>Music Search</title>
        </Helmet>
         <div className="wrapper">
        <div className="container-fulid">
          <div className="search-section">
            <div className="col-md-12">
              <form className="search-form" onSubmit={this.handleSubmit}>
                 <input 
                    type="text"
                    name="searchfield"
                    className="form-control"
                    id="keyword"
                    placeholder="Search"
                    value={this.state.searchfield}
                    onChange={this.handleInputChange}
                 />
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>  
          </div>
        </div>
        <div className="container-fulid">
              {
                this.state.isLoading &&
                <div className="loading" style={Style}><img src="loader.gif"/></div>
              }
              {musicList != undefined && musicList.music.resultCount > 0 ? (
                <div className="col-md-12 music-list">
                {musicList.music.results.map((music, index) => (
                  <div className="col-md-3 music-sec">
                    <div className="music-content">
                      <div className="music-image">
                        <img src={music.artworkUrl60} />
                      </div>
                      <div className="music-title-sec">
                        <p className="music-title">
                        { music.collectionName.length > 15 ? (
                            music.collectionName.substr(0, 15)
                          ) : (music.collectionName)
                        }
                        </p>
                        <p className="music-artist">
                        { music.artistName != 'Undefined' ? (
                            music.artistName.substr(0, 15)
                          ) : ('N/A')
                        }
                        </p>
                        <a target ="_blank" href={music.collectionViewUrl}>Go to Link</a>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              ) : (!this.state.isLoading && <div style={Style}>No Record Found</div>)}
        </div>
      </div>
	   </main>
    )
  }
}

function mapStateToProps(state){
  return {
    musicList: state.music,
  };
}

export default connect(mapStateToProps)(Search);
