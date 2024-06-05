import React from 'react';
import {SettingOutlined} from "@ant-design/icons"
import {Menu} from "antd"
const items=[
  {
      key:'1',
      icon:<SettingOutlined />,
      label:'新建对话',
    }
]
export default function MenuChat(){

    return <Menu
    style={{
      width: '10%',
    }}
    mode="inline"
    items={items}
              />
}