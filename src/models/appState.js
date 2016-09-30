// App级别的全局states

// ------------------------------------
// Constants
// ------------------------------------
export const LOADINGSTATUS = 'LOADINGSTATUS'

// ------------------------------------
// Actions
// ------------------------------------

/**
 * 设置loading状态
 * @export
 * @param {boolean} [status=true]
 * @returns
 */
export function loadingStatus(status = true) {
    return {
        type: LOADINGSTATUS,
        payload: status
    }
}

export const actions = {
    loadingStatus
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOADINGSTATUS]: (state, action) => {
        return { ...state, loading: action.payload }
    }
}

// ------------------ ------------------
// Reducer
// ------------------------------------
const initialState = { loading: true }

export default function appReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    // console.log('running counterReducer');
    // console.log('handler', ACTION_HANDLERS);

    return handler ? handler(state, action) : state
}
