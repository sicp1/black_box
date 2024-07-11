import React from 'react';
import {SettingOutlined} from "@ant-design/icons"
import {Menu} from "antd"
import { useState } from 'react';


export default function MenuChat({menuState,setMenu,nowSessionId,setNowSessionId,nowMenuKey,key_sessionid,setKey_sessionid,chatting,NowMenuKey,setNowMenuKey}){
    return <Menu
    selectedKeys={[NowMenuKey]}
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
          nowMenuKey.current=(menuState.length+1).toString()
          setNowMenuKey(nowMenuKey.current)
          var tmp=key_sessionid
          tmp[(menuState.length+1).toString()]=(menuState.length).toString()
          setKey_sessionid(tmp)

        }else{
          console.log("nowMenuKey:",res.key)
          nowMenuKey.current=res.key
          setNowMenuKey(nowMenuKey.current)
        }
        


      }else{
        alert("请稍等。")
      }
    }
  }
              />
}