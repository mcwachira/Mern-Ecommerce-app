import React from 'react'
import Navbar from './components/Navbar/Navbar.component'
import Home from './pages/Home/HomePage'
import ProductList from './pages/ProductList/ProductListPage'
import Product from './pages/Product/Product.Page'
import Login from './pages/Login/Login.page'
import Register from './pages/Register/Register.page'
import Cart from './pages/Cart/Cart.page'
import Success from './pages/Success/Success'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
const App = () => {

  const { user } = useSelector((state) => state.user)
  return (
    <>

      <Routes>

        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />

          {user ? <Route element={<Home />} /> : <Route path='/signup' element={<Register />} />}
          {user ? <Route element={<Home />} /> : <Route path='/signin' element={<Login />} />}



          <Route path='/products/:category' element={<ProductList />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/success' element={<Success />} />

        </Route>
      </Routes>
    </>



  )
}

export default App