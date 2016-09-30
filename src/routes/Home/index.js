import { injectReducer } from './../../store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */

  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Home = require('./containers/HomeContainer').default
      const targetReducer = require('./../../models/targetState').default
      const userReducer = require('./../../models/userState').default
      const bannerReducer = require('./../../models/bannerState').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, [
        { key: 'targetState', reducer: targetReducer },
        { key: 'userState', reducer: userReducer },
        { key: 'bannerState', reducer: bannerReducer }
      ])
      // console.log(store);
      /*  Return getComponent   */
      cb(null, Home)

      /* Webpack named bundle   */
    }, 'home')
  }
})
