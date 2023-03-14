import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LoadingContext, MessageContext, UserContext } from '../untils/context'
import { disponible, indisponible, onLine } from '../untils/data'
import { Loader } from '../untils/Loading'
import Message from './Message'

function Tableau({
  id,
  name,
  description,
  cover,
  price,
  inStock,
  createdAt,
  updatedAt,
}) {
  const TdStyled = styled.td`
    &:hover {
      cursor: pointer;
    }
  `

  const { userLogin } = useContext(UserContext)

  const { message, toggleMessage } = useContext(MessageContext)

  const { isDataLoading, setIsDataLoading } = useContext(LoadingContext)

  useEffect(() => {
    toggleMessage('')
  }, [])

  const fetchElements = {
    fetchDelete: {
      Url: `http://localhost:3001/api/product/${id}`,
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

  function DeleteProduct() {
    setIsDataLoading(true)
    fetch(fetchElements.fetchDelete.Url, fetchElements.fetchDelete.Options)
      .then((promise) => promise.json())
      .then((message) => {
        toggleMessage(message)
        setIsDataLoading(false)
        alert(message.message)
        window.location.pathname = `user/dashboard/${
          userLogin && userLogin.userId
        }`
      })
      .catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <tbody className="table-group-divider">
        {navigator.onLine === false ? (
          onLine
        ) : isDataLoading ? (
          <Loader />
        ) : (
          <>
            <tr>
              <th scope="row">{id.slice(0, 6) + '...'}</th>
              <td>{name}</td>
              <td>{description.slice(0, 10) + '...'}</td>
              <td>{price.toLocaleString('fr-FR')}</td>
              <td>{cover.slice(0, 20) + '...'}</td>
              <TdStyled className=" text-center">
                {inStock ? disponible : indisponible}
              </TdStyled>
              <td className=" text-center">
                {createdAt && createdAt.split('T')[0]}
              </td>
              <td className=" text-center">
                {updatedAt && updatedAt.split('T')[0]}
              </td>
              <td className="text-center">
                <Link to={`/view/product/${id}`}>
                  <i
                    className="btn btn-primary bi bi-eye"
                    title="Voir le produit"
                  ></i>
                </Link>
                <Link to={`/update/product/${id}`}>
                  <i
                    className="btn btn-success bi bi-pencil mx-1"
                    title="Mettre à jour"
                  ></i>
                </Link>
                <i
                  className="btn btn-danger bi bi-trash"
                  onClick={() => DeleteProduct()}
                  title="Supprimer"
                ></i>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </React.Fragment>
  )
}

export default Tableau
