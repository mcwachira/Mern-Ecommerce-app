import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Announcement from "../../components/Announcement/Announcement.component";
import Footer from "../../components/Footer/Footer.component";
import Navbar from "../../components/Navbar/Navbar.component";
import Newsletter from "../../components/NewsLetter/NewsLetter.component";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Container,
    Wrapper,
    ImgContainer,
    Image,
    InfoContainer,
    Title,
    Desc,
    Price,
    FilterContainer,
    Filter,
    FilterTitle,
    FilterSize,
    FilterColor,
    FilterSizeOption,
    AddContainer,
    AmountContainer,
    Amount,
    Button,
} from './Product.styles'

import { publicRequest } from '../../utils/requestMethods';
import { addProducts } from '../../redux/cartSlice';

const Product = () => {


    const dispatch = useDispatch()
    const params = useParams()
    // console.log(params)

    const id = params.id

    // let location = useLocation();
    // const id = location.pathname.split('/')[2]


    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await publicRequest.get(`/products/${id}`)
                // console.log(response)

                setProduct(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getProduct()
    }, [id])

    // console.log(product)


    const handleQuantity = (type) => {


        if (type === 'dec') {

            quantity > 1 && setQuantity(quantity - 1)

        }



        if (type === 'inc') {
            setQuantity(quantity + 1)

        }
    }

    const handleCart = () => {
        dispatch(addProducts({ ...product, quantity, color, size }))
    }
    return (
        <Container>

            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.name}</Title>
                    <Desc>
                        {product.description}
                    </Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((col) => (<FilterColor color={col} key={col} onClick={() => setColor(col)} />))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((s) => (<FilterSizeOption key={s}>{s}</FilterSizeOption>))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <RemoveIcon onClick={() => handleQuantity('dec')} />
                            <Amount>{quantity}</Amount>
                            <AddIcon onClick={() => handleQuantity('inc')} />
                        </AmountContainer>
                        <Button onClick={handleCart}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;