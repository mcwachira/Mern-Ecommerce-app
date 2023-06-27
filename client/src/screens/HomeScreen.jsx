import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Product from '../components/Product'
import {Col, Row} from "react-bootstrap";
import {useGetProductsQuery} from "../redux/slices/productsApiSlice";
import Loader from "../utils/Loader";
import Message from "../utils/Message";
import {Link, useParams} from "react-router-dom";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
const {pageNumber, keyword} = useParams()
const {data, isLoading, error} = useGetProductsQuery({pageNumber})


    return (
        <>
        {keyword && (
            <Link to='/' className='btn btn-light mb-4'>
                Go Back
            </Link>
        )}

        {isLoading ? (<Loader/>) : error ?
            (<Message variant='danger'> {error?.data?.message || error.error}</Message>) : (
                <>

                    <h1>
                        Latest products
                    </h1>

                    <Row>
                        {data.products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}

                    </Row>

                    <Paginate pages={data.pages} page={data.page}  keyword={keyword ? keyword :''}/>
                </>
            )}
        </>
    )
}
export default HomeScreen
