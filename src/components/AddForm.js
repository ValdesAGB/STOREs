import React, { useContext } from 'react'
import { MessageContext, NewProductContext } from '../untils/context'
import { onLine } from '../untils/data'

function AddForm() {
  const userName = 'amphi'
  const {
    ProductModel,
    inStockProduct,
    setNameProduct,
    setDescriptionProduct,
    setPriceProduct,
    setCoverProduct,
    setInStockProduct,
  } = useContext(NewProductContext)

  const { toggleMessage } = useContext(MessageContext) // J'ai pas utiliser message pour afficher le message

  const fetchElements = {
    fetchPost: {
      url: `http://localhost:3001/api/product`,
      options: {
        method: 'POST',
        body: JSON.stringify(ProductModel),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //  Authorization: `Bearer ${LoginMessage.token}`,
        },
      },
    },
  }

  function AddNewProduct(e) {
    toggleMessage(' ')
    e.preventDefault()
    fetch(fetchElements.fetchPost.url, fetchElements.fetchPost.options)
      .then((promise) => promise.json())
      .then((message) => {
        toggleMessage(message)
        window.location.pathname = `user/dashboard/${userName}`
      })
      .catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <div className="container col-6 fw-light mt-4">
        {navigator.onLine === false ? (
          onLine
        ) : (
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
              className="btn btn-primary"
              onClick={(e) => AddNewProduct(e)}
            >
              Enrégister
            </button>
          </form>
        )}
      </div>
    </React.Fragment>
  )
}

export default AddForm
