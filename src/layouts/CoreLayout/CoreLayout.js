import React, { Component } from 'react';
import Header from '../../components/Header'
import s from './CoreLayout.css'
import '../../styles/core.css'

class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }
  render() {
    const { children } = this.props
    return (
      <div className='container text-center'>
        <Header />
        <div className={s.corelayout__viewport}>
          {children}
        </div>
      </div>
    )
  }
}

export default CoreLayout
