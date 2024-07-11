import ChatContainer from "./chat_js/chat_container";
import MenuChat from "./chat_js/menu";
import "./chat_css/chat.css" 
import {useState,useRef} from "react"
import {SettingOutlined} from  '@ant-design/icons'
import { set } from "rsuite/esm/internals/utils/date";
export default function Chat() {
  const [nowSessionId,setNowSessionId]=useState("-1")
  const [sessionid_history,setSessionid_history]=useState({})
  const [key_sessionid,setKey_sessionid]=useState({
    "-1":"-1"
  })
  const [menu,setMenu]=useState([
    {
      key:'1',
      icon:<SettingOutlined />,
      label:'新建对话',
    },
  ])
  const nowMenuKey=useRef("-1")

  const [NowMenuKey,setNowMenuKey]=useState(-1)

  const [chatting,setChatting]=useState("0")

  return( <div className="chat">
    <MenuChat className="menu_chat"
      menuState={menu}
        setMenu={setMenu}
         nowSessionId={nowSessionId}
           setNowSessionId={setNowSessionId}
             nowMenuKey={nowMenuKey}
                key_sessionid={key_sessionid}
                   setKey_sessionid={setKey_sessionid}
                   chatting={chatting}
                   NowMenuKey={NowMenuKey}
                   setNowMenuKey={setNowMenuKey}
                   />
    <div style={{width:'90%'}}>
    <ChatContainer className="chat_container"
      key_sessionid={key_sessionid} 
       setKey_sessionid={setKey_sessionid} 
        menuState={menu} 
        setMenu={setMenu} 
        nowSessionId={nowSessionId}
         setNowSessionId={setNowSessionId} 
          sessionid_history={sessionid_history}
            setSessionid_history={setSessionid_history}
            nowMenuKey={nowMenuKey}   
            chatting={chatting}
            setChatting={setChatting}
            NowMenuKey={NowMenuKey}
            setNowMenuKey={setNowMenuKey}
            />
    </div>
</div>
)
}