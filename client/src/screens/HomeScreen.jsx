import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Product from '../components/Product'
import {Col, Row} from "react-bootstrap";
import {useGetProductsQuery} from "../redux/slices/productsApiSlice";
import Loader from "../utils/Loader";
import Message from "../utils/Message";

const HomeScreen = () => {

const {data:products, isLoading, error} = useGetProductsQuery()


    return (
        <>
        {isLoading ? (<Loader/>) : error ?
            (<Message variant='danger'> {error?.data?.message || error.error}</Message>) : (
                <>

                    <h1>
                        Latest products
                    </h1>

                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}

                    </Row>
                </>
            )}
        </>
    )
}
export default HomeScreen
