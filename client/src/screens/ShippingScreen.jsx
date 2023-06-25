import React, {useState} from 'react'
import FormContainer from "../components/FormContainer";
import {Button, Form} from "react-bootstrap";
import{useDispatch, useSelector}  from 'react-redux'
import {saveShippingAddress} from "../redux/slices/cartSlice";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {

    const {shippingAddress} = useSelector((state) => state.cart)

    const [address, setAddress]=  useState(shippingAddress?.address ||'')
    const [country, setCountry]=  useState(shippingAddress?.country || '')
    const [city, setCity]=  useState(shippingAddress?.city || '')
    const [postalCode, setPostalCode]=  useState(shippingAddress?.postalCode || '')





    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = (e) => {

        e.preventDefault()
        dispatch(saveShippingAddress({
            address, city, postalCode,country
        }))
        navigate('/payment')
    }

    return (
      <FormContainer>
          <h1>
              Shipping
          </h1>

          <CheckoutSteps step1 step2/>
          <Form onSubmit={submitHandler}>
              <Form.Group controlId='address' className='my-2'>
                  <Form.Label> Address</Form.Label>

                  <Form.Control type='text' placeholder='Enter Address' value={address}
                                onChange={(e) => setAddress(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='address' className='my-2'>
                  <Form.Label> Postal Code</Form.Label>

                  <Form.Control type='text' placeholder='Enter Address' value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='city' className='my-2'>
                  <Form.Label> City </Form.Label>

                  <Form.Control type='text' placeholder='Enter Address' value={city}
                                onChange={(e) => setCity(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId='address' className='my-2'>
                  <Form.Label> Country </Form.Label>

                  <Form.Control type='text' placeholder='Enter Address' value={country}
                                onChange={(e) => setCountry(e.target.value)}></Form.Control>
              </Form.Group>



          <Button type='submit' variant='primary' className='mt-3'>
              Continue
          </Button>

          </Form>
      </FormContainer>
    )
}
export default ShippingScreen
