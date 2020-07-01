import React from 'react'
import Cell from './Cell'
import { StyleButteryHatch } from '../styles/StyleMainContent'

const ButteryHatch = ({tetromino}) => (
    <StyleButteryHatch width={tetromino[0].length} height={tetromino.length}>
        {/* {tetromino.map(row => console.log(row))} */}
        {tetromino.map(row => row.map((cell, x) => <Cell key={x} type={cell} />))}
    </StyleButteryHatch>

)

export default ButteryHatch