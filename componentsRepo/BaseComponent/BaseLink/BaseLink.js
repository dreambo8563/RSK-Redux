import React, { PropTypes, PureComponent } from 'react';

class BaseLink extends PureComponent {
    static propTypes = {
        to: PropTypes.string.isRequired,
        onClick: PropTypes.func
    };
    render() {
        const { to, ...prop } = this.props
        return (
            <a {...prop} href={to} />
        );
    }
}

export default BaseLink;
