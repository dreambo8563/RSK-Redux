import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import cx from 'classnames'
import s from './ListItem.css'

class ListItem extends Component {
    static propTypes = {
        title: PropTypes.string,
        badgeText: PropTypes.string,
        href: PropTypes.string,
        tags: PropTypes.array,
        className: PropTypes.string,
        configText: PropTypes.string,
        lowestAmount: PropTypes.number,
        rate: PropTypes.string,
        duration: PropTypes.number,
        progress: PropTypes.string,
        buff: PropTypes.string,
        actionText: PropTypes.string
    }
    static defaultProps = {
        actionText: '抢购',
        tags: []
    }
    static contextTypes = {
        router: PropTypes.object
    }
    goTo(e) {
        this.context.router.push(this.props.href)
    }
    render() {
        const {
            title,
            badgeText,
            tags,
            className,
            rate,
            duration,
            lowestAmount,
            progress,
            configText,
            buff,
            href,
            actionText
        } = this.props
        return (
            <div className={cx(s.entryContainer, className) } >
                <div className={s.badge}>{badgeText}</div>
                <div className={s.titleContainer}>
                    <div className={s.title}>{title}</div>

                    <div className={s.tags}>
                        {tags.map((item, index) =>
                            (<div className={s.tag} key={index}>{item} </div>)
                        ) }
                    </div>
                </div>
                <div className={s.metaData}>
                    <div className={s.rate}>{rate} {buff ? '+' + buff : undefined}</div>
                    <div className={s.duration}>{duration}天</div>
                    <div className={s.rate}>预期年化</div>
                    <div className={s.duration}>期限</div>
                </div>
                <Link to={href} className={s.action}>{actionText}</Link>
                <div className={s.progressContainer}>
                    <div className={s.bar} style={{ width: progress }} />
                </div>
                <div>
                    <div className={s.lowestAmount}>{lowestAmount}元起投</div>
                    <div className={s.configText}>{configText}</div>
                </div>
            </div >
        )
    }
}

export default ListItem
