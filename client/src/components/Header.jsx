import React from 'react'
import logo from '../assets/logo.png'
import {Container, Nav, Navbar} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";

const Header = () => {
    return (
  <header>
      <Navbar  bg='dark' variant='dark' expanded="md" collapseOnSelect>

          <Container>
              <LinkContainer to='/'>


              <Navbar.Brand>
                  <img src={logo} alt="logo"/>
                  Mern Shop

              </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav'/>
              <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ms-auto'>

                      <LinkContainer to='/cart'>
                      <Nav.Link>
                          <FaShoppingCart/>Cart </Nav.Link>
                      </LinkContainer>

                      <LinkContainer to='/login'>
                      <Nav.Link >
                          <FaUser/> Sign In  </Nav.Link>

                      </LinkContainer>
                  </Nav>
              </Navbar.Collapse>
          </Container>



      </Navbar>
  </header>
    )
}
export default Header
