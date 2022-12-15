import React from 'react'
import { Container } from './Categories.styles'
import CategoryItem from '../CategoryItem/CategoryItem.component'
import { categories } from '../data'


const Categories = () => {
    return (
        <Container>

            {categories.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}

        </Container>
    )
}

export default Categories