import React, { PureComponent } from 'react';
import style from './Footer.css'
import BasicEntry from './../Home/BasicEntry/BasicEntry'

class Footer extends PureComponent {
    render() {
        return (
            <div>
                <BasicEntry
                    iconUrl='http://placehold.it/50x50'
                    title='导航'
                    href='/counter/90'
                    color='red'
                    className={style.basicEntryStyle}
                    />
                <BasicEntry
                    iconUrl='http://placehold.it/50x50'
                    title='导航'

                    href='/counter/90'
                    color='red'
                    className={style.basicEntryStyle}
                    />
                <BasicEntry
                    iconUrl='http://placehold.it/50x50'
                    title='导航'

                    href='/counter/90'

                    className={style.basicEntryStyle}
                    />
            </div>
        );
    }
}

export default Footer;
