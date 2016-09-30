// import { List, Map } from 'immutable';
import 'whatwg-fetch'
// ------------------------------------
// Constants
// ------------------------------------
export const LAZYPATCH = 'LAZYPATCH'
export const INCREASEPAGE = 'INCREASEPAGE'
export const TOGGLESTOP = 'TOGGLESTOP'

// ------------------------------------
// Actions
// ------------------------------------
export function addMore(item = {}) {
    return {
        type: LAZYPATCH,
        payload: item
    }
}
export function changePage(pageNumber) {
    return {
        type: INCREASEPAGE,
        payload: pageNumber
    }
}
export function shouldStop() {
    return {
        type: TOGGLESTOP,
        payload: true
    }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

export const loadMoreData =
() => (dispatch, getState) =>
 fetch(`http://jsonplaceholder.typicode.com/posts/${getState().VincentTest.currentPage}`)
                           .then(res => res.json())
                .then(data => {
                    if (Object.keys(data).length === 0) {
                        // console.log(getState().stop);
                        dispatch(shouldStop())
                    } else {
                        dispatch(addMore(data))
                    }
                })

    export const actions = {
        changePage,
        loadMoreData
    }
    // ------------------------------------
    // Action Handlers
    // ------------------------------------
    const ACTION_HANDLERS = {
        [LAZYPATCH]: (state, action) => {
           return { ...state, data: state.data.concat(action.payload) }
         },
        [INCREASEPAGE]: (state, action) => {
            // console.log(state.currentPage + action.payload);
        return { ...state, currentPage:state.currentPage + action.payload }
            },
    [TOGGLESTOP]: (state, action) => {
        console.log(action.payload);
        return { ...state, stop: action.payload }
    }
}

// ------------------ ------------------
    // Reducer
    // ------------------------------------
    const initialState = { data: [], currentPage: 1, stop:false }
export default function testReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    // console.log('running counterReducer');
    // console.log('handler', ACTION_HANDLERS);

    return handler ? handler(state, action) : state
}
