import {Outlet} from 'react-router-dom'
import Navigation from './pages/auth/Navigation'
import {ToastContainer} from 'react-toastify'
import "react-toastify/ReactToastify.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/user/Profile'
import AdminRoute from './pages/admin/AdminRoute'
import UserLIst from './pages/admin/UserLIst'
import CategoryList from './pages/admin/CategoryList'
import ProductList from './pages/admin/ProductList'
import ProductUpdate from './pages/admin/ProductUpdate'
import AllProducts from './pages/admin/AllProducts'
import Home from './Home'
import Favorite from './pages/Products/Favorite'
import ProductDetail from './pages/Products/ProductDetail'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import Shipping from './pages/orders/Shipping'
import PlaceOrder from './pages/orders/PlaceOrder'
import Order from './pages/orders/Order'
import UserOrder from './pages/user/UserOrder'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Navigation/>

      <main className='py-3'>
      <Routes >
        <Route path='/login' Component={Login}/>
        <Route index Component={Home}/>
        <Route path='/register' Component={Register}/>
        <Route path='/favorite' Component={Favorite}/>
        <Route path='/product/:id' Component={ProductDetail}/>
        <Route path='/cart' Component={Cart}/>
        <Route path='/shop' Component={Shop}/>

        <Route Component={PrivateRoute}>
          <Route path='/profile' Component={Profile}/>
          <Route path='/shipping' Component={Shipping}/>
          <Route path='/placeorder' Component={PlaceOrder}/>
          <Route path='/order/:id' Component={Order}/>
          <Route path='/user-order' Component={UserOrder}/>
        </Route>

        <Route path='/admin' Component={AdminRoute}>
          <Route path='userlist' Component={UserLIst}/>
          <Route path='categorylist' Component={CategoryList}/>
          <Route path='createproduct' Component={ProductList}/>
          <Route path='productupdate/:id' Component={ProductUpdate}/>
          <Route path='allproducts/:pageNumber' Component={AllProducts}/>
        </Route>
      </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
