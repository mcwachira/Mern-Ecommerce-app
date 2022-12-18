import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar.component'
import Announcement from '../../components/Announcement/Announcement.component'
import {
    Container,
    Title,
    FilterContainer,
    Filter,
    FilterText,
    Select,
    Option,
} from './ProductList.styles'
import Products from '../../components/Products/Products.component'
import Newsletter from '../../components/NewsLetter/NewsLetter.component'
import Footer from '../../components/Footer/Footer.component'

const ProductList = () => {
    let location = useLocation();
    const category = location.pathname.split('/')[2]

    const [filters, setFilters] = useState({})

    const [sort, setSort] = useState('newest')

    const handleFilters = (e) => {
        const { name, value } = e.target
        setFilters({
            ...filters,
            [name]: value
        })
    }

    // console.log(filters)

    // console.log(category)
    return (
        <Container>

            <Announcement />
            <Title>{category}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name='color' onChange={handleFilters}>
                        <Option disabled selected>
                            Color
                        </Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>yellow</Option>
                        <Option>green</Option>
                    </Select>
                    <Select name='size' onChange={handleFilters}>
                        <Option disabled selected>
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select name='price' onChange={(e) => setSort(e.target.value)}>
                        <Option value='newest'>Newest</Option>
                        <Option value='asc'>Price (asc)</Option>
                        <Option value='des'>Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList