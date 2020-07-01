import React from 'react'
import {TETROMINOS} from './Tetrominos'
import {StyleCell} from '../styles/StyleCell'

const Cell = ({type}) => (
    <StyleCell type={type} color={TETROMINOS[type].color}></StyleCell>
)

export default Cell