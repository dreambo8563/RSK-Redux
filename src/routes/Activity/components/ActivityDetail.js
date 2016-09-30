import React, { Component, PropTypes } from 'react';
// import s from './Home.css'

class ActivityDetail extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        loadingStatus: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired
    }

    render() {
        return (
            <div>
             活动详情页啊活动详情页 id:{this.props.id}
            </div>
        );
    }
}

export default ActivityDetail
