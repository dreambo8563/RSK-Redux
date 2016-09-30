import React, { Component, PropTypes } from 'react';
import BaseLink from './../../../../componentsRepo/BaseComponent/BaseLink/BaseLink'
import cx from 'classnames'
import s from './RecommendedTarget.css'

class RecommendedTarget extends Component {
    static propTypes = {
        title: PropTypes.string,
        badgeText: PropTypes.string,
        href: PropTypes.string,
        hightLightText: PropTypes.string,
        color: PropTypes.string,
        className: PropTypes.string,
        configText: PropTypes.string,
        lowestAmount: PropTypes.number,
        rate: PropTypes.string,
        duration: PropTypes.number,
        progress: PropTypes.string,
        buff: PropTypes.string
    }
    render() {
        const {
            title,
            badgeText,
            href,
            color,
            className,
            hightLightText,
            rate,
            duration,
            lowestAmount,
            progress,
            configText,
            buff } = this.props
        return (
            <BaseLink to={href} className={cx(s.entryContainer, className) } >
                <div className={s.badge}>{badgeText}</div>
                <div className={s.titleContainer}>
                    <div className={cx(s.highLight) } style={{ backgroundColor: color }}>{hightLightText}
                    </div>
                    <div className={s.title}>{title}</div>
                </div>
                <div>
                    <div className={s.rate}>{rate} {buff ? '+' + buff : undefined}</div>
                    <div className={s.duration}>{duration}天</div>
                    <div className={s.rate}>预期年化</div>
                    <div className={s.duration}>期限</div>
                </div>
                <div className={s.progressContainer}>
                    <div className={s.bar} style={{ width: progress }} />
                </div>
                <div>
                    <div className={s.lowestAmount}>{lowestAmount}元起投</div>
                    <div className={s.configText}>{configText}</div>
                </div>
            </BaseLink >
        )
    }
}

export default RecommendedTarget
