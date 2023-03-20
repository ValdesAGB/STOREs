import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  LoadingContext,
  MessageContext,
  ProductContext,
  UserContext,
} from '../untils/context'
import { onLine, updateProduct } from '../untils/data'
import { Loader } from '../untils/Loading'
import Message from './Message'
import Modal from './Modal'

function UpdateProduct() {
  const { id } = useParams()
  const { isDataLoading, setIsDataLoading } = useContext(LoadingContext)
  const {
    oneProductToUpdate,
    toggleOneProductToUpdate,
    ProductUpdate,
    setNameProductToUpdate,
    setDescriptionProductToUpdate,
    setPriceProductToUpdate,
    setCoverProductToUpdate,
    setInStockProductToUpdate,
  } = useContext(ProductContext)

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
    fetchGetOptions: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          userLogin !== null ? userLogin.token : 'Error'
        }`,
      },
    },

    fetchPutOptions: {
      method: 'PUT',
      body: JSON.stringify(ProductUpdate),
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
    fetch(fetchElements.fetchUrl, fetchElements.fetchGetOptions)
      .then((promise) => {
        if (!promise.ok) {
          throw promise
        } else {
          return promise.json()
        }
      })
      .then((productToUpdate) => {
        toggleOneProductToUpdate(productToUpdate)
        setNameProductToUpdate(productToUpdate.name)
        setDescriptionProductToUpdate(productToUpdate.description)
        setPriceProductToUpdate(productToUpdate.price)
        setCoverProductToUpdate(productToUpdate.cover)
        setInStockProductToUpdate(productToUpdate.inStock)
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

  function UpdateProduct(e) {
    e.preventDefault()
    toggleMessage(null)
    toggleErrorMes(null)
    setCodeErr(null)
    setIsDataLoading(true)
    fetch(fetchElements.fetchUrl, fetchElements.fetchPutOptions)
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
      })
      .catch((error) => {
        error.json().then((errorMessage) => {
          toggleErrorMes(errorMessage.error)
          setCodeErr(error.status)
          setIsDataLoading(false)
        })
      })
  }

  function Redirect() {
    window.location.pathname = `user/dashboard/${userLogin && userLogin.userId}`
  }

  return (
    <React.Fragment>
      <div className="container col-6 fw-light mt-4">
        <div>
          {navigator.onLine === false ? (
            onLine
          ) : isDataLoading ? (
            <Loader />
          ) : (
            <>
              {message || errorMes ? null : (
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nom du produit :
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      aria-describedby="emailHelp"
                      required
                      defaultValue={
                        oneProductToUpdate && oneProductToUpdate.name
                      }
                      onChange={(e) => setNameProductToUpdate(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description du produit :
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="...."
                      id="description"
                      defaultValue={
                        oneProductToUpdate && oneProductToUpdate.description
                      }
                      onChange={(e) =>
                        setDescriptionProductToUpdate(e.target.value)
                      }
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Prix du produit (€)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      defaultValue={
                        oneProductToUpdate && oneProductToUpdate.price
                      }
                      onChange={(e) => setPriceProductToUpdate(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cover" className="form-label">
                      Image du produit :
                    </label>

                    <input
                      type="text"
                      className="form-control mb-2"
                      id="cover"
                      placeholder="https://..."
                      defaultValue={
                        oneProductToUpdate && oneProductToUpdate.cover
                      }
                      onChange={(e) => setCoverProductToUpdate(e.target.value)}
                    />

                    <input
                      type="file"
                      className="form-control col-6"
                      id="cover"
                      onChange={(e) => setCoverProductToUpdate(e.target.value)}
                    />
                  </div>

                  <div className="form-check form-switch my-3  fs-5">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="inStock"
                      defaultChecked={
                        oneProductToUpdate && oneProductToUpdate.inStock
                      }
                      onChange={(e) =>
                        setInStockProductToUpdate(e.target.checked)
                      }
                    />
                    <label className="form-check-label" htmlFor="inStock">
                      Disponible actuellement.?
                    </label>
                  </div>

                  <button
                    className={`btn btn-primary ${
                      Object.values(ProductUpdate).every(
                        (value) => value !== ''
                      )
                        ? null
                        : 'disabled'
                    }`}
                    /* data-bs-target={`#updateproduct`}
                data-bs-toggle="modal"*/
                    onClick={(e) => UpdateProduct(e)}
                  >
                    Mettre à jour
                  </button>
                </form>
              )}

              <Message />
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default UpdateProduct
