import React, { useState } from 'react';
import './Flow.css';

import LightTheme from './themes/LightTheme.png';
import DarkTheme from './themes/DarkTheme.png';
import TailBlueTheme from './themes/TailBlueTheme.png';

import FormBotLogo from './themes/image 4.png';

function Theme() {
    const [selectTheme, setSelectTheme] = useState({
        light: false,
        dark: true,
        tailBlue: false
    })
    return (
        <div
            className='theme-header'
            style={{
                backgroundColor: selectTheme.light ? '#fff' : (selectTheme.tailBlue ? '#508C9B' : '')
            }}
        >
            <div className='theme-header-item'>
                <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.16)', backgroundColor: '#18181B' }}>
                    <p>
                        Customize the theme
                    </p>
                </div>

                <div onClick={() => setSelectTheme({ ...selectTheme, light: true, dark: false, tailBlue: false })} style={{border: selectTheme.light ? '3px solid #7EA6FF' : '', borderRadius: '4px'}}>
                    <img src={LightTheme} alt='' />
                </div>
                <div onClick={() => setSelectTheme({ ...selectTheme, light: false, dark: true, tailBlue: false })} style={{border: selectTheme.dark ? '3px solid #7EA6FF' : '', borderRadius: '4px'}}>
                    <img src={DarkTheme} alt='' />
                </div>

                <div onClick={() => setSelectTheme({ ...selectTheme, light: false, dark: false, tailBlue: true })} style={{border: selectTheme.tailBlue ? '3px solid #7EA6FF' : '', borderRadius: '4px'}}>
                    <img src={TailBlueTheme} alt='' style={{ border: '1px solid rgba(255, 255, 255, 0.16)', padding: '0.5em', borderRadius: '4px' }} />
                </div>
            </div>
            <div style={{ width: '100vw', height: '100vh', margin: '3% 8%' }}>
                <div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img height={30} width={30} src={FormBotLogo} alt='' style={{ marginRight: '0.5em' }} />
                            <p style={{ backgroundColor: '#dbdbe6', padding: '0.4em', borderRadius: '5px', color: '#000000' }}>Hello</p>
                        </div>
                        <div style={{ backgroundColor: '#0042DA', padding: '0.3em', width: '3vw', height: '4vh', textAlign: 'center', borderRadius: '5px', float: 'right' }}>
                            Hi
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Theme