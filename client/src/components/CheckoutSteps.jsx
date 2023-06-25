import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap";

const CheckoutSteps = ({step1, step2, step3, step4}) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {
                    step1 ? (
                        <LinkContainer to='/login'>

                            <Nav.Link> Sign In</Nav.Link>
                            {/*<div className="triangle2-active"></div>*/}
                            {/*<div className="triangle-active"></div>*/}


                        </LinkContainer>
                    ):(

                    //     <div className="triangle2-incomplete"></div>
                    // <div className="step incomplete">Shipping Info</div>
                    // <div className="triangle-incomplete"></div>
                        <Nav.Link disabled> Sign In</Nav.Link>
                    )
                }
            </Nav.Item>

            <Nav.Item>
                {
                    step2 ? (
                        <LinkContainer to='/shipping'>
                            <Nav.Link> Shipping</Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled> Shipping </Nav.Link>
                    )
                }
            </Nav.Item>

            <Nav.Item>
                {
                    step3 ? (
                        <LinkContainer to='/payment'>
                            <Nav.Link>Payments </Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled>Payments</Nav.Link>
                    )
                }
            </Nav.Item>

            <Nav.Item>
                {
                    step4 ? (
                        <LinkContainer to='/placeorder'>
                            <Nav.Link> Place Order</Nav.Link>
                        </LinkContainer>
                    ):(
                        <Nav.Link disabled>Place Order </Nav.Link>
                    )
                }
            </Nav.Item>
        </Nav>
    )
}
export default CheckoutSteps
