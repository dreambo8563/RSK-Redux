// 首页配置的各种宣传banner

// ------------------------------------
// Constants
// ------------------------------------
export const SETBANNERDATA = 'SETBANNERDATA'

// ------------------------------------
// Actions
// ------------------------------------

/**
 * 设置更新不同种类标的数组
 * @export
 * @param {string} [data={ type: 'huoqi', data: [] }]
 * @returns
 */
export function setBannerData(data = []) {
    return {
        type: SETBANNERDATA,
        payload: data
    }
}

export const actions = {
    setBannerData
}
// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [SETBANNERDATA]: (state, action) => {
        return { ...state, banners: action.payload
        }
    }
}

// ------------------ ------------------
// Reducer
// ------------------------------------
// 基本包含的字段
// jijinId: undefined,
// buyableTime: 5000, // 5000ms后可抢购，针对具体标的
// sellout: true // 已抢光
const initialState = {
    banners: []
}

export default function bannerReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
