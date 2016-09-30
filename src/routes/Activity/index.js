// import { injectReducer } from './../../store/reducers'

export let Activity = (store) => ({
    /*  Async getComponent is only invoked when route matches   */
    path: 'activity',
    getComponent(nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
            and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
                dependencies for bundling   */
            const Activity = require('./containers/ActivityContainer').default
            // const targetReducer = require('./../../models/targetState').default
            // const userReducer = require('./../../models/userState').default

            /*  Add the reducer to the store on key 'counter'  */
            // injectReducer(store, [
            //     { key: 'targetState', reducer: targetReducer },
            //     { key: 'userState', reducer: userReducer }
            // ])
            // console.log(store);
            /*  Return getComponent   */
            cb(null, Activity)

            /* Webpack named bundle   */
        }, 'activity')
    }
})

export let ActivityDetail = (store) => ({
    /*  Async getComponent is only invoked when route matches   */
    path: 'activity/:id',
    getComponent(nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
            and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
                dependencies for bundling   */
            const ActivityDetail = require('./containers/ActivityDetailContainer').default
            // const targetReducer = require('./../../models/targetState').default
            // const userReducer = require('./../../models/userState').default

            /*  Add the reducer to the store on key 'counter'  */
            // injectReducer(store, [
            //     { key: 'targetState', reducer: targetReducer },
            //     { key: 'userState', reducer: userReducer }
            // ])
            // console.log(store);
            /*  Return getComponent   */
            cb(null, ActivityDetail)

            /* Webpack named bundle   */
        }, 'activityDetail')
    }
})
