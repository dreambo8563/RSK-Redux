import React, { Component } from 'react';

export const dropDownMenu = PopComponent =>
    Target =>
        class DropDownMenuDecorator extends Component {
            constructor() {
                super()
                this.state = {
                    show: false
                }
            }

            showMenu() {
                this.setState({ show: true })
            }
            hideMenu() {
                this.setState({ show: false })
            }
            render() {
                return (
                    <Target
                        onMouseOver={::this.showMenu}
            onMouseLeave = {::this.hideMenu } >
            { this.state.show ? <PopComponent /> : undefined }
            </Target >
        )
        }
    }
