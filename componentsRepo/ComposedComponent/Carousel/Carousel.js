
import React, { Component, PropTypes } from 'react';
import s from './Carousel.css'
import cx from 'classnames'
import throttle from './../../../baseUtils/throttle'

class Carousel extends Component {

    static propTypes = {
        children: PropTypes.oneOfType(
            [
                PropTypes.element,
                PropTypes.array
            ]).isRequired,
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
        hasDot: PropTypes.boolean,
        accessableDot: PropTypes.boolean,
        vertical: PropTypes.boolean,
        NumberPerScreen: PropTypes.number,
        autoPlay: PropTypes.boolean,
        autoplaySpeed: PropTypes.number,
        loop: PropTypes.boolean
    };

    constructor(props) {
        super(props);
        if (props.autoPlay) {
            this.startPlay(props.autoplaySpeed);
        }
    }

    getDefaultProps() {
        return {
            children: [],
            width: 0,
            height: 0,
            animateSpeed: 1000,
            hasDot: true,
            accessableDot: true,
            vertical: false,
            NumberPerScreen: 1,
            autoPlay: true,
            autoplaySpeed: 3000,
            loop: true // false
        }
    }

    getInitialState() {
        return {
            animating: false,
            autoPlayTimer: null,
            currentLeft: 0,
            currentPos: 0,
            listWidth: null,
            listHeight: null,
            slideCount: 0,
            touchObject: {
                startX: 0,
                startY: 0,
                curX: 0,
                curY: 0
            },
            initialized: false,
            dotPostion: 0
        }
    }

    componentWillUnmount() {
        this.destroyTimer();
    }

    // cloneWithState(element, index) {
    //     return React.cloneElement(
    //         element,
    //         { key: index, style: { float: 'left' } }
    //     );
    // }

    autoPlay(autoplaySpeed) {
        this.setState({
            autoPlayTimer: setInterval(() => {
                this.nextSlide();
            }, autoplaySpeed)
        });
    }

    destroyTimer() {
        window.clearInterval(this.state.autoPlayTimer);
        this.setState({
            autoPlayTimer: null
        })
    }

    nextSlide() {
        this.changeImage(true);
    }

    changeImage(toRightorBottom = true) {
        this.setState({ animating: true });
        var throttleHandle = throttle(() => {
            var currentLeft = this.state.currentLeft;
            currentLeft += (toRightorBottom ? -1 : 1) * this.props.width / (this.state.animateSpeed / 20);
            this.setState({ currentLeft });
            if ((currentLeft >= -this.state.currentPos * this.props.width) ||
                (currentLeft >= -(this.state.currentPos + 2) * this.props.width)) {
                this.setState({ currentLeft: toRightorBottom ? -(this.state.currentPos + 2) * this.props.width
                                                             : -this.state.currentPos * this.props.width,
                                currentPos: this.state.currentPos + (toRightorBottom ? 1 : -1),
                                animating: false });
                throttleHandle.cancel();
            }
        }, 20);
    }

    dragStart(event) {
        if (this.state.animating){
            return;
        }
        this.setState({
            touchObject: {
                startX: (event.touches !== undefined) ? event.touches[0].pageX : event.clientX,
                startY: (event.touches !== undefined) ? event.touches[0].pageY : event.clientY,
                curX: (event.touches !== undefined) ? event.touches[0].pageX : event.clientX,
                curY: (event.touches !== undefined) ? event.touches[0].pageY : event.clientY
            }
        });
    }

    drag(event) {
        if (this.state.animating){
            return;
        }
        this.setState({
            touchObject: {
                curX: (event.touches !== undefined) ? event.touches[0].pageX : event.clientX,
                curY: (event.touches !== undefined) ? event.touches[0].pageY : event.clientY
            },
            currentLeft: this.state.currentLeft +
                        (this.props.vertical
                            ? (((event.touches !== undefined) ? event.touches[0].pageY : event.clientY) - this.state.touchObject.startY)
                            : (((event.touches !== undefined) ? event.touches[0].pageX : event.clientX) - this.state.touchObject.startX)
                        )
        });
    }

