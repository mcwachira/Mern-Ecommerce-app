import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Announcement from '../../components/Announcement/Announcement.component'
import Navbar from '../../components/Navbar/Navbar.component'
import Footer from '../../components/Footer/Footer.component'
import { Add, Remove } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import {
    Container,
    Wrapper,
    Title,
    Top,
    TopButton,
    TopTexts,
    TopText,
    Bottom,
    Info,
    Product,
    ProductDetail,
    Image,
    Details,
    ProductName,
    ProductId,
    ProductColor,
    ProductSize,
    PriceDetail,
    ProductAmountContainer,
    ProductAmount,
    ProductPrice,
    Hr,
    Summary,
    SummaryTitle,
    SummaryItem,
    SummaryItemText,
    SummaryItemPrice,
    Button,
} from './Cart.styles'
import { userRequest } from '../../utils/requestMethods'



const KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY
console.log(KEY)

const Cart = () => {


    const { products, quantity, total } = useSelector((state) => state.cart)
    // console.log(cart)

    const [stripeToken, setStripeToken] = useState(null)

    const onToken = (token) => {
        setStripeToken(onToken)
    }

    const navigate = useNavigate()
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post('/checkout/payment', {
                    tokenId: stripeToken.id,
                    amount: total * 100,

                })
                navigate("/success")
            } catch (error) {
                console.log(error)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken, total, navigate])


    return (
        <Container>

            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag {quantity}</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>

                <Bottom>
                    <Info>
                        {
                            products?.map((product) => (<><Product key={product._d}>
                                <ProductDetail>
                                    <Image src={product?.img} alt={product?.name} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product?.name}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID:</b> {product?._id}
                                        </ProductId>
                                        <ProductColor color={product?.color} />
                                        <ProductSize>
                                            <b>Size:</b>{product?.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add />
                                        <ProductAmount>{product?.quantity}</ProductAmount>
                                        <Remove />
                                    </ProductAmountContainer>
                                    <ProductPrice>$ {product?.price * product?.quantity}</ProductPrice>
                                </PriceDetail>
                            </Product>
                                <Hr /></>))
                        }


                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>${total}</SummaryItemPrice>
                        </SummaryItem>

                        <StripeCheckout
                            name="Ample PLus Shop"
                            image="https://avatars.githubusercontent.com/u/1486366?v=4"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${total}`}
                            amount={total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>

                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart