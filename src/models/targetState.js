// 各种标的

// ------------------------------------
// Constants
// ------------------------------------
export const SETTARGETSTATUS = 'SETTARGETSTATUS'
export const SETTARGETDATA = 'SETTARGETDATA'

// ------------------------------------
// Actions
// ------------------------------------

/**
 * 设置标的状态 可抢购/已卖完/需等待
 * @export
 * @param {string} [target={ id: undefined, type: 'huoqi', status: 'buyable' }]
 * @returns
 */
export function setTargetStatus(target = { id: undefined, type: 'huoqi', status: 'buyable' }) {
    return {
        type: SETTARGETSTATUS,
        payload: target
    }
}

/**
 * 设置更新不同种类标的数组
 * @export
 * @param {string} [data={ type: 'huoqi', data: [] }]
 * @returns
 */
export function setTargetData(data = [{ type: 'default', data: [] }]) {
    return {
        type: SETTARGETDATA,
        payload: data
    }
}

export const actions = {
    setTargetStatus,
    setTargetData
}
// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
    [SETTARGETSTATUS]: (state, action) => {
        const targetArr = state[action.payload.type]
        return { ...state,
            [action.payload.type]: targetArr.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, status:action.payload.status }
    } else {
        return item
    }
})
        }
    },
[SETTARGETDATA]:(state, action) => {
    const data = {}
    action.payload.map(item => {
        data[item.productCode] = item.product
    })
    return { ...state, ...data }
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
}

export default function targetReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    // console.log('running counterReducer');
    // console.log('handler', ACTION_HANDLERS);

    return handler ? handler(state, action) : state
}
