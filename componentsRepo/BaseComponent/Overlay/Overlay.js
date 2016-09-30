import React, { PureComponent } from 'react';
import s from './Overlay.css';

class Overlay extends PureComponent {
    render() {
        return (
            <div className={s.overlay} />
        );
    }
}

export default Overlay;
