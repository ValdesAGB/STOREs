import React, { useContext, useEffect } from 'react'
import { LoadingContext, ProductContext } from '../untils/context'
import { onLine } from '../untils/data'
import { Loader } from '../untils/Loading'
import Card from './Card'

function ShowAll() {
  const { allProducts, toggleAllProducts } = useContext(ProductContext)
  const { isDataLoading, setIsDataLoading } = useContext(LoadingContext)

  const fetchElements = {
    fetchUrl: `http://localhost:3001/api/product`,
    fetchOptions: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //  Authorization: `Bearer ${LoginMessage.token}`,
      },
    },
  }

  useEffect(() => {
    setIsDataLoading(true)
    fetch(fetchElements.fetchUrl, fetchElements.fetchOptions)
      .then((promise) => promise.json())
      .then((productsList) => {
        toggleAllProducts(productsList)
        setIsDataLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <React.Fragment>
      <div className="container row ">
        {navigator.onLine === false && onLine}

        {isDataLoading ? (
          <Loader />
        ) : navigator.onLine && allProducts.length === 0 ? (
          <div> 'Aucun produit pour le moment'</div>
        ) : (
          navigator.onLine &&
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
    </React.Fragment>
  )
}

export default ShowAll
