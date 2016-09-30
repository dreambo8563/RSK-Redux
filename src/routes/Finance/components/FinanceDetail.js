import React, { Component, PropTypes } from 'react';

class FinanceDetail extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    loadingStatus: PropTypes.func.isRequired,
    loading:PropTypes.bool.isRequired,
    targetData: PropTypes.object,
    igned: PropTypes.bool.isRequired,
    purchased: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    id:PropTypes.string.isRequired
  }

    render() {
        return (
            <div>
                FinanceDetail type:{this.props.type}
                id: {this.props.id}
            </div>
        );
    }
}

export default FinanceDetail
