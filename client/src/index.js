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

const router = createBrowserRouter(

    createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index={true} path='/' element={<HomeScreen/>}/>
        <Route path='/products/:id' element={<ProductScreen/>}/>
        <Route path='/cart' element={<CartScreen/>}/>
    </Route>

    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>

  </React.StrictMode>
);


