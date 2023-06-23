import React from 'react'

import {useParams, Link} from 'react-router-dom'
import products from '../products'
import Rating from "../components/Rating";
import {Card, Col, Row ,ListGroup, Image, Button} from "react-bootstrap";

const ProductScreen = () => {

    const { id: productId } = useParams();
    const product = products.find((p) => p._id === productId);
    return (
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
    )
}
export default ProductScreen
