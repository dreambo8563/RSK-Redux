import React, { PureComponent, PropTypes } from 'react';

class Container extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.any
    }
    render() {
        const { className, children, ...prop } = this.props
        return (
            <div className={className} {...prop}>
                {children}
            </div>
        );
    }
}

export default Container;
