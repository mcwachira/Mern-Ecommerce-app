import React from 'react';
import ReactDOM from 'react-dom/client';
import  './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import App from './App';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Provider} from "react-redux";
import store from "./redux/store";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PrivateRoute from "./utils/PrivateRoute";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import AdminRoute from "./utils/AdminRoute";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import {HelmetProvider} from "react-helmet-async";

const router = createBrowserRouter(

    createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index={true} path='/' element={<HomeScreen/>}/>
        <Route path='/search/:keyword' element={<HomeScreen/>}/>
        <Route path='/page/:pageNumber' element={<HomeScreen/>}/>
        <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen/>}/>
        <Route path='/products/:id' element={<ProductScreen/>}/>
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/profile' element={<ProfileScreen/>}/>

        <Route path='/cart' element={<CartScreen/>}/>


        //private routes
        <Route path='' element={<PrivateRoute/>}>
            <Route path='/shipping' element={<ShippingScreen/>}/>
            <Route path='/payment' element={<PaymentScreen/>}/>
            <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
            <Route path='/order/:id' element={<OrderScreen/>}/>
        </Route>





        //Admin routes
        <Route path='' element={<AdminRoute/>}>
            <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
            <Route path='/admin/productslist' element={<ProductListScreen/>}/>
            <Route path='/admin/productslist/:pageNumber' element={<ProductListScreen/>}/>
            <Route path='/admin/userslist' element={<UserListScreen/>}/>
            <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
        </Route>
    </Route>

    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <HelmetProvider>
          <Provider store={store}>
              <PayPalScriptProvider deferLoading={true}>
                  <RouterProvider router={router}/>

              </PayPalScriptProvider >
          </Provider>
      </HelmetProvider>


  </React.StrictMode>
);


