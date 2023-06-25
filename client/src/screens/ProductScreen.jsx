import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'
import Rating from "../components/Rating";
import {Card, Col, Row ,ListGroup, Image, Button, Form} from "react-bootstrap";
import {useGetProductDetailsQuery} from "../redux/slices/productsApiSlice";
import Loader from "../utils/Loader";
import Message from "../utils/Message";
import {useDispatch} from "react-redux";
import {addToCart} from "../redux/slices/cartSlice";

const ProductScreen = () => {

    const {id:productId} =useParams()

    const [qty, setQty] = useState(1)


    const {data:product, isLoading, error} = useGetProductDetailsQuery(productId)
    console.log(product)

    const dispatch = useDispatch()


    const navigate = useNavigate()
    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))

        navigate('/cart')
    }

    return (
        <>
            {isLoading ? (<Loader/>) : error ?
                (<Message variant='danger'> {error?.data?.message || error.error}</Message>) : (
                    <>
        <Link to='/' className="btn btn-light my-3">
Go Back
        </Link>



            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={4}>

                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>
                                {product.name}
                            </h3>
                        </ListGroup.Item>
                        <ListGroup.Item>

                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          Price: ${product.price}                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>

                                    <Col>
                                        price
                                    </Col>

                                    <Col>
                                        <strong>
                                            {product.price}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>

                                    <Col>
                                        Status:
                                    </Col>

                                    <Col>
                                        <strong>
                                            {product.countInStock > 0 ? 'in Stock ' : 'Out of Stock '}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>

                                    <Col>
                                       Qty
                                    </Col>

                                    <Col>
                                      <Form.Control as='select' value={qty}
                                                    onChange={(e) => setQty(Number(e.target.value))}>
                                          {[...Array(product.countInStock).keys()].map((x) => (

                                              <option key={x +1 } value={x+1}>
                                                  {x +1}
                                              </option>
                                           ))}


                                          </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className='btn-block' type='button'
                                        disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                   Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )}
        </>

    )
}
export default ProductScreen
