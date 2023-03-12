import React from 'react'

function GoBackBtn() {
  function Goback() {
    window.history.back()
  }
  return (
    <React.Fragment>
      <div className="d-none">
        {/* il me faudra géré le className pour que quand on est à l'acceuil le bouton retour ne s'affiche pas. */}
        <i className="btn bi bi-caret-left-fill" onClick={() => Goback()}>
          retour
        </i>
      </div>
    </React.Fragment>
  )
}

export default GoBackBtn
