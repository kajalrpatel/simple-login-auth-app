import * as ActionTypes from './ActionTypes';

export const Items = (state = {
        items:[],
        isLoading : true,
        errmess: null
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_ITEMS:
            return {...state, items:action.payload, isLoading : false, errmess: null }
        case ActionTypes.ITEMS_LOADING:
            return {...state, items:[], isLoading : true, errmess: null}
        case ActionTypes.ITEMS_FAILED:
            return {...state, items:[], isLoading : false, errmess: action.payload }
        default: 
            return state;
    }
}