import React from 'react'
// Frontend layout
import Home from '../components/frontend/Home';
import About from '../components/frontend/About';
import Contact from '../components/frontend/Contact';
import Login from '../components/frontend/auth/Login';
import Register from '../components/frontend/auth/Register';
import ViewCategory from '../components/frontend/collections/ViewCategory';
import ViewProduct from '../components/frontend/collections/ViewProduct';
import ProductDetail from '../components/frontend/collections/ProductDetail';
import Cart from '../components/frontend/Cart';
import Checkout from '../components/frontend/Checkout';
import Thankyou from '../components/frontend/thankyou/Thankyou';



  const publicRouteList = [
        {path: '/', exact: true, name:'Home', component: Home},
        {path: '/about', exact: true, name:'About', component: About},
        {path: '/contact', exact: true, name:'Contact', component: Contact},
        {path: '/login', exact: true, name:'Login',component:Login},
        {path: '/register', exact: true, name:'Register', component:Register},
        {path: '/collections', exact: true, name:'ViewCategory', component:ViewCategory},
        {path: '/collections/:slug', exact: true, name:'ViewProduct', component:ViewProduct},
        {path: '/collections/:category/:slug', exact: true, name:'ProductDetail', component:ProductDetail},
        {path: '/cart', exact: true, name:'Cart', component:Cart},
        {path: '/checkout', exact: true, name:'Checkout', component:Checkout},
        {path: '/thank-you', exact: true, name:'Thankyou', component:Thankyou},



  ]

export default publicRouteList