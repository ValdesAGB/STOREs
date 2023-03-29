import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingContext, MessageContext, UserContext } from '../untils/context'
import { Loader } from '../untils/Loading'
import Message from './Message'

function ConfirmAccount() {
  const { token } = useParams()
  const { isDataLoading, setIsDataLoading } = useContext(LoadingContext)
  const { userLogin } = useContext(UserContext)
  const {
    message,
    toggleMessage,
    errorMes,
    toggleErrorMes,
    codeErr,
    setCodeErr,
    confirm,
    toggleConfirm,
  } = useContext(MessageContext)

  const fetchElements = {
    fetchUrl: `https://store-api-app-moonstore.herokuapp.com/api/auth/confirmacount/${token}`,
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
      .then((confirm) => {
        toggleMessage(confirm)
        setIsDataLoading(false)
        /*setTimeout(() => {
          window.location.pathname = `/user/dashboard/${
            userLogin && userLogin.userId
          }`
        }, 2000)*/
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
      {isDataLoading ? (
        <Loader />
      ) : message || errorMes ? null : (
        <>
          <div>Patientez un instant.... </div>
        </>
      )}
      <Message />
    </React.Fragment>
  )
}

export default ConfirmAccount
