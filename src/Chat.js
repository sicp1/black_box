import ChatContainer from "./chat_js/chat_container";
import MenuChat from "./chat_js/menu";
import "./chat_css/chat.css" 
export default function Chat() {
  return( <div className="chat">
    <MenuChat className="menu_chat"  />
    <div style={{width:'90%'}}>
    <ChatContainer className="chat_container" />
    </div>
</div>
)
}