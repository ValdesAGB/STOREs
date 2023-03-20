import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  LoadingContext,
  MessageContext,
  ProductContext,
  UserContext,
} from '../untils/context'
import { onLine } from '../untils/data'
import { Loader } from '../untils/Loading'
import Message from './Message'

function View() {
  const { id } = useParams()
  const { oneProduct, toggleOneProduct } = useContext(ProductContext)
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
    fetchUrl: `http://localhost:3001/api/product/${id}`,
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
      .then((product) => {
        toggleOneProduct(product)
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
      <div className="container col-6 my-5 justify-content-center">
        {navigator.onLine === false ? (
          onLine
        ) : isDataLoading ? (
          <Loader />
        ) : (
          <>
            {message || errorMes ? null : (
              <div>
                <div>
                  <div className="row align-items-center">
                    <h5 className="col-7 fw-light">
                      Nom du produit : {oneProduct.name}
                    </h5>
                    <h5 className="col d-flex justify-content-end fw-light">
                      Prix du produit : {oneProduct.price} €
                    </h5>
                  </div>
                  <div className="my-4">
                    <img
                      src={oneProduct.cover}
                      alt={`${oneProduct.name}-cover`}
                      className="w-100"
                    />
                  </div>

                  <div className="my-2">
                    <h4>Description du produit :</h4>
                    <p
                      className="p-1 w-100 text-break border overflow-scroll"
                      style={{ maxHeight: '250px' }}
                    >
                      {oneProduct.description}
                    </p>
                  </div>

                  <div className="my-2 d-flex justify-content-end">
                    <h5>
                      {' '}
                      {oneProduct.inStock
                        ? 'Ce produit est disponible en stock'
                        : 'Ce produit est indisponible en stock'}
                    </h5>
                  </div>
                </div>
                <div>
                  <button className="btn btn-success">
                    Passer la commande
                  </button>
                </div>
              </div>
            )}
            <Message />
          </>
        )}
      </div>
    </React.Fragment>
  )
}

export default View
