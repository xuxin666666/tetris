import React from 'react'
import Cell from './Cell'
import { StyleMain } from '../styles/StyleMainContent'

const Display = ({stage}) => (
    <StyleMain width={stage[0].length} height={stage.length}>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyleMain>
)

export default Display