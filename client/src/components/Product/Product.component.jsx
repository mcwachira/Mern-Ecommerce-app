import React from 'react'
import { Container, Info, Circle, Icon, Image } from './Product.styles'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';

const Product = ({ item }) => {
    console.log(item)
    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlinedIcon />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>

                        <SearchOutlinedIcon />
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlinedIcon />
                </Icon>
            </Info>
        </Container>
    );
};

export default Product