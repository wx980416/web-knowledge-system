import React, { memo } from 'react'

import { headerLinks } from '@/common/local-data'

import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { HeaderWrapper, HeaderLeft, HeaderRight } from './styles.js'

export default memo(function HYAppHeader() {
  const showSelectItem = (item, index) => {
    if (index < 3) {
      return (
        <NavLink to={item.link} exact>
          {item.title}
          <i className="sprite_01 icon"></i>
        </NavLink>
      )
    } else {
      return <a href={item.link}>{item.title}</a>
    }
  }

  return (
    <div>
      <HeaderWrapper>
        <div className="content wrap-v1">
          <HeaderLeft>
            <a href="#/" className="logo sprite_01">
              网易云音乐
            </a>
            <div className="select-list">
              {headerLinks.map((item, index) => {
                return (
                  <div key={item.title} className="select-item">
                    {showSelectItem(item, index)}
                  </div>
                )
              })}
            </div>
          </HeaderLeft>
          <HeaderRight>
            <Input
              placeholder="音乐/视频/电台/用户"
              className="search"
              prefix={<SearchOutlined />}
            />
            <div className="center">创作者中心</div>
            <div className="login">登录</div>
          </HeaderRight>
        </div>
        <div className="divier"></div>
      </HeaderWrapper>
    </div>
  )
})
