import styled from "styled-components"
import { mobile } from '../../utils/responsive'

export const Container = styled.div`
flex:1;
margin:3px;
height:70vh;
position: relative;
`
export const Image = styled.img`
width:100%;
height: 100%;
object-fit:cover;
    ${mobile({ height: "30vh" })}
`;


export const Info = styled.div`
position: absolute;
top:0;
left:0;
width:100%;
height: 100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;

`

export const Title = styled.h1`
color:white;
margin-bottom:20px
`;

export const Button = styled.h1`
border:none:
padding: 10px;
color:gray;
background-color:white;
cursor:pointer;
font-weight:600
`;