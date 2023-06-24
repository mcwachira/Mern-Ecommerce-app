import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import Rating from "../components/Rating";
import {Card, Col, Row ,ListGroup, Image, Button} from "react-bootstrap";
import {useGetProductDetailsQuery} from "../redux/productsApiSlice";
import Loader from "../Utils/Loader";
import Message from "../Utils/Message";

const ProductScreen = () => {

    const {id:productId} =useParams()


    const {data:product, isLoading, error} = useGetProductDetailsQuery(productId)
    console.log(product)

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
                                <Button className='btn-block' type='button'
                                        disabled={product.countInStock === 0}>
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
