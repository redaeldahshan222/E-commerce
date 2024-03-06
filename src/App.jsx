import './App.css';
import Layout from './Components/Layout/Layout';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import NotFound from './Components/NotFound/NotFound';
import ForgetPassword from './Components/Authentication/ForgetPassword';
import LoggedAuthProvider from './Context/LoggedAuthProvider/LoggedAuthProvider';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from './../node_modules/react-query/es/core/queryClient';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartAuthProvider from './Context/CartAuthProvider/CartAuthProvider';
import WishList from './Components/WishList/WishList';
import Subcategories from './Components/Categories/Subcategories';
import VerifyResetCode from './Components/Authentication/VerifyResetCode';
import ResetPassword from './Components/Authentication/ResetPassword';
import Profile from './Components/Profile/Profile';
import LoginProtection from './Components/LoginProtection/LoginProtection';
import { Toaster } from 'react-hot-toast';
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';
import SubBrand from './Components/SubBrand/SubBrand';
import SpecificSubCategories from './Components/SpecificSubCategory/SpecificSubGategory';

const router = createHashRouter([
  { path:'/' , element:<Layout/> ,children:[

    { index:true , element:<LoginProtection><Login/></LoginProtection> }, // route          done
    { path:'' , element:<LoginProtection><Login/></LoginProtection> }, // route             done 
    { path:'home' , element:<ProtectedRoute><Home/></ProtectedRoute> }, // route             not yet
    { path:'profile' , element:<ProtectedRoute><Profile/></ProtectedRoute> }, // route             not yet
    { path:'allorders' , element:<ProtectedRoute><AllOrders/></ProtectedRoute> }, // route             not yet
    { path:'register' , element:<LoginProtection><Register/></LoginProtection> }, // route           done
    { path:'forget' , element:<LoginProtection><ForgetPassword/></LoginProtection> }, // route           done
    { path:'verify' , element:<LoginProtection><VerifyResetCode/></LoginProtection> }, // route           done
    { path:'reset' , element:<LoginProtection><ResetPassword/></LoginProtection> }, // route           done
    { path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute> }, // route             not yet
    { path:'checkOut' , element:<ProtectedRoute><CheckOut/></ProtectedRoute> }, // route             not yet
    { path:'wishList' , element:<ProtectedRoute><WishList/></ProtectedRoute> }, // route             not yet
    { path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute> }, // route     not yet
    { path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute> }, // route not yet
    { path:'subcategories/:id' , element:<ProtectedRoute><Subcategories/></ProtectedRoute> }, // route not yet
    { path:'SpecificSubCategories/:id' , element:<ProtectedRoute><SpecificSubCategories/></ProtectedRoute> }, // route not yet
    { path:'subBrand/:id' , element:<ProtectedRoute><SubBrand/></ProtectedRoute> }, // route not yet
    { path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute> }, // route         not yet
    { path:'productDetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute> }, // route         not yet
    { path:'*' , element:<NotFound/> }, // route            done

  ]} // route
])
function App() {
  // handle async states
  const client =new QueryClient()
  return <>
<QueryClientProvider client={client}>
  <LoggedAuthProvider>
    <CartAuthProvider>
  <RouterProvider router={router}/>
    </CartAuthProvider>
  </LoggedAuthProvider>
</QueryClientProvider>
<Toaster/>
  </>
}

export default App;
