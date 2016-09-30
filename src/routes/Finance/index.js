import { injectReducer } from './../../store/reducers'

export let Finance = (store) => ({
    /*  Async getComponent is only invoked when route matches   */
    path: 'finance/:type',
    getComponent(nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
            and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
                dependencies for bundling   */
            const Finance = require('./containers/FinanceContainer').default
            const targetReducer = require('./../../models/targetState').default
            const userReducer = require('./../../models/userState').default

            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, [
                { key: 'targetState', reducer: targetReducer },
                { key: 'userState', reducer: userReducer }
            ])
            // console.log(store);
            /*  Return getComponent   */
            cb(null, Finance)

            /* Webpack named bundle   */
        }, 'finance')
    }
})

export let FinanceDetail = (store) => ({
    /*  Async getComponent is only invoked when route matches   */
    path: 'finance/:type/:id',
    getComponent(nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
            and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
                dependencies for bundling   */
            const FinanceDetail = require('./containers/FinanceDetailContainer').default
            const targetReducer = require('./../../models/targetState').default
            const userReducer = require('./../../models/userState').default

            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, [
                { key: 'targetState', reducer: targetReducer },
                { key: 'userState', reducer: userReducer }
            ])
            // console.log(store);
            /*  Return getComponent   */
            cb(null, FinanceDetail)

            /* Webpack named bundle   */
        }, 'financeDetail')
    }
})
