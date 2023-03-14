import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { UserContext } from '../untils/context'
import { profilCover } from '../untils/data'

function Header() {
  const { userLogin } = useContext(UserContext)
  const storeName = 'MOONSTORE'

  const Span = styled.span`
    &:hover {
      cursor: pointer;
    }
  `

  function LogOut() {
    localStorage.removeItem('user')
    setTimeout(() => {
      window.location.pathname = '/'
    }, 1000)
  }

  return (
    <React.Fragment>
      <div className="row p-2 mb-2 align-items-center  border border-dark rounded-2">
        <div className="col-8">
          <h2>
            <Link to="/" className="text-dark text-decoration-none">
              {storeName}
            </Link>
          </h2>
        </div>

        <div className="col-4 d-flex justify-content-end">
          {userLogin === null ? (
            <Link to="/login">
              <button className="btn btn-primary fw-light">Connexion</button>
            </Link>
          ) : (
            <>
              <div className="dropdown-center">
                {profilCover}

                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to={`user/dashboard/${userLogin && userLogin.userId}`}
                      className={`text-decoration-none dropdown-item ${
                        navigator.onLine === false ? 'd-none' : null
                      }`}
                    >
                      Tableau de bord
                    </Link>
                  </li>

                  <li className=" ">
                    <Span
                      className="dropdown-item border-top"
                      onClick={() => LogOut()}
                    >
                      Déconnexion <i className="bi bi-box-arrow-in-right"></i>
                    </Span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Header
