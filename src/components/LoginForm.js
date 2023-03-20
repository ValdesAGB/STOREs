import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LoadingContext, MessageContext, UserContext } from '../untils/context'
import { Loader } from '../untils/Loading'
import Message from './Message'

function LoginForm() {
  const {
    setLoginMail,
    setLoginPassword,
    loginInformations,
    showPassword,
    setShowPassword,
  } = useContext(UserContext)
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
      url: `http://localhost:3001/api/auth/login`,
      options: {
        method: 'POST',
        body: JSON.stringify(loginInformations),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //  Authorization: `Bearer ${LoginMessage.token}`,
        },
      },
    },
  }

  useEffect(() => {
    toggleMessage(null)
    toggleErrorMes(null)
    setCodeErr(null)
  }, [])

  function Login(e) {
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
        if (typeof message === 'object' && Object.keys(message).length >= 3) {
          toggleMessage(message)
          setIsDataLoading(false)
          setTimeout(() => {
            localStorage.setItem('user', JSON.stringify(message))
            window.location.pathname = `/user/dashboard/${message.userId}`
          }, 3000)
        } else {
          toggleMessage(message)
          setIsDataLoading(false)
          return null
        }
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
      <div className="col-6">
        {isDataLoading ? (
          <Loader />
        ) : (
          <>
            {message || errorMes ? null : (
              <span>
                <form>
                  <div className="mb-3">
                    <label htmlFor="loginMail" className="form-label">
                      Adresse mail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginMail"
                      aria-describedby="emailHelp"
                      onChange={(e) => setLoginMail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                      Mot de passe
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="loginPassword"
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="loginShowPassword"
                      onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="loginShowPassword"
                    >
                      Afficher le mot de passe
                    </label>
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-primary ${
                      Object.values(loginInformations).every(
                        (value) => value !== ''
                      )
                        ? null
                        : 'disabled'
                    }`}
                    onClick={(e) => Login(e)}
                  >
                    Connexion
                  </button>
                </form>
                <div className="my-5 fw-light">
                  Vous n'avez pas de compte.?{' '}
                  <Link to="/signup">Inscrivez-vous dès maintenant.</Link>
                </div>
              </span>
            )}
            <Message />
          </>
        )}
      </div>
    </React.Fragment>
  )
}

export default LoginForm
