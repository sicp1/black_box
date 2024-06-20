import React from 'react';
import {SettingOutlined} from "@ant-design/icons"
import {Menu} from "antd"

export default function MenuChat({menuState,setMenu,nowSessionId,setNowSessionId,nowMenuKey,setNowMenuKey,key_sessionid,setKey_sessionid,chatting}){
    return <Menu
    selectedKeys={[nowMenuKey]}
    style={{
      width: '10%',
    }}
    mode="inline"
    items={menuState}
    onClick={
      (res)=>{

        if (chatting=="0"){
       var key=res.key

        if (key=="1"){
          setMenu([
            ...menuState,
            {
              key:(menuState.length+1).toString(),
              icon:<SettingOutlined />,
              label:"对话"+menuState.length,
            }
          ])
          setNowMenuKey((menuState.length+1).toString())
          var tmp=key_sessionid
          tmp[(menuState.length+1).toString()]=(menuState.length).toString()
          setKey_sessionid(tmp)

        }else{
          console.log("nowMenuKey:",res.key)
          setNowMenuKey(res.key)
        }
        


      }else{
        alert("请稍等。")
      }
    }
  }
              />
}