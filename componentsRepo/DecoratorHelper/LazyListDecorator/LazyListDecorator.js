
import React, { PureComponent, PropTypes } from 'react';

export const LazyList = Target =>
    class LazyListDecorator extends PureComponent {
        static propTypes = {
            className: PropTypes.string,
            data: PropTypes.array.isRequired,
            onMore: PropTypes.func.isRequired,
            shouldStop: PropTypes.bool.isRequired
        };
        onScroll(e) {
            this.refs.scrollContainer.removeEventListener('scroll', this.onScroll)

            const marginTop = e.target.scrollHeight - e.target.getClientRects()[0].height
            if (e.target.scrollTop >= marginTop) {
                this.props.onMore()
            }
        }
        componentDidUpdate(prevProps, prevState) {
            // console.log(this.props.shouldStop);
            if (!this.props.shouldStop) {
                this.refs.scrollContainer.addEventListener('scroll', this.onScroll)
            }
        }

        componentDidMount() {
            this.refs.scrollContainer.addEventListener('scroll', this.onScroll)
        }
        componentWillUnmount() {
            this.refs.scrollContainer.removeEventListener('scroll', this.onScroll)
        }

        render() {
            const { className } = this.props
            return (
                <div ref='scrollContainer' className={className} onScroll={::this.onScroll}>
    <div>
        {this.props.data.map(
            (item, index) => (<Target item={item} key={index} />)
        ) }
    </div>
                </div >
            )
        }
    }
