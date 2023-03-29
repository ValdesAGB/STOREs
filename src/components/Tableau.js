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

  const {
    message,
    toggleMessage,
    errorMes,
    toggleErrorMes,
    codeErr,
    setCodeErr,
  } = useContext(MessageContext)

  const { isDataLoading, setIsDataLoading } = useContext(LoadingContext)

  useEffect(() => {
    toggleMessage(null)
    toggleErrorMes(null)
    setCodeErr(null)
  }, [])

  const fetchElements = {
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
        // alert(message.message)
        setTimeout(() => {
          alert(
            "Appuyer sur OK  et patientez le temps d'être rediriger vers votre tableau de bord."
          )
        }, 1000)
        setTimeout(() => {
          window.location.pathname = `user/dashboard/${
            userLogin && userLogin.userId
          }`
        }, 3000)
        /*  window.location.pathname = `user/dashboard/${
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
    console.log(message)
  }
  return (
    <React.Fragment>
      <tbody className="table-group-divider">
        {navigator.onLine === false ? (
          onLine
        ) : isDataLoading ? (
          <Loader />
        ) : message || errorMes ? (
          <Message />
        ) : (
          <>
            <tr>
              <th scope="row">{id.slice(0, 6) + '...'}</th>
              <td>{name.slice(0, 10) + '...'}</td>
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
