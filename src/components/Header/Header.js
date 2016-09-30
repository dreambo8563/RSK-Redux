import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.css'

export const Header = () => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter/55' state={{ signed: false }} activeClassName='route--active'>
      Counter
    </Link>
    {' · '}
    <Link to='/vincent' activeClassName='route--active'>
      Vincent Test
    </Link>
    {' · '}
    <Link to='/counter/55' state={{ signed: true }}activeClassName='route--active'>
      变成登陆状态
    </Link>
    {' · '}
    <Link to='/vincent/child' activeClassName='route--active'>
      去看看Vincent的孩子
    </Link>
  </div>
)

export default Header
