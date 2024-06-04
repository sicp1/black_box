import '@chatui/core/es/styles/index.less';
import React, { useState } from 'react';
// 引入组件
import Chat, { Bubble, useMessages} from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';
import NodeConfig from './node_config';
export default function ChatContainer(){
const { messages, appendMsg, setTyping } = useMessages([]);
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

function handleSend(type, val) {
  if (type === 'text' && val.trim()) {
    appendMsg({
      type: 'text',
      content: { text: val },
      position: 'right',
    });

    setTyping(true);

    setTimeout(() => {
      appendMsg({
        type: 'text',
        content: { text: 'Bala bala' },
      });
    }, 1000);
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