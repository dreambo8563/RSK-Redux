import React, { PureComponent } from 'react';

class BaseButton extends PureComponent {
    render() {
        const { ...prop } = this.props
        return (
            <button {...prop} />
        );
    }
}

export default BaseButton;
