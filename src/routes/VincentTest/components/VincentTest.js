import React, { PureComponent, Component, PropTypes } from 'react'
// import DuckImage from '../assets/Duck.jpg'
import style from './VincentTest.css'
import BaseButton from './../../../../componentsRepo/BaseComponent/BaseButton/BaseButton'
import BaseLink from './../../../../componentsRepo/BaseComponent/BaseLink/BaseLink'
import Container from './../../../../componentsRepo/BaseComponent/Container/Container'
import ImageContainer from './../../../../componentsRepo/BaseComponent/ImgContainer/ImgContainer'
import Carousel from './../../../../componentsRepo/ComposedComponent/Carousel/Carousel'
import Navigation from './../../../../componentsRepo/ComposedComponent/Navigation/Navigation'
import { dialog } from './../../../../componentsRepo/DecoratorHelper/DialogDecorator/DialogDecorator'
import { dropDownMenu } from './../../../../componentsRepo/DecoratorHelper/DropDownMenuDecorator/DropDownMenuDecorator'
import { tabelHelper } from './../../../../componentsRepo/DecoratorHelper/TableDecorator/TableDecorator'
import { LazyList } from './../../../../componentsRepo/DecoratorHelper/LazyListDecorator/LazyListDecorator'
import BasicEntry from './../../../components/Home/BasicEntry/BasicEntry'
import RecommendedTarget from './../../../components/Home/RecommendedTarget/RecommendedTarget'
import ListHeader from './../../../components/Home/ListHeader/ListHeader'
import ListItem from './../../../components/Home/ListItem/ListItem'
import Banner from './../../../components/Home/Banner/Banner'
import Footer from './../../../components/Footer/Footer'
import fetch from './../../../actions/fetch'

import cx from 'classnames';

@dialog(style.dialogContainer)
class DialogContent extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  }
  render() {
    return (
      <div>
        <input onChange={:: this.props.onClose} type ='text' />
        <input type='text' />
      </div >
    )
  }
}

class DropContent extends Component {
  render() {
    return <div style={{ background: 'green' }}>pop area</div>;
  }
}

@dropDownMenu(DropContent)
class DropDownButton extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    const { ...prop } = this.props
    return (<div style={{ color: 'white' }} {...prop}>HOC button
      {this.props.children}
    </div>);
  }
}

class DropItem extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  render() {
    const { title, id, userId } = this.props.item
    return (
      <div>
        <div className={cx(style.inlineBlock, style.red) }>{title}</div>
        <div className={cx(style.inlineBlock, style.gray) }>{id}</div>
        <div className={cx(style.inlineBlock, style.green) }>{userId}</div>
      </div>
    );
  }
}

class SearchBox extends Component {
  constructor() {
    super()
    this.state = {
      result: []
    }
  }

  async getResult(e) {
    if (typeof parseInt(e.target.value, 10) === 'number') {
      e.persist()
      const response = await fetch('http://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      this.setState({ result: Array.from(data).slice(0, parseInt(e.target.value, 10)) })
    }
  }

  render() {
    return (
      <Container>
        <Container className={style.SearchSection}>
          <input onInput={:: this.getResult} type ='text' />
          <BaseButton>Search</BaseButton>
        </Container>
        {this.state.result.length > 0 ? <Container className={cx(style.SearchSection) }>
          {this.state.result.map((item, index) => <DropItem key={index} item={item} />) }
        </Container> : undefined}
      </Container>

    );
  }
}

@tabelHelper
class TableItem extends Component {
  static propTypes = {
    item: PropTypes.object
  }
  render() {
    const { name, age, address } = this.props.item
    return (
      <tr>
        <td>{name}</td>
        <td>{age}</td>
        <td>{address}</td>
      </tr>
    );
  }
}
@LazyList
class LazyItem extends Component {
  static propTypes = {
    item: PropTypes.object
  }
  render() {
    const { body, title, id } = this.props.item
    return (
      <div>
        <div>{body}</div>
        <div>{title}</div>
        <div>{id}</div>
      </div>
    );
  }
}

class FetchDemo extends Component {
  static propTypes = {
    item: PropTypes.object
  }
  constructor() {
    super()
    this.state = {
      duckUrl: undefined,
      user: {
        amount: '-.--'
      }
    }
  }

  componentDidMount() {
    // console.log(fetch('/Duck.jpg',{async:false}));
    fetch('/Duck.jpg')
      .then(data => {
        this.setState({ duckUrl: data });
        return data;
      })
      .then(data => window.URL.revokeObjectURL(data));
    fetch('/user.json').then(data => { this.setState({ user: data }); console.log(data) });
  }

  render() {
    return (
      <div>
        <div>用户余额:
          {typeof this.state.user.amount === 'number'
            ? this.state.user.amount.toFixed(2)
            : this.state.user.amount}</div>
        <img alt="Can't fetch image"
          src={this.state.duckUrl} />
      </div>
    )
  }
}

class VincentTest extends PureComponent {
  constructor() {
    super()
    this.state = {
      url: '',
      imageUrl: 'http://placehold.it/350x150',
      showDialog: false
    }
  }
  static propTypes = {
    changePage: PropTypes.func,
    loadMoreData: PropTypes.func,
    shouldStop: PropTypes.bool,
    listData: PropTypes.array,
    children: PropTypes.element
  }

