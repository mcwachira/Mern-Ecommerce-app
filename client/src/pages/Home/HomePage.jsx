import React from 'react'
import Navbar from '../../components/Navbar/Navbar.component'
import Announcement from '../../components/Announcement/Announcement.component'
import Slider from '../../components/Slider/Slider.component'
import Categories from '../../components/Categories/Categories.component'
import Products from '../../components/Products/Products.component'
import Newsletter from '../../components/NewsLetter/NewsLetter.component'
import Footer from '../../components/Footer/Footer.component'

const Home = () => {
    return (
        <>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Products />
            <Newsletter />
            <Footer />
        </>

    )
}

export default Home