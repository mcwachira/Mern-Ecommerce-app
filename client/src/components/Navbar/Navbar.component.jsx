import React from 'react'
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
    return (
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
                    <Logo>
                        Ample Plus
                    </Logo>
                </Center>

                <Right>
                    <MenuItem>Register</MenuItem>

                    <MenuItem>SIGN IN</MenuItem>

                    <MenuItem>
                        <Badge badgeContent={1} color="primary">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar