import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  LoadingContext,
  MessageContext,
  ProductContext,
  UserContext,
} from '../untils/context'
import { disponible, indisponible, onLine } from '../untils/data'
import { Loader } from '../untils/Loading'
import Message from './Message'

function ProductView() {
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
    fetchGet: {
      Url: `https://store-api-app-moonstore.herokuapp.com/api/product/${id}`,
      Options: {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            userLogin !== null ? userLogin.token : 'Error'
          }`,
        },
      },
    },

    fetchDelete: {
      Url: `https://store-api-app-moonstore.herokuapp.com/api/product/${id}`,
      Options: {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            userLogin !== null ? userLogin.token : 'Error'
          }`,
        },
      },
    },
  }

  useEffect(() => {
    toggleMessage(null)
    toggleErrorMes(null)
    setCodeErr(null)
    setIsDataLoading(true)
    fetch(fetchElements.fetchGet.Url, fetchElements.fetchGet.Options)
      .then((promise) => {
        if (!promise.ok) {
          throw promise
        } else {
          return promise.json()
        }
      })
      .then((productsList) => {
        toggleOneProduct(productsList)
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

  function DeleteProduct() {
    toggleMessage(null)
    toggleErrorMes(null)
    setCodeErr(null)
    setIsDataLoading(true)
    fetch(fetchElements.fetchDelete.Url, fetchElements.fetchDelete.Options)
      .then((promise) => {
        if (!promise.ok) {
          throw promise
        } else {
          return promise.json()
        }
      })
      .then((message) => {
        toggleMessage(message)
        setIsDataLoading(false)

        /* window.location.pathname = `user/dashboard/${
          userLogin && userLogin.userId
        }`*/
      })
      .catch((error) => {
        error.json().then((errorMessage) => {
          toggleErrorMes(errorMessage.error)
          setCodeErr(error.status)
          setIsDataLoading(false)
        })
      })
  }

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
                    <h5 className="col fw-light">
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

                  <div className="border my-2">
                    <p className="p-1 w-100 text-break">
                      {oneProduct.description}
                    </p>
                  </div>

                  <div className="my-2 d-flex justify-content-end">
                    <h5> {oneProduct.inStock ? disponible : indisponible}</h5>
                  </div>
                </div>
                <div>
                  <Link
                    to={`/update/product/${id}`}
                    className="btn btn-success"
                  >
                    Modifier
                  </Link>
                  <button
                    className="btn btn-danger offset-1"
                    onClick={() => DeleteProduct()}
                  >
                    Supprimer
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

export default ProductView
