import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import cx from 'classnames'
import s from './BasicEntry.css'

class BasicEntry extends Component {
    static propTypes = {
        title: PropTypes.string,
        badgeText: PropTypes.string,
        href: PropTypes.string,
        iconUrl: PropTypes.string,
        color: PropTypes.string,
        className: PropTypes.string
    }
    render() {
        const { title, badgeText, href, iconUrl, color, className } = this.props
        return (
            <Link to={href} className={cx(s.entryContainer, className) } >
                 <div className={s.imgContainer} style={{ background:`url(${iconUrl})` }} />
                <div className={s.badge} style={{ backgroundColor: color }}>{badgeText}</div>
                <div className={s.title}>{title}</div>
            </Link>
        )
    }
}

export default BasicEntry
