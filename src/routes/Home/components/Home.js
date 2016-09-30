import React, { PureComponent, PropTypes } from 'react';
import Banner from './../../../components/Home/Banner/Banner'
import fetch from './../../../actions/fetch'

class Home extends PureComponent {
  static propTypes = {
    signed: PropTypes.bool.isRequired,
    targetData: PropTypes.object.isRequired,
    loadingStatus: PropTypes.func.isRequired,
    setTargetData: PropTypes.func.isRequired,
    setBannerData: PropTypes.func.isRequired,
    banners: PropTypes.array.isRequired
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
  //     JSON.stringify(this.state) !== JSON.stringify(nextState)
  // }
  componentDidMount() {
    const bannerFetch = fetch('/api/v4/product/index/banners?isApp=false')

    const targetFetch = fetch('api/v4/product/index/productList?type=INDEX')

    Promise.all([bannerFetch, targetFetch])
      .then(values => {
        this.props.setBannerData(values[0].data)
        this.props.setTargetData(values[1].data)
        this.props.loadingStatus(false)
      })
  }

  render() {
    const { signed, targetData, banners } = this.props
    return (
      <div >
        <div>
          <div>轮播这里</div>
          {signed ? undefined : <div>登陆小按钮</div>}
        </div>
        <div>公告</div>
        <div>功能入口</div>
        <div>功能扩展区域</div>
        <div data={targetData}>理财标的区域</div>
        <div>banner区域</div>
        {banners.map(item => <Banner
          href={item.url}
          text={item.titel}
          key={item.id}
          imageUrl={item.content} />)
        }
        < div > 安全保障显示区域</div >
        <div>底部导航</div>
      </div >
    );
  }
}

export default Home
