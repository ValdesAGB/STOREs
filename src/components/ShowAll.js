import React, { useContext, useEffect } from 'react'
import {
  LoadingContext,
  MessageContext,
  ProductContext,
  UserContext,
} from '../untils/context'
import { onLine } from '../untils/data'
import { Loader } from '../untils/Loading'
import Card from './Card'
import Message from './Message'

function ShowAll() {
  const { allProducts, toggleAllProducts } = useContext(ProductContext)
  const { isDataLoading, setIsDataLoading } = useContext(LoadingContext)
  const { userLogin } = useContext(UserContext)
  const {
    message,
    toggleMessage,
    errorMes,
    toggleErrorMes,
    codeErr,
    setCodeErr,
  } = useContext(MessageContext)

  const fetchElements = {
    fetchUrl: `https://store-api-app-moonstore.herokuapp.com/api/product`,
    fetchOptions: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          userLogin !== null ? userLogin.token : 'Error'
        }`,
      },
    },
  }

  useEffect(() => {
    toggleMessage(null)
    toggleErrorMes(null)
    setCodeErr(null)
    setIsDataLoading(true)
    fetch(fetchElements.fetchUrl, fetchElements.fetchOptions)
      .then((promise) => {
        if (!promise.ok) {
          throw promise
        } else {
          return promise.json()
        }
      })
      .then((productsList) => {
        toggleAllProducts(productsList)
        setIsDataLoading(false)
      })
      .catch((error) => {
        error.json().then((errorMessage) => {
          toggleErrorMes(errorMessage.error)
          setCodeErr(error.status)
          setIsDataLoading(false)
        })
      })
  }, [])

  return (
    <React.Fragment>
      {message || errorMes ? null : (
        <div className="container row justify-content-center">
          {navigator.onLine === false ? (
            onLine
          ) : isDataLoading ? (
            <Loader />
          ) : allProducts.length === 0 ? (
            <div> 'Aucun produit pour le moment'</div>
          ) : (
            allProducts.map(
              ({ _id, name, description, cover, price, inStock }) => (
                <Card
                  key={_id}
                  id={_id}
                  name={name}
                  description={description}
                  cover={cover}
                  price={price}
                  inStock={inStock}
                />
              )
            )
          )}
        </div>
      )}

      <Message />
    </React.Fragment>
  )
}

export default ShowAll
