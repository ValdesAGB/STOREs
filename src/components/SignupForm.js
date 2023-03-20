import React, { useContext, useEffect, useState } from 'react'
import { LoadingContext, MessageContext, UserContext } from '../untils/context'
import { Loader } from '../untils/Loading'
import Message from './Message'

function SignupForm() {
  const {
    setLastName,
    setFirstName,
    setMail,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    UserInformations,
    showPassword,
    userLogin,
  } = useContext(UserContext)
  const [onFocus, setOnFocus] = useState(false)
  const [masjuculeLetter, setMasjuculeLetter] = useState(false)
  const [specialCaractere, setSpecialCaractere] = useState(false)
  const [chiffre, setChiffre] = useState(false)
  const [nbreCaractere, setNbreCaractere] = useState(false)
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
    setShowPassword(false)
  }, [])

  function handleFocus() {
    setOnFocus(true)
  }

  function handleBlur() {
    setOnFocus(false)
  }

  function checkPassword(password) {
    const regexCaractereSpecial =
      /[\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\|\;\:\,\.\<\>\/\?\\]/
    const regexMajuscule = /[A-Z]/
    const regexChiffre = /[0-9]/
    const regexLength = /^.{6,}$/
    const contient6Caractere = regexLength.test(password)
    const contientCaractereSpecial = regexCaractereSpecial.test(password)
    const contientMajuscule = regexMajuscule.test(password)
    const contientChiffre = regexChiffre.test(password)

    return (
      contientCaractereSpecial &&
      contientMajuscule &&
      contientChiffre &&
      contient6Caractere
    )
  }

  const checking = checkPassword(UserInformations.password)

  function handleInputChange(event) {
    const regexMajuscule = /[A-Z]/
    const regexCaractereSpecial = /[\W_]/
    const regexChiffre = /[0-9]/
    const regexLength = /^.{6,}$/
    setPassword(event)

    if (event.length < 6) {
      setPassword('')
    }
    if (event !== '') {
      setMasjuculeLetter(regexMajuscule.test(event))
      setSpecialCaractere(regexCaractereSpecial.test(event))
      setChiffre(regexChiffre.test(event))
      setNbreCaractere(regexLength.test(event))
    }
  }

  const fetchElements = {
    fetchPost: {
      url: `http://localhost:3001/api/auth/signup`,
      options: {
        method: 'POST',
        body: JSON.stringify(UserInformations),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //  Authorization: `Bearer ${LoginMessage.token}`,
        },
      },
    },
  }

  function Signup(e) {
    e.preventDefault()
    if (!checking) {
      alert(
        `Vérifier si vous avez bien respecté les règles envers le mot de passe.`
      )
      return null
    }

    if (UserInformations.password !== UserInformations.confirmPassword) {
      alert(
        `Vérifier que vous avez entré le entré le même mot de passe pour les cases "Mot de passe" et "Confirmer mot de passe"`
      )
      return null
    }

    if (UserInformations.password < 6) {
      alert(`Votre mot de passe n'est pas assez fort.!`)
      return null
    }

    setIsDataLoading(true)
    toggleMessage(null)
    toggleErrorMes(null)
    setCodeErr(null)
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
        setIsDataLoading(false)
      })
      .catch((error) => {
        error.json().then((errorMessage) => {
          toggleErrorMes(errorMessage.error)
          setCodeErr(error.status)
          setIsDataLoading(false)
        })
      })
  }
  console.log(errorMes, codeErr, message)
  return (
    <React.Fragment>
      <div className="col-6">
        {isDataLoading ? (
          <Loader />
        ) : (
          <>
            {message || errorMes ? null : (
              <form>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Nom :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    aria-describedby="emailHelp"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Prénom(s) :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    aria-describedby="emailHelp"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mail" className="form-label">
                    Adresse mail :
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="mail"
                    aria-describedby="emailHelp"
                    onChange={(e) => setMail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mot de passe :
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => handleFocus()}
                    onBlur={() => handleBlur()}
                  />
                  <div
                    className={`fw-light mt-2 ${
                      onFocus ? 'd-block' : 'd-none'
                    }`}
                    style={{ fontSize: '0.9em' }}
                  >
                    Votre mot de passe doit contenir au moins :
                    <ul>
                      <li
                        className={
                          nbreCaractere ? 'text-success' : 'text-danger'
                        }
                      >
                        6 caractères alpha-numériques;
                      </li>
                      <li
                        className={
                          masjuculeLetter ? 'text-success' : 'text-danger'
                        }
                      >
                        Une lettre majuscule ;
                      </li>
                      <li className={chiffre ? 'text-success' : 'text-danger'}>
                        Un chiffre ;
                      </li>
                      <li
                        className={
                          specialCaractere ? 'text-success' : 'text-danger'
                        }
                      >
                        Un caractère spécial.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confimer mot de passe :
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="showPassword"
                    defaultChecked={showPassword}
                    onClick={(e) => setShowPassword(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="showPassword">
                    Afficher le mot de passe
                  </label>
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary ${
                    Object.values(UserInformations).every(
                      (value) => value !== ''
                    )
                      ? null
                      : 'disabled'
                  }`}
                  onClick={(e) => Signup(e)}
                >
                  S'inscrire
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

export default SignupForm
