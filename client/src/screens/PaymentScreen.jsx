import React, {useState, useEffect} from 'react'
import FormContainer from "../components/FormContainer";
import {Button, Form, Col} from "react-bootstrap";
import{useDispatch, useSelector}  from 'react-redux'
import {savePaymentMethod, saveShippingAddress} from "../redux/slices/cartSlice";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch =  useDispatch()
    const navigate = useNavigate()

    const {shippingAddress} = useSelector((state) => state.cart)


    useEffect(() => {

        if(!shippingAddress){
            navigate('/shipping')
        }

    }, [shippingAddress , navigate]);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>
                Payment Method
            </h1>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>

                    <Col>


                        <Form.Check type='radio' className='my-2' label='PayPal or Credit Card'
                                    id='paypal' name='paymentMethod' value='PayPal'
                                    checked
                                    onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>

                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}
export default PaymentScreen
