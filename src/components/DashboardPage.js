import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  LoadingContext,
  MessageContext,
  ProductContext,
  UserContext,
} from '../untils/context'
import { onLine } from '../untils/data'
import { Loader } from '../untils/Loading'
import Tableau from './Tableau'

function DashboardPage() {
  const { userLogin } = useContext(UserContext)
  const { id } = useParams()
  const { userProducts, setUserProducts } = useContext(UserContext)
  const { isDataLoading, setIsDataLoading } = useContext(LoadingContext)

  const {
    message,
    toggleMessage,
    errorMes,
    toggleErrorMes,
    codeErr,
    setCodeErr,
  } = useContext(MessageContext) // J'ai pas utiliser message pour afficher le message

  var now = new Date()
  var hours = now.getHours()

  const fetchElements = {
    fetchUrl: `http://localhost:3001/api/user/product/${id}`,
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
    toggleMessage('')
    setIsDataLoading(true)
    fetch(fetchElements.fetchUrl, fetchElements.fetchOptions)
      .then((promise) => promise.json())
      .then((productsList) => {
        setUserProducts(productsList)
        setIsDataLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <React.Fragment>
      <div>
        {navigator.onLine === false ? (
          onLine
        ) : (
          <>
            <div className="my-4">
              {hours < 12 ? (
                <h4 className=" fw-light justify-content-end d-flex">{`Bonjour ${
                  userLogin !== null ? userLogin.userName.split(' ')[0] : ''
                }`}</h4>
              ) : (
                <h4 className=" fw-light justify-content-end d-flex">{`Bonsoir ${
                  userLogin !== null ? userLogin.userName.split(' ')[0] : ''
                }`}</h4>
              )}
            </div>
            <div className="my-4 row  align-items-center">
              <div className="col-8">
                <h2>Vos produits :</h2>
              </div>
              <div className="col d-flex justify-content-end">
                <Link to="/newproduct" className="btn btn-primary">
                  Ajouter un nouveau produit
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <table className="table">
                {userLogin &&
                userProducts !== null &&
                userProducts.length === 0 ? (
                  <h5 className="row justify-content-center">
                    Vous n'avez aucun produit pour le moment.
                  </h5>
                ) : (
                  <thead className="">
                    <tr>
                      <th scope="col" className="text-center">
                        #
                      </th>
                      <th scope="col">Nom</th>
                      <th scope="col">Description</th>
                      <th scope="col">Prix(€)</th>
                      <th scope="col">Image</th>
                      <th scope="col">En stock</th>
                      <th scope="col" className=" text-center">
                        Ajouté le :
                      </th>
                      <th scope="col" className=" text-center">
                        Dernière MàJ :
                      </th>
                      <th scope="col" className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                )}
                {isDataLoading ? (
                  <Loader />
                ) : (
                  userLogin &&
                  userProducts !== null &&
                  userProducts.map(
                    ({
                      _id,
                      name,
                      description,
                      cover,
                      price,
                      inStock,
                      createdAt,
                      updatedAt,
                    }) => (
                      <Tableau
                        key={_id}
                        id={_id}
                        name={name}
                        description={description}
                        cover={cover}
                        price={price}
                        inStock={inStock}
                        createdAt={createdAt}
                        updatedAt={updatedAt}
                      />
                    )
                  )
                )}
              </table>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  )
}

export default DashboardPage
