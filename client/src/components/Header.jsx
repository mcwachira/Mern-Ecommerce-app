import React from 'react'
import logo from '../assets/logo.png'
import {Badge, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import {useLogoutMutation} from "../redux/slices/usersApiSlice";
import {useNavigate} from "react-router-dom";
import {logout} from "../redux/slices/authSlice";

const Header = () => {


    const {cartItems} =  useSelector((state) => state.cart)
    const {userInfo} = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler = async() => {

        try{
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        }catch(error){
            console.log(error)
        }



    }
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
                          <FaShoppingCart/>Cart

                          {
                              cartItems.length > 0 &&(
                                  <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                                      {/*{cartItems.length}*/}
                                  </Badge>

                              )
                          }
                      </Nav.Link>
                      </LinkContainer>
                      {userInfo ? (
                          <NavDropdown title={userInfo.name} id='username'>

                              <LinkContainer to='/profile'>
                                  <NavDropdown.Item>
                                      Profile
                                  </NavDropdown.Item>
                              </LinkContainer>

                              <NavDropdown.Item onClick={logoutHandler}>
                                  Log Out
                              </NavDropdown.Item>

                          </NavDropdown>
                      ): (
                          <LinkContainer to='/login'>
                              <Nav.Link >
                                  <FaUser/> Sign In  </Nav.Link>

                          </LinkContainer>
                      )}


                  </Nav>
              </Navbar.Collapse>
          </Container>



      </Navbar>
  </header>
    )
}
export default Header
