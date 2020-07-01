import styled from 'styled-components'

export const StyleMainContent = styled.div`
    width: 500px;
    height: 600px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    border: 1px solid black;
    display: flex;
`

export const StyleMain = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        1fr
    );

    grid-template-columns: repeat(
        ${props => props.width},
        1fr
    );
    overflow: hidden;
    width: ${props => props.width*30}px;
    height: ${props => props.height*30}px;
`

export const StyleButteryHatch = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        1fr
    );

    grid-template-columns: repeat(
        ${props => props.width},
        1fr
    );
    overflow: hidden;
    width: ${props => props.width*30}px;
    height: ${props => props.height*30}px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;

`

export const StyleMenu = styled.div`
    border: 0.5px dashed purple;
    width: 200px;
    height: 100%;
    position: absolute
`