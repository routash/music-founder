import {SET_MUSIC,SEARCH_MUSIC} from '../types/types'

let APP_URL = "https://itunes-search-iypahdbpmn.now.sh/api/search?media=all";
export const musicActions = {
    getMusicList,
    musicSearch
};

function getMusicList() {
    return dispatch =>
    fetch(`${APP_URL}`)
      .then(data => data.json())
      .then((data) => { 
        return dispatch({
            type: SET_MUSIC,
            payload: data
        })
        //console.log('data', data);
    });
}

function musicSearch(searchText) {
    if(searchText)
    {
        URL = APP_URL+'&term='+searchText;
    }
    else
    {
        URL = APP_URL;
    }
    console.log(URL);

    return dispatch =>
    fetch(`${URL}`)
      .then(data => data.json())
      .then((data) => { 
        return dispatch({
            type: SEARCH_MUSIC,
            payload: data
        })
        //console.log('data', data);
    });
}

