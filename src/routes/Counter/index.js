import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'counter/:id',
  /*  Async getComponent is only invoked when route matches   */

  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Counter = require('./containers/CounterContainer').default
      const reducer = require('./modules/counter').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, [{ key: 'counter', reducer }])
      // console.log(store);
      /*  Return getComponent   */
      cb(null, Counter)

      /* Webpack named bundle   */
    }, 'counter')
  },
  onEnter(nextState, replace, callback) {
    console.log(nextState);
    if (nextState.location.state.signed) {
      alert('我登陆过了')
      // callback(error)
    } else {
      alert('我没登陆过，回首页吧你')
      replace('/')
    }
    callback()
  }
})
