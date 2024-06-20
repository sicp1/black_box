import '@chatui/core/es/styles/index.less';
import React, { useState,useRef, useEffect } from 'react';
// 引入组件
import Chat, { Bubble, useMessages} from '@chatui/core';
import axios from "axios"
import {get_history} from "../api"
import {SSE} from "../sse"
import {SettingOutlined} from  '@ant-design/icons'
// 引入样式
import '@chatui/core/dist/index.css';
import NodeConfig from './node_config';
export default   function ChatContainer({menuState
  ,setMenu
  ,sessionid_history
  ,setSessionid_history
  ,key_sessionid
  ,setKey_sessionid
  ,nowMenuKey
  ,setNowMenuKey,
   chatting,
  setChatting}){
const messages_all=useRef({})
const [all_node,setAllNode]=useState([])
const { messages, appendMsg, setTyping,updateMsg,deleteMsg } = useMessages([]);
const last_flag=useRef("-1")
const [node_open,node_setopen]=useState(false)
console.log(node_open)
const text_id=useRef(0)
const text_start_end=useRef(0)
const processing=useRef(0)
useEffect(()=>{
  async function init(){
if (isNaN(key_sessionid[nowMenuKey])==true){

  console.log("last_flag")
  console.log("messages:",messages)
  for(var i=1;i<=messages.length;i++){
    console.log("del:",i)
    deleteMsg(i)
  }
  text_id.current=0
   await get_history({"session_id":key_sessionid[nowMenuKey]}).then((res)=>{
    var content
    content=JSON.parse(res.data.data.Content)['session']
    console.log("content___:",content)
    content.forEach(element => {
      text_id.current+=1
     if (element.role=="user"){
      appendMsg({
        type: 'text',
        content: { text: element.content },
        position: 'right',
        _id:text_id.current
      });
     }else{
      appendMsg({
        type: 'text',
        content: { text: element.content },
        position: 'left',
        _id:text_id.current
      });
     }


    });
    var tmp=sessionid_history
    tmp[key_sessionid[nowMenuKey]]=content
    setSessionid_history(tmp)
  })


}else{
  console.log("last_flag")
  console.log("messages:",messages)
  for(var i=1;i<=messages.length;i++){
    console.log("del:",i)
    deleteMsg(i)
  }
  text_id.current=0

}
  }
  init()
  }
,[nowMenuKey])

const defaultQuickReplies = [
  {
    name: '节点设置',
  },
  {
    name: '人设设置',
  },
  {
    name: '关于我们',
  },
  {
    name: '多盒协作',
  }
];



function handleSend(type, val) {
  if (processing.current==0){
    processing.current=1
  }else{
    alert("正在对话中，请稍等一下。")
    return 
  }
  var text_sum=""
  if (type === 'text' && val.trim()) {
    console.log("text_id:",text_id)
    text_id.current+=1
    console.log(text_id.current)
    appendMsg({
      type: 'text',
      content: { text: val },
      position: 'right',
      _id:text_id.current
    });

    setTyping(true);
if (isNaN(key_sessionid[nowMenuKey])==true){
  var tmp=sessionid_history
  tmp[key_sessionid[nowMenuKey]].push({
    "role": "user",
    "content": val
  })
  setSessionid_history(tmp)
  console.log("sessionId:",key_sessionid[nowMenuKey])
var source=new SSE("http://localhost:35883/v1/chat_ping",
  {headers:{
      'Content-Type': 'application/json'
  },
   payload:JSON.stringify({
    "session": sessionid_history[key_sessionid[nowMenuKey]],
    "id":key_sessionid[nowMenuKey]
   }
   ),
   method:'POST'
}
)
}else{
  console.log("sessionId:",key_sessionid[nowMenuKey])
  var source=new SSE("http://localhost:35883/v1/chat_ping",
    {headers:{
        'Content-Type': 'application/json'
    },
     payload:JSON.stringify({
       "session": [
         {
           "role": "user",
           "content": val
         }
       ]
     }),
     method:'POST'
  }
  )
}


    source.addEventListener('message', function (event) {
      setChatting("1")

    if (isNaN(key_sessionid[nowMenuKey])==false && key_sessionid[nowMenuKey] !="-1"){

      console.log("start create session history")
      var tmpMenuState=menuState.map((item)=>{
         if (item['key']==nowMenuKey){
          return {
            key:item['key'],
            icon:<SettingOutlined />,
            label:val
          }
         }
         return item
      })

    setMenu(tmpMenuState)
    var tmp_key_sessionid=key_sessionid
    tmp_key_sessionid[nowMenuKey]=JSON.parse(event.data)['id']
    setKey_sessionid(tmp_key_sessionid)
    var tmp=sessionid_history
    tmp[JSON.parse(event.data)['id']]=[
      {
        "role": "user",
        "content": val
      }
    ]
    setSessionid_history(tmp)


    }else if (key_sessionid[nowMenuKey]=="-1"){
      setMenu([
        ...menuState,
      {
        key:(menuState.length+1).toString(),
        icon:<SettingOutlined />,
        label:val,
      }
      ])
      setNowMenuKey((menuState.length+1).toString())
      console.log("-1-1-1-1:",JSON.parse(event.data)['id'])

      var tmp=sessionid_history
      tmp[JSON.parse(event.data)['id']]=[
        {
          "role": "user",
          "content": val
        }
      ]
      setSessionid_history(tmp)

      var tmp_key_sessionid=key_sessionid
      tmp_key_sessionid[(menuState.length+1).toString()]=JSON.parse(event.data)['id']
      setKey_sessionid(tmp_key_sessionid)
      console.log("-1-1-1:",tmp)


    }

        if (text_start_end.current==0){
          text_id.current+=1
    appendMsg({
      type: 'text',
      content: { text: '' },
      _id:text_id.current,
    });

    text_start_end.current=1
        }
      console.log(event)

      console.log("res:",JSON.parse(event.data)['content_stream'])
      if (JSON.parse(event.data)['content_stream']==="[DONE]"){
        var tmp=sessionid_history
        tmp[JSON.parse(event.data)['id']].push(
          {
            "role":"assistant",
            "content":text_sum
          }
        )

        setSessionid_history(tmp)

        console.log("donedone")
        processing.current=0
        text_start_end.current=0
        setChatting("0")
        if (all_node.length!=0){
          all_node.forEach((item)=>{
            if(!messages_all.current.hasOwnProperty(item.Name)){
              messages_all.current[item.Name]=[]
            }
            console.log("sssicppp")
            messages_all.current[item.Name].push({
              "role":"user",
              "content":val
            })

            axios({
              url:item.Url,
              headers:{
                  'Content-Type': 'application/json'
              } ,
              data:{
                "model": "gs-llm",
                "messages":messages_all.current[item.Name],
                "max_tokens": 2048,
                "temperature": 0
              },
              method:'post'
            }).then((res)=>{
              console.log("another:",res)
              text_id.current++
              appendMsg({
                user:{
                    "name": item.Name
                },
                type: 'text',
                content: { text: res.data["choices"][0]["message"]['content'] },
                _id:text_id.current
            })
            messages_all.current[item.Name].push({
              "role":"assistant",
              "content":res.data["choices"][0]["message"]['content']
            }
            )
            })



          })
        }
        return
      }else{
        text_sum=text_sum+JSON.parse(event.data)['content_stream']
      setTimeout(()=>{
        updateMsg(text_id.current,
          {
            type:'text',
            content:{
              text:text_sum
            },
            user:{
              "name":"local"
            }
          }
        )
      },500)
    }
    }
    
    )
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
  if(name=="多盒协作"){
    text_id.current++
    appendMsg({
      type: 'text',
      content: { text: "开始多盒协作  测试问题:讨论一下ai会不会是新的工业革命" },
      position: 'right',
      _id:text_id.current
    });
    var example="讨论一下ai会不会是新的工业革命,并且注意尽可能的回答简短"
   var next=""
    async function mutil_agent(){
      var local_url="http://385366.proxy.nscc-gz.cn:8888/v1/chat/completions"
     await axios({
        url:local_url,
        headers:{
            'Content-Type': 'application/json'
        } ,
        data:{
          "model": "gs-llm",
        "messages":[{"role":"user","content":example}],
          "max_tokens": 2048,
          "temperature": 0
        },
        method:'post'
      }).then((res)=>{
        next=res.data["choices"][0]["message"]['content']
        text_id.current++
        appendMsg({
          user:{
              "name": 'local'
          },
          type: 'text',
          content: { text: next },
          _id:text_id.current

        })
      })
      all_node.forEach(async (item)=>{
        await axios({
          url:item.Url,
          headers:{
              'Content-Type': 'application/json'
          } ,
          data:{
            "model": "gs-llm",
            "messages":[{"role":'user',"content":`这是你要讨论的问题:${example} 这是上一个人讨论的结果 ${next}  请接着继续讨论`}],
            "max_tokens": 2048,
            "temperature": 0
          },
          method:'post'
        }).then((res)=>{
          next=res.data["choices"][0]["message"]['content']
          text_id.current++
          appendMsg(
            {
              user:{
                  "name": item.Name
              },
              type: 'text',
              content: { text: next },
              _id:text_id.current

            }


          )
        })
      })

    }
    mutil_agent()

    

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
    onInputBlur={(event)=>{
      console.log("blur:",event)
    }}
  />
  <NodeConfig open={node_open} setOpen={node_setopen} all_node={all_node} setAllNode={setAllNode}  ></NodeConfig>
  </>
);
  }