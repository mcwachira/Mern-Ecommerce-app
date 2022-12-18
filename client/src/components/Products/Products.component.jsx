import React, { useState, useEffect } from 'react'
import { Container } from './Products.styles'
import { popularProducts } from '../data'
import Product from '../Product/Product.component'
import axios from 'axios'
const Products = ({ category, filters, sort }) => {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    //filter based on a condition
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(category ? `http://localhost:8001/api/v1/products?category=${category}` : 'http://localhost:8001/api/v1/products')
                console.log(response)
                console.log('it worked')
                setProducts(response.data)
            } catch (error) {
                console.log('failed to fetch products')
            }
        }

        getProducts()

    }, [category])
    //filter based on selected values
    useEffect(() => {
        category && setFilteredProducts(
            products.filter((item) => Object.entries(filters)
                .every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        )


    }, [category, filters, products])

    //filter based time
    useEffect(() => {
        if (sort === 'newest') {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt))
        } else if (sort === 'asc') {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price))
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price))
        }


    }, [sort])

    return (
        <Container>

            {category ? filteredProducts.map((item) => (
                <Product item={item} key={item.id} />
            )) : products.slice(0, 8).map((item) => ( //slice is for only showing 8 products
                <Product item={item} key={item.id} />
            ))}
        </Container>

    )
}

export default Products