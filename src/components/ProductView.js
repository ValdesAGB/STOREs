import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LoadingContext, ProductContext } from '../untils/context'
import { disponible, indisponible, onLine } from '../untils/data'
import { Loader } from '../untils/Loading'

function ProductView() {
  const { id } = useParams()
  const { oneProduct, toggleOneProduct } = useContext(ProductContext)
  const { isDataLoading, setIsDataLoading } = useContext(LoadingContext)
  const userName = 'amphi'

  const fetchElements = {
    fetchUrl: `http://localhost:3001/api/product/${id}`,
    fetchGetOptions: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //  Authorization: `Bearer ${LoginMessage.token}`,
      },
    },
    fetchDelteOptions: {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //  Authorization: `Bearer ${LoginMessage.token}`,
      },
    },
  }

  useEffect(() => {
    setIsDataLoading(true)
    fetch(fetchElements.fetchUrl, fetchElements.fetchGetOptions)
      .then((promise) => promise.json())
      .then((productsList) => {
        toggleOneProduct(productsList)
        setIsDataLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

  function DeleteProduct() {
    fetch(fetchElements.fetchUrl, fetchElements.fetchDelteOptions)
      .then((promise) => promise.json())
      .then((message) => {
        console.log(message)
        alert(`"${oneProduct.name}" bien supprimé.!`)
        window.location.pathname = `user/dashboard/${userName}`
      })
      .catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <div className="container col-6 my-5 justify-content-center">
        {navigator.onLine === false ? (
          onLine
        ) : isDataLoading ? (
          <Loader />
        ) : (
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
                <p className="p-1 w-100 text-break">{oneProduct.description}</p>
              </div>

              <div className="my-2 d-flex justify-content-end">
                <h5> {oneProduct.inStock ? disponible : indisponible}</h5>
              </div>
            </div>
            <div>
              <Link to={`/update/product/${id}`} className="btn btn-success">
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
      </div>
    </React.Fragment>
  )
}

export default ProductView
