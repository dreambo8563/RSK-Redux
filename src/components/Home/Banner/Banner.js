import React, { PureComponent, PropTypes } from 'react';
// import { Link } from 'react-router'
import cx from 'classnames'
import s from './Banner.css'

class Banner extends PureComponent {
    static propTypes = {
        text: PropTypes.string,
        imageUrl: PropTypes.string,
        href: PropTypes.string,
        className: PropTypes.string
    }
    render() {
        const { text, imageUrl, href, className, ...props } = this.props
        return (
            <a href={href} className={cx(s.entryContainer, className) } {...props } >
                <div className={s.imgContainer} style={{ backgroundImage: `url(${imageUrl})` }} />
                <div className={s.slogan}>{text}</div>
            </a >
        )
    }
}

export default Banner
