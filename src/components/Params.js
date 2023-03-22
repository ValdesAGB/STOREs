import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LoadingContext, MessageContext, UserContext } from '../untils/context'
import { Loader } from '../untils/Loading'
import Message from './Message'

function Params() {
  const { id } = useParams()
  const { userLogin, userInformations, toggleUserInformations } =
    useContext(UserContext)
  const { isDataLoading, setIsDataLoading } = useContext(LoadingContext)
  const {
    message,
    toggleMessage,
    errorMes,
    toggleErrorMes,
    codeErr,
    setCodeErr,
  } = useContext(MessageContext)

  const fetchElements = {
    fetchUrl: `http://localhost:3001/api/auth/informations/${id}`,
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
      .then((userParams) => {
        toggleUserInformations(userParams)
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
      <div>
        {message || errorMes ? null : (
          <div>
            <table className={`table text-center`}>
              <thead>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénoms</th>
                  <th scope="col">Mail</th>
                  {userInformations.stateAccount ? (
                    <th scope="col">Etat compte</th>
                  ) : null}
                  <th scope="col">Mot de passe</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {isDataLoading ? (
                      <Loader />
                    ) : (
                      userInformations && userInformations.lastName
                    )}
                  </td>
                  <td>
                    {isDataLoading ? (
                      <Loader />
                    ) : (
                      userInformations && userInformations.firstName
                    )}
                  </td>
                  <td>
                    {isDataLoading ? (
                      <Loader />
                    ) : (
                      userInformations && userInformations.mail
                    )}
                  </td>
                  {userInformations.stateAccount ? (
                    <td>
                      {isDataLoading ? (
                        <Loader />
                      ) : userInformations && userInformations.stateAccount ? (
                        'Activé ✔'
                      ) : userLogin.url ? (
                        <Link
                          to={`/confirm${userLogin.url.split('confirm')[1]}`}
                          className="fw-bold text-dark text-decoration-none"
                          title="Cliquez pour activer votre compte."
                        >
                          Non activé 😑
                        </Link>
                      ) : null}
                    </td>
                  ) : null}
                  <td>
                    {isDataLoading ? (
                      <Loader />
                    ) : (
                      userInformations && '************'
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <span className="justify-content-end d-flex my-5">
              <button className="btn btn-primary disabled">
                Modifier vos informations
              </button>
            </span>
          </div>
        )}
        <Message />
      </div>
    </React.Fragment>
  )
}

export default Params
