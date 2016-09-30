import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import cx from 'classnames'
import s from './ListHeader.css'

class ListHeader extends Component {
    static propTypes = {
        category: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        className: PropTypes.string,
        more: PropTypes.string
    }
    static defaultProps = {
        more: '更多>'
    }
    render() {
        const { category, desc, href, more, className } = this.props
        return (
            <div className={cx(s.headerContainer, className) } >
                <div className={s.ribbon} />
                <div className={s.category}>{category}</div>
                <div className={s.desc}>{desc}</div>
                <Link to={href} className={s.more}>{more}</Link>
            </div>
        )
    }
}

export default ListHeader