  bodyinfo = [{
    name: 'zhangsan',
    age: '18',
    address: 'beijing'
  }, {
      name: 'lisi',
      age: '18',
      address: 'beijing'
    }, {
      name: 'wangwu',
      age: '18',
      address: 'beijing'
    }]
  test(e) {
    alert(e.target.tagName)
  }

  hover() {
    console.log('hover me')
  }

  leave() {
    console.log('leave me')
  }

  close() {
    alert('you closed the dialog')
  }
  patchDate() {
    console.log('give me more data');
    this.props.changePage()
    this.props.loadMoreData()
  }
  componentDidMount() {
    this.props.loadMoreData()
  }

  recommenedSampleData = {
    title: '新手专享1号',
    badgeText: '限时秒杀',
    href: 'http://www.sina.com.cn',
    color: 'yellow',
    hightLightText: '新手',
    rate: '10%',
    duration: 30,
    lowestAmount: 100,
    configText: '这里看配置',
    progress: '68%',
    buff: '5.5%'
  }
  listItemSampleData = {
    title: '美融宝1号',
    badgeText: '中秋专享',
    href: '/counter/99',
    rate: '7.5%',
    duration: 62,
    lowestAmount: 1000,
    configText: '这里看配置',
    progress: '30%',
    buff: '5.5%',
    tags: ['可用红包', '可转让'],
    actionText: '秒杀'
  }
  render() {
    const { listData, shouldStop, children } = this.props
    return (
      <div className={style.container}>
        <BaseButton
          onClick={:: this.test}
        className={style.baseButton}>
        BaseButton Here
        </BaseButton>

      <BaseLink
        to={this.state.url}
        className={style.baseLink}>
        go to baidu
      </BaseLink>

      <div className={style.nest}>nest here</div>

      <Container
        onMouseEnter={::this.hover}
  onMouseLeave = {::this.leave }
  className = { style.myContainer } >
  just a div named Container
        </Container>
  <FetchDemo />
  <ImageContainer
    className={style.imageContainer}
    imageUrl={this.state.imageUrl}
    href={this.state.url} />
  <Carousel width={'350px'} height={'150px'}>
    <ImageContainer
      className={style.imageContainer}
      imageUrl={this.state.imageUrl}
      href={this.state.url} />

    <ImageContainer
      className={style.imageContainer}
      imageUrl={this.state.imageUrl}
      href={this.state.url} />
    <ImageContainer
      className={style.imageContainer}
      imageUrl={this.state.imageUrl}
      href={this.state.url} />
    <ImageContainer
      className={style.imageContainer}
      imageUrl={this.state.imageUrl}
      href={this.state.url} />
    <ImageContainer
      className={style.imageContainer}
      imageUrl={this.state.imageUrl}
      href={this.state.url} />
  </Carousel>

  <Navigation
    className={style.navigation}>
    <BaseButton
      onClick={:: this.test}>
    US
          </BaseButton>
  <BaseButton
    className={style.bad}>
    CN
  </BaseButton>
  <BaseButton>
    UK
  </BaseButton>
        </Navigation>

  <BaseButton
    onClick={() => {
      this.setState({ showDialog: true })
    } }>
    Open dialog
  </BaseButton>
        {this.state.showDialog ? <DialogContent onClose={() => {
  this.setState({ showDialog: false })
} } /> : undefined
}

<DropDownButton />
  <SearchBox>
    <DropItem />
  </SearchBox>
  <TableItem className={style.table} data={this.bodyinfo} >
    <th style={{ width: '100px' }}>
      <a href='http://www.sina.com.cn'>tilte1</a>
    </th>
    <th>title2</th>
    <th>title3</th>
  </TableItem>
  <LazyItem data={listData} onMore={::this.patchDate} shouldStop={shouldStop} className={style.lazyList} />
  <h1 style={{ color: 'green' }}>Component for Home</h1>
  <BasicEntry
    iconUrl='http://placehold.it/50x50'
    title='预约'
    badgeText='荐'
    href='/counter/90'
    color='red'
    className={style.basicEntryStyle}
    />
  <BasicEntry
    iconUrl='http://placehold.it/50x50'
    title='预约'
    badgeText='荐'
    href='/counter/90'
    color='red'
    className={style.basicEntryStyle}
    />
  <BasicEntry
    iconUrl='http://placehold.it/50x50'
    title='预约'

    href='/counter/90'

    className={style.basicEntryStyle}
    />
  <RecommendedTarget
    {...this.recommenedSampleData}
    />
  <ListHeader category='定期' desc='固定期限， 稳赚本息' href='http://www.sina.com.cn' />
  <ListItem {...this.listItemSampleData} />
  <Banner text='宣传语啊这里' href='/' imageUrl='http://placehold.it/150x50' />
  <Footer />
  { children }
      </div >
    );
  }
}

export default VincentTest;
