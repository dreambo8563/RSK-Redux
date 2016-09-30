import React, { PureComponent, PropTypes } from 'react';
import s from './DialogContainer.css';
import cx from 'classnames'

class DialogContainer extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.any,
        onClose: PropTypes.func
    }
    render() {
        const { className, onClose, children, ...prop } = this.props
        return (
            <div className={cx(className, s.container) } {...prop}>
                <div onClick={onClose} className={s.closeBtn}>X</div>
                {children}
            </div>
        );
    }
}

export default DialogContainer;
