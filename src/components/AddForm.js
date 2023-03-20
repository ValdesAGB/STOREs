import React, { useContext } from 'react'
import {
  LoadingContext,
  MessageContext,
  NewProductContext,
  UserContext,
} from '../untils/context'
import { onLine } from '../untils/data'
import { Loader } from '../untils/Loading'
import Message from './Message'

function AddForm() {
  const { userLogin } = useContext(UserContext)

  const {
    ProductModel,
    inStockProduct,
    setNameProduct,
    setDescriptionProduct,
    setPriceProduct,
    setCoverProduct,
    setInStockProduct,
  } = useContext(NewProductContext)

  const {
    message,
    toggleMessage,
    errorMes,
    toggleErrorMes,
    codeErr,
    setCodeErr,
  } = useContext(MessageContext)

  const { isDataLoading, setIsDataLoading } = useContext(LoadingContext)

  const fetchElements = {
    fetchPost: {
      url: `http://localhost:3001/api/product`,
      options: {
        method: 'POST',
        body: JSON.stringify(ProductModel),
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

  function AddNewProduct(e) {
    e.preventDefault()
    toggleMessage(null)
    toggleErrorMes(null)
    setCodeErr(null)
    setIsDataLoading(true)
    fetch(fetchElements.fetchPost.url, fetchElements.fetchPost.options)
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
        setTimeout(() => {
          window.location.pathname = `user/dashboard/${
            userLogin && userLogin.userId
          }`
        }, 3000)
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
      <div className="container col-6 fw-light mt-4">
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
                    onChange={(e) => setNameProduct(e.target.value)}
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
                    onChange={(e) => setDescriptionProduct(e.target.value)}
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
                    onChange={(e) => setPriceProduct(e.target.value)}
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
                    onChange={(e) => setCoverProduct(e.target.value)}
                  />

                  <input
                    type="file"
                    className="form-control col-6"
                    id="cover"
                    onChange={(e) => setCoverProduct(e.target.value)}
                  />
                </div>

                <div className="form-check form-switch my-3  fs-5">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="inStock"
                    defaultChecked={inStockProduct}
                    onChange={(e) => setInStockProduct(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="inStock">
                    Disponible actuellement.?
                  </label>
                </div>

                <button
                  className={`btn btn-primary ${
                    Object.values(ProductModel).every((value) => value !== '')
                      ? null
                      : 'disabled'
                  }`}
                  onClick={(e) => AddNewProduct(e)}
                >
                  Enrégister
                </button>
              </form>
            )}

            <Message />
          </>
        )}
      </div>
    </React.Fragment>
  )
}

export default AddForm
