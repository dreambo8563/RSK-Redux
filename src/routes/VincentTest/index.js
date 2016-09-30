
import { injectReducer } from './../../store/reducers'
import TestChild from './TestChild'

export default (store) => ({
  path: 'vincent',
  /*  Async getComponent is only invoked when route matches   */

  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const VincentTest = require('./containers/VincentTestContainer').default
      const reducer = require('./modules/VincentTest').default
      const appReducer = require('./../../models/appState').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, [{ key: 'VincentTest', reducer }, { key: 'appState', reducer: appReducer }])
      // console.log(VincentTest);
      /*  Return getComponent   */
      cb(null, VincentTest)

      /* Webpack named bundle   */
    }, 'vincent')
  },
  childRoutes: [
    TestChild()
  ]
})
