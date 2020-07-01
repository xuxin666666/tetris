import React from 'react'
import {StylePause, StylePausePI, StylePausePII} from '../styles/StylePause'

const Pause = ({speed}) => (
    <StylePause>
        <StylePausePI>正在暂停</StylePausePI>
        <StylePausePII>速度：每秒下降 {(1000 / speed).toFixed(1)} 块</StylePausePII>
    </StylePause>
)

export default Pause