import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { path } from 'src/constants/path'
import { useAuth } from 'src/hook/useAuth'
import PropTypes from 'prop-types'

export default function Authguards({ children }) {
  const authenticated = useAuth()
  if (!authenticated) {
    return <Redirect to={path.login}></Redirect>
  }
  return <Fragment>{children}</Fragment>
}
Authguards.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}
