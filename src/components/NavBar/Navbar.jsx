import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import { useAuth } from 'src/hook/useAuth'
import usePopup from 'src/hook/usePopup'
import { logout } from 'src/pages/Authention/authention.slice'
import Popup from '../Popup/Popup'
import * as sly from './Navbar.styled'

export default function Navbar() {
  const Authted = useAuth()
  const profile = useSelector(state => state.auth.profile)
  const { activePopup, showPopup, hidePopup } = usePopup()
  const dispatch = useDispatch()

  const handleLogout = () => dispatch(logout())

  return (
    <sly.Navbar>
      <sly.NavMenu>
        {Authted && (
          <li>
            <sly.user onMouseEnter={showPopup} onMouseLeave={hidePopup}>
              <sly.userImg src="https://img4.thuthuatphanmem.vn/uploads/2020/12/25/avt-doc-ma-chat_115941581.jpg"></sly.userImg>
              <sly.userName>
                <ul>
                  <li>{profile.name || profile.email}</li>
                </ul>
              </sly.userName>
              <Popup active={activePopup}>
                <sly.userLink to={path.user}>Tài khoản của tôi</sly.userLink>
                <sly.userLink to={path.purchares}>Đơn mua</sly.userLink>
                <sly.userButton>
                  <Link onClick={handleLogout} to={path.login}>
                    Đăng xuất
                  </Link>
                </sly.userButton>
              </Popup>
            </sly.user>
          </li>
        )}
        {!Authted && (
          <Fragment>
            <li>
              <sly.navLink to={path.register}>Đăng Ký</sly.navLink>
            </li>
            <li>
              <sly.navLink to={path.login}>Đăng Nhập</sly.navLink>
            </li>
          </Fragment>
        )}
      </sly.NavMenu>
    </sly.Navbar>
  )
}
