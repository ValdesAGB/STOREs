import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MessageContext, UserContext } from '../untils/context'

function Message() {
  const { message } = useContext(MessageContext)
  const { userLogin } = useContext(UserContext)
  return (
    <React.Fragment>
      <div
        className={`text-center fw-light align-items-center border-top my-5 ${
          message === '' ? 'd-none' : 'd-block'
        }`}
      >
        <div className="my-5">
          {message && message.message
            ? message.message
            : message && message.error
            ? message.error
            : null}
        </div>
        <span className={userLogin ? 'd-block' : 'd-none'}>
          <Link
            to={`/user/dashboard/${userLogin && userLogin.userId}`}
            className="fw-light"
          >
            Tableau de bord
          </Link>
        </span>
      </div>
    </React.Fragment>
  )
}

export default Message