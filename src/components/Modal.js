import React from 'react'

function Modal({
  firstModalTitle,
  firstModalBody,
  firstModalBtn,
  firstModalBtnDataTarget,
  firstModalBtnClassName,
  secondModalDataTarget,
  secondModalTitle,
  secondModalBody,
  secondModalDataToggle,
  fonctionFirstBtnModal,
  fonctionSecondBtnModal,
}) {
  return (
    <React.Fragment>
      <div
        className="modal fade"
        id={firstModalBtnDataTarget}
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundColor: '#ffffff' }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                {firstModalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                // onClick={() => fonctionFirstBtnModal()}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{firstModalBody}</div>
            <div className="modal-footer">
              <button
                className={firstModalBtnClassName}
                data-bs-target={`#${secondModalDataTarget}`}
                data-bs-dismiss="modal"
                onClick={() => fonctionFirstBtnModal()}
                data-bs-toggle={secondModalDataToggle ? 'modal' : null}
              >
                {firstModalBtn}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id={secondModalDataTarget}
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        data-bs-backdrop="static"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundColor: '#ffffff' }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                {secondModalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{secondModalBody}</div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
                //onClick={() => fonctionSecondBtnModal()}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Modal
