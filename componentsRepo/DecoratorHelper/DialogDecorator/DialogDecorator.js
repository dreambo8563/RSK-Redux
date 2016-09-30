import React, { PureComponent, PropTypes } from 'react';
import DialogContainer from './../../BaseComponent/DialogContainer/DialogContainer'
import Overlay from './../../BaseComponent/Overlay/Overlay'

export const dialog = constainerClass =>
    Target =>
        class DialogDecorator extends PureComponent {
            static propTypes = {
                onClose: PropTypes.func
            }
            render() {
                return (
                    <div>
                        <Overlay />
                        <DialogContainer onClose={:: this.props.onClose} className={constainerClass}>
                        <Target onClose={:: this.props.onClose} />
                    </DialogContainer>
                </div >
            )
    }
}
