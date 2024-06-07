import '@chatui/core/es/styles/index.less';
import React, { useState,useRef } from 'react';
// 引入组件
import Chat, { Bubble, useMessages} from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';
import NodeConfig from './node_config';
import {chat} from "../api"
export default function ChatContainer(){
const { messages, appendMsg, setTyping,updateMsg } = useMessages([]);
const [node_open,node_setopen]=useState(false)
console.log(node_open)

const defaultQuickReplies = [
  {
    name: '节点设置',
  },
  {
    name: '人设设置',
  },
  {
    name: '关于我们',
  }
];
const text_id=useRef(0)
function handleSend(type, val) {
  var text_sum=""
  if (type === 'text' && val.trim()) {
    text_id.current+=1
    appendMsg({
      type: 'text',
      content: { text: val },
      position: 'right',
    });

    setTyping(true);
    appendMsg({
      type: 'text',
      content: { text: text_sum },
      _id:text_id
    });
    chat({
      "session":[
        {
          "role":"user",
          "content":val
        }
      ]
    }).then((res)=>{

      console.log(res)
    })


    // updateMsg(text_id,
    //   {
    //     type:'text',
    //     content:{
    //       text:text_sum
    //     }
    //   }
    // )
  }
}

function renderMessageContent(msg) {
  const { content } = msg;
  return <Bubble content={content.text} />;
}

function quickReply(msg){
  let name=msg.name
  if (name == "节点设置"){
   node_setopen(true)
  }

}

return (
  <>
  <Chat
    navbar={{ title: '智能助理' }}
    messages={messages}
    renderMessageContent={renderMessageContent}
    onSend={handleSend}
    onQuickReplyClick={quickReply}
    quickReplies={defaultQuickReplies}
  />
  <NodeConfig open={node_open} setOpen={node_setopen}></NodeConfig>
  </>
);

}