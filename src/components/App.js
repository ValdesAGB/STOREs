import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddNewProduct from '../pages/AddNewProduct'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Update from '../pages/Update'
import View from '../pages/View'
import ViewMore from '../pages/ViewMore'
import {
  LoadingProvider,
  MessageProvider,
  NewProductProvider,
  ProductProvider,
} from '../untils/context'
import GoBackBtn from './GoBackBtn'
import Header from './Header'

function App() {
  return (
    <React.Fragment>
      <LoadingProvider>
        <MessageProvider>
          <ProductProvider>
            <NewProductProvider>
              <div className="container mt-2">
                <Header />
                <GoBackBtn />
                <Routes>
                  <Route path="/" element={<Home />} />
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
    </React.Fragment>
  )
}

export default App
