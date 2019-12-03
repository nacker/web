import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = props => {
  return (
    <p>
      <NavLink activeClassName="todos-active" to="/all">
        ALL
      </NavLink>{' '}
      <NavLink activeClassName="todos-active" to="/active">
        ACTIVE
      </NavLink>{' '}
      <NavLink activeClassName="todos-active" to="/completed">
        COMPLETED
      </NavLink>
    </p>
  )
}

export default Footer
