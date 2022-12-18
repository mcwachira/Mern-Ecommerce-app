import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { mobile } from '../../utils/responsive'

export const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}

`;

export const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
    ${mobile({ height: '10px' })}

`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
    ${mobile({ display: 'none' })}

`;

export const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

export const Input = styled.input`
  border: none;
    ${mobile({ width: '50px' })}

`;

export const Center = styled.div`
  flex: 1;
  text-align: center;
`;

export const Logo = styled(Link)`
font-size:30px;
  font-weight: bold;
  text-decoration:none
    ${mobile({ fontSize: '24px' })}

`;
export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
    ${mobile({ justifyContent: 'center', flex: 2 })}

`;

export const MenuItem = styled(Link)`
  font-size: 18px;
    text-decoration: none;
    color:#000;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: "10px" })}
`;
