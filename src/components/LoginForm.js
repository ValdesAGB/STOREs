import React, { useContext } from 'react'
import { UserContext } from '../untils/context'

function LoginForm() {
  const {
    setLoginMail,
    setLoginPassword,
    loginInformations,
    showPassword,
    setShowPassword,
  } = useContext(UserContext)

  const fetchElements = {
    fetchPost: {
      url: `http://localhost:3001/api/product`,
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

  function Login(e) {
    e.preventDefault()

    fetch(fetchElements.fetchPost.url, fetchElements.fetchPost.options)
      .then((promise) => promise.json())
      .then((message) => {
        console.log(message)
      })
      .catch((error) => console.log(error))

    console.log(loginInformations)
  }

  return (
    <React.Fragment>
      <div className="col-6">
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
            <label className="form-check-label" htmlFor="loginShowPassword">
              Afficher le mot de passe
            </label>
          </div>
          <button
            type="submit"
            className={`btn btn-primary ${
              Object.values(loginInformations).every((value) => value !== '')
                ? null
                : 'disabled'
            }`}
            onClick={(e) => Login(e)}
          >
            Connexion
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default LoginForm
