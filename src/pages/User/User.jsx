import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { path } from 'src/constants/path'
import Password from './Password/Password'
import Profile from './Profile/Profile'
import * as sly from './User.styled.js'
import UserPurchase from './UserPurchase/UserPurchase'
export default function User() {
  return (
    <div>
      <sly.Container className="container">
        <sly.Sidebar>
          <sly.Brief>
            <sly.Briefavt to="">
              <img src="https://cf.shopee.vn/file/920828c0b76574a1567d37429f2d47ad_tn" alt="" />
            </sly.Briefavt>
            <sly.BriefRight>
              <sly.BriefUsername>kien123vn</sly.BriefUsername>
              <sly.BriefEdit to={path.profile}>
                <div>
                  <svg width={12} height={12} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                      fill="#9B9B9B"
                      fillRule="evenodd"
                    />
                  </svg>
                  Sửa hồ sơ
                </div>
              </sly.BriefEdit>
            </sly.BriefRight>
          </sly.Brief>
          <sly.SidebarMenu>
            <sly.SidebarMenuEntry to={path.profile}>
              <sly.SidebarMenuEntryIcon>
                <img src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4" alt="" />
              </sly.SidebarMenuEntryIcon>
              Tài khoản của tôi
            </sly.SidebarMenuEntry>
            <sly.SidebarMenuEntry to={path.password}>
              <sly.SidebarMenuEntryIcon>
                <img src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4" alt="" />
              </sly.SidebarMenuEntryIcon>
              Đổi mật khẩu
            </sly.SidebarMenuEntry>
            <sly.SidebarMenuEntry to={path.purchares}>
              <sly.SidebarMenuEntryIcon>
                <img src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4" alt="" />
              </sly.SidebarMenuEntryIcon>
              Đơn mua
            </sly.SidebarMenuEntry>
          </sly.SidebarMenu>
        </sly.Sidebar>
        <sly.Main>
          <Switch>
            <Route path={path.user} exact>
              <Redirect to={path.profile} />
            </Route>
            <Route path={path.profile}>
              <Profile />
            </Route>
            <Route path={path.password}>
              <Password />
            </Route>
            <Route path={path.purchares}>
              <UserPurchase />
            </Route>
          </Switch>
        </sly.Main>
      </sly.Container>
    </div>
  )
}
