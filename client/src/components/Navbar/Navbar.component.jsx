import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import {
    Container,
    Wrapper,
    Left,
    Language,
    SearchContainer,
    Center,
    Right,
    Input,
    Logo,
    MenuItem

} from './Navbar.styles'

const Navbar = () => {

    const quantity = useSelector((state) => state.cart.quantity)
    console.log(quantity)
    return (
        <>
            <Container>
                <Wrapper>
                    <Left>
                        <Language>
                            EN
                        </Language>
                        <SearchContainer>
                            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
                            <Input />
                        </SearchContainer>
                    </Left>

                    <Center>
                        <Logo to='/'>

                            Ample Plus


                        </Logo>
                    </Center>

                    <Right>
                        <MenuItem to='/signup'>Register</MenuItem>

                        <MenuItem to='/signin'>Sign In</MenuItem>

                        <MenuItem to='/cart'>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Right>
                </Wrapper>

            </Container>

            <Outlet />
        </>

    )
}

export default Navbar