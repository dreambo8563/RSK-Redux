// 用户states

// ------------------------------------
// Constants
// ------------------------------------

export const UPDATEUSERINFO = 'UPDATEUSERINFO'
export const INCREASERETRYNUM = 'INCREASERETRYNUM'
export const SETUSERLOCKED = 'SETUSERLOCKED'
export const MARKASNEW = 'MARKASNEW'
export const MARKASSIGNED = 'MARKASSIGNED'
export const MARKASPURCHASED = 'MARKASPURCHASED'
export const AUTHENTICATED = 'AUTHENTICATED'
export const UNREADMSG = 'UNREADMSG'

// 最大重试次数
const maxRetryTime = 10
// ------------------------------------
// Actions
// ------------------------------------

/**
 * 更新个人信息，id之类的，payload可以是处理后的obj，以便和state融合
 * @export
 * @param {any} [user={}]
 * @returns
 */
export function setUserInfo(user = {}) {
    return {
        type: UPDATEUSERINFO,
        payload: user
    }
}

/**
 * 增加登陆错误次数
 * @export
 * @param {number} [value=1]
 * @returns
 */
export function increaseRetryNum(value = 1) {
    return {
        type: INCREASERETRYNUM,
        payload: value
    }
}

/**
 * 锁定账户
 * @export
 * @param {boolean} [locked=false]
 * @returns
 */
export function setUserLocked(locked = true) {
    return {
        type: SETUSERLOCKED,
        payload: locked
    }
}

// 登陆重试
export const signRetry =
    () => (dispatch, getState) => {
        if (getState().userState.retryTimes >= maxRetryTime) {
            // set it as locked
            dispatch(setUserInfo(true))
        } else {
            dispatch(increaseRetryNum(1))
        }
    }

/**
 * 标记为未注册的新用户，需要注册
 * @export
 * @param {boolean} [newUser=true]
 * @returns
 */
export function markAsNewUser(newUser = true) {
    return {
        type: MARKASNEW,
        payload: newUser
    }
}

/**
 * 标记为已登陆用户
 * @export
 * @param {boolean} [signed=true]
 * @returns
 */
export function markAsSignedUser(signed = true) {
    return {
        type: MARKASSIGNED,
        payload: signed
    }
}

/**
 * 标记为已投资过的用户
 * @export
 * @param {boolean} [purchased=true]
 * @returns
 */
export function markAsPurchasedUser(purchased = true) {
    return {
        type: MARKASPURCHASED,
        payload: purchased
    }
}

/**
 * 标记为已实名绑定的用户
 * @export
 * @param {boolean} [authenticated=true]
 * @returns
 */
export function markAsAuthenticatedUser(authenticated = true) {
    return {
        type: AUTHENTICATED,
        payload: authenticated
    }
}

/**
 * 标记是否有未读信息
 * @export
 * @param {boolean} [hasUnreadMsg=true]
 * @returns
 */
export function setUnreadMsg(hasUnreadMsg = true) {
    return {
        type: UNREADMSG,
        payload: hasUnreadMsg
    }
}

export const actions = {
    setUserInfo,
    setUserLocked,
    increaseRetryNum,
    signRetry,
    markAsNewUser,
    markAsSignedUser,
    markAsPurchasedUser,
    markAsAuthenticatedUser,
    setUnreadMsg
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [UPDATEUSERINFO]: (state, action) => {
        return { ...state, userInfo: action.payload }
    },
    [INCREASERETRYNUM]: (state, action) => {
        return { ...state, retryTimes: state.retryTimes + action.payload }
    },
    [SETUSERLOCKED]: (state, action) => {
        return { ...state, locked: action.payload }
    },
    [MARKASNEW]: (state, action) => {
        return { ...state, newUser: action.payload }
    },
    [MARKASSIGNED]: (state, action) => {
        return { ...state, signed: action.payload }
    },
    [MARKASPURCHASED]: (state, action) => {
        return { ...state, purchased: action.payload }
    },
    [AUTHENTICATED]: (state, action) => {
        return { ...state, authenticated: action.payload }
    },
    [UNREADMSG]: (state, action) => {
        return { ...state, hasUnreadMsg: action.payload }
    }
}

// ------------------ ------------------
// Reducer
// ------------------------------------
const initialState = {
    userInfo: {},
    retryTimes: 0, // 密码错误次数
    locked: false, // 账户锁住
    newUser: false, // 没注册过
    signed: false, // 已登陆
    purchased: false, // 投资过
    authenticated: false, // 实名绑定的
    hasUnreadMsg: false  // 有未读信息
}

export default function userReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    // console.log('running counterReducer');
    // console.log('handler', ACTION_HANDLERS);

    return handler ? handler(state, action) : state
}
