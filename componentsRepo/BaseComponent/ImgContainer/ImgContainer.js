import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

class ImageContainer extends Component {

    static propTypes = {
        imageUrl: PropTypes.string,
        href: PropTypes.string
    };

    constructor() {
        super()
        // default state
        this.state = {
            imageStatus: null
        }
    }

    handleImageLoaded() {
        this.setState({ imageStatus: 'loaded' })
    }

    handleImageErrored() {
        this.setState({ imageStatus: 'failed to load' })
    }

    render() {
        const { href, imageUrl, ...prop } = this.props
        return (
            <Link to={href} style={{ display: 'inline-block' }}>
                <img
                    role='presentation'
                    onLoad={:: this.handleImageLoaded}
                onError = {:: this.handleImageErrored }
                {...prop}
                src={imageUrl}
                />
            </Link>

        );
    }
}
export default ImageContainer;