    dragEnd(event) {
        if (this.state.animating){
            return;
        }
        var relativeX, relativeY, curX, curY;
        curX = (event.touches !== undefined) ? event.touches[0].pageX : event.clientX;
        curY = (event.touches !== undefined) ? event.touches[0].pageY : event.clientY;
        relativeX = curX - this.state.touchObject.startX;
        relativeY = curY - this.state.touchObject.startY;
        this.props.vertical
            ? (relativeY > 0 ? this.changeImage(false) : this.changeImage())
            : (relativeX > 0 ? this.changeImage(false) : this.changeImage())
    }

    dotRender() {
        return React.Children.map(this.props.children,
            (item, index) => (
                <li key={index}
                    onClick={() => this.changeImage(index) }
                    className={index === this.state.currentIndex ? cx(s.dot, s.active) : s.dot} />
            ))
    }

    contentRender() {
        return this.props.children && React.Children.map(this.props.children, this.cloneWithState);
    }

    render() {
        const { children, width, height } = this.props
        return (
            <div
                style={{
                    width,
                    height
                }}
                className={s.wrapper}>
                <div
                    style={{
                        width: parseInt(width) * React.Children.count(children),
                        height,
                        marginLeft: this.state.leftValue
                    }}
                    className={s.content}>

                    {this.contentRender() }
                </div>

                <div className={s.dotSection}>
                    {this.dotRender() }
                </div>

            </div >

        )
    }
}

export default Carousel

// class Carousel extends Component {

//     static propTypes = {
//         children: PropTypes.oneOfType(
//             [
//                 PropTypes.element,
//                 PropTypes.array
//             ]).isRequired,
//         width: PropTypes.string.isRequired,
//         height: PropTypes.string.isRequired
//     };
//     constructor() {
//         super()
//         this.state = {
//             currentIndex: 0,
//             leftValue: 0
//         }
//         this.startPlay();
//     }

//     componentWillUnmount() {
//         this.destroyTimer()
//     }

//     cloneWithState(element, index) {
//         return React.cloneElement(
//             element,
//             { key: index, ref: `content${index}`, style: { float: 'left' } }
//         );
//     }
//     startPlay() {
//         this.handler = setInterval(() => {
//             if (this.state.currentIndex >= (React.Children.count(this.props.children) - 1)) {
//                 this.setState({ currentIndex: 0, leftValue: 0 })
//             } else {
//                 this.setState({
//                     currentIndex: this.state.currentIndex + 1,
//                     leftValue: -(this.state.currentIndex + 1) * parseInt(this.props.width)
//                 })
//             }
//         }, 3000)
//     }
//     destroyTimer() {
//         window.clearInterval(this.handler)
//     }
//     changeImage(index) {
//         this.destroyTimer();
//         this.setState({
//             currentIndex: index,
//             leftValue: -index * parseInt(this.props.width)
//         })
//         this.startPlay()
//     }
//     dotRender() {
//         return React.Children.map(this.props.children,
//             (item, index) => (
//                 <li key={index}
//                     onClick={() => this.changeImage(index) }
//                     className={index === this.state.currentIndex ? cx(s.dot, s.active) : s.dot} />
//             ))
//     }
//     contentRender() {
//         return this.props.children && React.Children.map(this.props.children, this.cloneWithState);
//     }

//     render() {
//         const { children, width, height } = this.props
//         return (
//             <div
//                 style={{
//                     width,
//                     height
//                 }}
//                 className={s.wrapper}>
//                 <div
//                     style={{
//                         width: parseInt(width) * React.Children.count(children),
//                         height,
//                         marginLeft: this.state.leftValue
//                     }}
//                     className={s.content}>

//                     {this.contentRender() }
//                 </div>

//                 <div className={s.dotSection}>
//                     {this.dotRender() }
//                 </div>

//             </div >

//         )
//     }
// }

// export default Carousel
