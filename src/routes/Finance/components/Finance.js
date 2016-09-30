import React, { Component, PropTypes } from 'react';
// import s from './Home.css'

class Finance extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        loadingStatus: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        targetData: PropTypes.object,
        signed: PropTypes.bool.isRequired,
        purchased: PropTypes.bool.isRequired,
        authenticated: PropTypes.bool.isRequired
    }

    render() {
        return (
            <div>
                Finance here {this.props.type}
            </div>
        );
    }
}

export default Finance
