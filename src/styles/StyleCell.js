import styled from 'styled-components'

export const StyleCell = styled.div`
    height: 28px;
    width: 28px;
    margin: 1px;
    border-top-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    background: ${props => props.color};
`