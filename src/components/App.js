import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddNewProduct from '../pages/AddNewProduct'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Update from '../pages/Update'
import View from '../pages/View'
import ViewMore from '../pages/ViewMore'
import {
  LoadingProvider,
  MessageProvider,
  NewProductProvider,
  ProductProvider,
  UserProvider,
} from '../untils/context'
import GoBackBtn from './GoBackBtn'
import Header from './Header'

function App() {
  return (
    <React.Fragment>
      <UserProvider>
        <LoadingProvider>
          <MessageProvider>
            <ProductProvider>
              <NewProductProvider>
                <div className="container mt-2">
                  <Header />
                  <GoBackBtn />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/newproduct" element={<AddNewProduct />} />
                    <Route path="product/viewmore/:id" element={<ViewMore />} />
                    <Route
                      path="user/dashboard/:userName"
                      element={<Dashboard />}
                    />
                    <Route path="/view/product/:id" element={<View />} />
                    <Route path="/update/product/:id" element={<Update />} />
                  </Routes>
                </div>
              </NewProductProvider>
            </ProductProvider>
          </MessageProvider>
        </LoadingProvider>
      </UserProvider>
    </React.Fragment>
  )
}

export default App
