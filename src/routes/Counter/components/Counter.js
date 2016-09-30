import React, { PropTypes, PureComponent } from 'react';

class Counter extends PureComponent {

  static propTypes = {
    counter: PropTypes.any,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    params: PropTypes.string.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }
  output() {
    this.context.router.replace('/')
  }
  render() {
    const { counter, increment, doubleAsync, params } = this.props
    // http://localhost:3000/counter/55?showAge=true&current=false
    // console.log(JSON.parse(params).location.query.showAge);
    return (
      <div style={{ margin: '0 auto' }} >
        <h2>Counter: {counter}</h2>
        <button className='btn btn-default' onClick={increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={doubleAsync}>
          Double (Async)
        </button>
        <div>{params}</div>
        <div>{ JSON.stringify(this.context) }</div>
        <button onClick={:: this.output}>
        test
      </button>
  </div >
    );
  }
}

export default Counter;
