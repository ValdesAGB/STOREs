import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const storeName = 'MOONSTORE'
  const addButton = 'Dashboard'
  const userName = 'ampi'
  console.log(navigator.onLine)
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
          <Link
            to={`user/dashboard/${userName}`}
            className={navigator.onLine === false ? 'd-none' : null}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            >
              <img
                src="https://cours-informatique-gratuit.fr/wp-content/uploads/2014/05/compte-utilisateur-1.png"
                alt="user"
                className="w-100"
                title="Dashboard"
              />
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Header
