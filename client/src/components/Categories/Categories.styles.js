import styled from "styled-components"
import { mobile } from '../../utils/responsive'
export const Container = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
    ${mobile({ padding: '0px', flexDirection: 'column' })}
`
