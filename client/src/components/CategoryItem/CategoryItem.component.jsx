import React from 'react'
import {
    Container,
    Image,
    Info,
    Title,
    Button
} from './CategoryItem.styles'
import { Link } from 'react-router-dom'

const CategoryItem = ({ item }) => {
    return (
        <Container>

            <Link to={`/products/${item.category}`}>


                <Image src={item.img} />
                <Info>
                    <Title>
                        {item.title}
                    </Title>

                    <Button>
                        Shop Now
                    </Button>
                </Info>
            </Link>
        </Container >
    )
}

export default CategoryItem