
import React, { PureComponent, PropTypes } from 'react';

export const tabelHelper = Target =>
    class TabDecorator extends PureComponent {
        static propTypes = {
            children: PropTypes.oneOfType(
                [
                    PropTypes.element,
                    PropTypes.array
                ]),
            className: PropTypes.string,
            data: PropTypes.array.isRequired
        };
        render() {
            const { className, children } = this.props
            return (
                <table className={className}>
                    <thead>
                        <tr>
                            {children}
                        </tr>
                    </thead>
                    <tbody >
                        {this.props.data.map((item, index) => (<Target item={item} key={index} />)) }
                    </tbody>
                </table>
            )
        }
    }
