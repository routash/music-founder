
import {SET_MUSIC,SEARCH_MUSIC} from '../types/types'

const initialState = {
    music: [],
}

const music = (state = initialState, action = {}) => {
	//console.log(action);

    switch(action.type) {

        case SET_MUSIC:
        return { ...state, music: action.payload }
        case SEARCH_MUSIC:
        return { ...state, music: action.payload }
        default:
        return state;
    }

}

export default music;
