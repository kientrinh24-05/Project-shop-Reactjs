import React from 'react'
import * as sly from './footer.style'
export default function Foodter() {
  return (
    <sly.Footer>
      <div className="container">
        <sly.Footer1>
          <div>© 2021 KaneDline</div>
          <sly.Language>
            Ngôn ngữ
            <span>Tiếng Anh</span>
            <span>Tiếng Trung</span>
            <span>Tiếng Việt</span>
          </sly.Language>
        </sly.Footer1>
        <sly.Footer2>
          <div>Công ty TNHH KaneDline</div>
          <div>Thôn Ngân Điền Xã Sơn Hà Huyện Sơn Hòa Tỉnh Phú Yên Email:tdkien.99.vn@gmail.com</div>
        </sly.Footer2>
      </div>
    </sly.Footer>
  )
}
