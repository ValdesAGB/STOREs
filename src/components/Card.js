import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { disponible, indisponible } from '../untils/data'

function Card({ id, name, description, cover, price, inStock }) {
  const PriceSpan = styled.span`
    position: absolute;
    background-color: #31b472;
    color: white;
    padding: 10px;
    right: 0;
    top: 0;
    font-weight: lighter;
  `

  const CardDiv = styled.div`
    padding: 10px;
    transition: 200ms;
    &:hover {
      cursor: pointer;
      box-shadow: 2px 2px 10px #408eb5;
    }
  `

  return (
    <React.Fragment>
      <CardDiv className="card col-3 m-4" style={{ width: '18rem' }}>
        <Link to={`product/viewmore/${id}`} className="text-decoration-none">
          <div className="">
            <img
              src={cover}
              className="card-img-top w-100"
              style={{ width: '270px', height: '170px' }}
              alt={`${name}-cover`}
            />
          </div>
          <div className="card-body row align-items-end">
            <div className="col-9">
              <h5 className="card-title text-dark fw-light">{name}</h5>
            </div>
            <div className="col">
              <span>{inStock ? disponible : indisponible}</span>
            </div>
          </div>
          <PriceSpan>
            {price.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            })}
          </PriceSpan>
        </Link>
      </CardDiv>
    </React.Fragment>
  )
}

export default Card
