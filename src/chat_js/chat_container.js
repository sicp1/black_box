import '@chatui/core/es/styles/index.less';
import React, { useState,useRef, useEffect } from 'react';
// 引入组件
import Chat, { Bubble, useMessages} from '@chatui/core';
import axios from "axios"
import {get_history,node_infer,node_get_all} from "../api"
import {SSE} from "../sse"
import {SettingOutlined} from  '@ant-design/icons'
// 引入样式
import '@chatui/core/dist/index.css';
import NodeConfig from './node_config';
import CharacterConfig from './character_config';
import { NodeCharacter } from './node_character';
import {baseURL,set_history} from "../api"
import { Empty } from 'antd';
export default   function ChatContainer({menuState
  ,setMenu
  ,sessionid_history
  ,setSessionid_history
  ,key_sessionid
  ,setKey_sessionid
  ,nowMenuKey,
   chatting,
  setChatting,
NowMenuKey,
setNowMenuKey}){
const messages_all=useRef({})
const [all_node,setAllNode]=useState([])
const all_node_tmp=useRef([])
const [defaultQuickReplies,setReplies] = useState([
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
  },
  {
    name:"节点人设配置"
  }
  
]);

const [all_character,setAllCharacter]=useState([])
const { messages, appendMsg, setTyping,updateMsg,deleteMsg } = useMessages([]);

const menukey_history=useRef({})
const menukey_historyid=useRef({})
const sessionid_array=useRef({
  "local":0
})


const last_flag=useRef("-1")
const [node_open,node_setopen]=useState(false)
const [character_open,character_setopen]=useState(false)
const [node_character_open,node_character_setopen]=useState(false)

const character_node=useRef({})
const all_node_choose=useRef([])
console.log(node_open)
const text_id=useRef(0)
const text_start_end=useRef(0)
const processing=useRef(0)
useEffect(()=>{
  console.log(1111)
  async function init(){
    await node_get_all().then((res)=>{
      all_node_tmp.current=res.data.data
      setReplies([...defaultQuickReplies,
      ...all_node_tmp.current.map((item)=>{
        return {
          "name":item.Name
        }

      })
      ])
      
    })





    console.log("set:",menukey_history.current)
await  set_history(JSON.stringify(
  {
    "saved_json":JSON.stringify(menukey_history.current),
    "sessionid_set":JSON.stringify(sessionid_array.current)
  }
)).then(
  (res)=>{
    menukey_historyid.current[nowMenuKey.current]=res.data.data.id
    console.log("menukey_historyid:",menukey_historyid)
  }
)

if (isNaN(key_sessionid[nowMenuKey.current])==true){


  console.log("last_flag")
  console.log("messages:",messages)
  for(var i=1;i<=messages.length;i++){
    console.log("del:",i)
    deleteMsg(i)
  }
  text_id.current=0
  console.log("history_id:",JSON.stringify({"history_id":menukey_historyid.current[nowMenuKey.current]}),"   key:",nowMenuKey.current)
   await get_history({"history_id":menukey_historyid.current[nowMenuKey.current]}).then((res)=>{
    console.log(res)
    if (res.data.data.history==""){
      return
    }
    var content=JSON.parse(res.data.data.history)[nowMenuKey.current]
    console.log(res)
    content.forEach(element=>{
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
    })
    var tmp=sessionid_history
    tmp[key_sessionid[nowMenuKey.current]]=content
    setSessionid_history(tmp)
    // var content
    // console.log("get_history:",res)
    // content=JSON.parse(res.data.data.Content)['session']
    // console.log("content___:",content)
    // content.forEach(element => {
    //   text_id.current+=1
    //  if (element.role=="user"){
    //   appendMsg({
    //     type: 'text',
    //     content: { text: element.content },
    //     position: 'right',
    //     _id:text_id.current
    //   });
    //  }else{
    //   appendMsg({
    //     type: 'text',
    //     content: { text: element.content },
    //     position: 'left',
    //     _id:text_id.current
    //   });
    //  }


    // });
    // var tmp=sessionid_history
    // tmp[key_sessionid[nowMenuKey.current]]=content
    // setSessionid_history(tmp)
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
,[NowMenuKey])

console.log("replies:   ",all_node)




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

if (isNaN(key_sessionid[nowMenuKey.current])==true){

  var tmp=sessionid_history
  tmp[key_sessionid[nowMenuKey.current]].push({
    "role": "user",
    "content": val
  })
  setSessionid_history(tmp)
  console.log("sessionId:",key_sessionid[nowMenuKey.current])
var source=new SSE(`${baseURL}/v1/chat_ping`,
  {headers:{
      'Content-Type': 'application/json'
  },
   payload:JSON.stringify({
    "session":[
      {
        "role":"user",
        "content":val
      }
    ] ,
    "id":key_sessionid[nowMenuKey.current]
   }
   ),
   method:'POST'
}
)
}else{
  console.log("test_nowMenuKey:",nowMenuKey.current)
  console.log("sessionId:",key_sessionid[nowMenuKey.current])
  var source=new SSE(`${baseURL}/v1/chat_ping`,
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

    if (isNaN(key_sessionid[nowMenuKey.current])==false && key_sessionid[nowMenuKey.current] !="-1"){
      menukey_history.current[nowMenuKey.current]=[
       ]
       menukey_historyid.current[nowMenuKey.current]=-1

      console.log("start create session history")
      var tmpMenuState=menuState.map((item)=>{
         if (item['key']==nowMenuKey.current){
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
    tmp_key_sessionid[nowMenuKey.current]=JSON.parse(event.data)['id']
    sessionid_array.current['local']=JSON.parse(event.data)['id']
    setKey_sessionid(tmp_key_sessionid)
    var tmp=sessionid_history
    tmp[JSON.parse(event.data)['id']]=[
      {
        "role": "user",
        "content": val
      }
    ]
    setSessionid_history(tmp)


    }else if (key_sessionid[nowMenuKey.current]=="-1"){
      setMenu([
        ...menuState,
      {
        key:(menuState.length+1).toString(),
        icon:<SettingOutlined />,
        label:val,
      }
      ])
      nowMenuKey.current=(menuState.length+1).toString()
      menukey_history.current[nowMenuKey.current]=[
       ]
       menukey_historyid.current[nowMenuKey.current]=-1
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
        console.log("test_current:",menukey_historyid.current[nowMenuKey.current])
        menukey_history.current[nowMenuKey.current].push(
        {
          "role": "user",
          "content": val
        }
              )
        menukey_history.current[nowMenuKey.current].push(
          {
            "role":"assistant",
            "content":text_sum
          }
        )
      //  if (menukey_historyid.current[nowMenuKey.current]==-1){
       
      //   console.log("test_menukey_history: ",menukey_history.current)

      //  }

        setSessionid_history(tmp)

        console.log("donedone")
        processing.current=0
        text_start_end.current=0
        setChatting("0")

        if (all_node_choose.current.length!=0){
          all_node_choose.current.forEach((item)=>{
            if(!(item.Name in sessionid_array.current)){  
              let character_id=character_node.current[item.Id]
              console.log("character_id:",character_id,"item.Id:",item.Id,"character_node:",character_node.current)
            node_infer(JSON.stringify(
              {
                "session":[
                  {
                    "role":"user",
                    "content":val
                  }
                ],
                "node_id":item.Id,
                "character_id":character_id.id,
                "stream":false
              }
            )).then((res)=>{
              console.log(res)
              sessionid_array.current[item.Name]= res.data.data.id
              text_id.current++
              appendMsg(
                {
                  user:{
                    "name":item.Name
                  },
                  type:"text",
                  content:{"text":res.data.data.content},
                  _id:text_id.current
                }
              )
              menukey_history.current[nowMenuKey.current].push({"content":res.data.data.content,
                "role":"assistant"
              })
            })
          }else{
            let character_id=character_node.current[item.Id]
            console.log("character_id:",character_id)
            node_infer(JSON.stringify({
            "session":[
             {
               "role":"user",
               "content":val
             }
            ],
            "node_id":item.Id,
            "character_id":character_id.id,
            "stream":false,
            "id":sessionid_array.current[item.Name]
             }
             )).then((res)=>{
               text_id.current++
               appendMsg(
                 {
                   user:{
                     "name":item.Name
                   },
                   type:"text",
                   content:{"text":res.data.data.content},
                   _id:text_id.current
                 }
               )
               menukey_history.current[nowMenuKey.current].push({"content":res.data.data.content,
                 "role":"assistant"
               })

             })
          }


            





            // if(!messages_all.current.hasOwnProperty(item.Name)){
            //   messages_all.current[item.Name]=[]
            // }
            // messages_all.current[item.Name].push({
            //   "role":"user",
            //   "content":val
            // })

            // axios({
            //   url:item.Url,
            //   headers:{
            //       'Content-Type': 'application/json'
            //   } ,
            //   data:{
            //     "model": "gs-llm",
            //     "messages":messages_all.current[item.Name],
            //     "max_tokens": 2048,
            //     "temperature": 0
            //   },
            //   method:'post'
            // }).then((res)=>{
            //   console.log("another:",res)
            //   text_id.current++
            //   appendMsg({
            //     user:{
            //         "name": item.Name
            //     },
            //     type: 'text',
            //     content: { text: res.data["choices"][0]["message"]['content'] },
            //     _id:text_id.current
            // })
            // messages_all.current[item.Name].push({
            //   "role":"assistant",
            //   "content":res.data["choices"][0]["message"]['content']
            // }
            // )
            // })



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
  let nameArray=all_node_tmp.current.map(
    (item)=>{
      return item.Name
    }
  )
  console.log(nameArray)
  if (nameArray.indexOf(name)!=-1 ){
    console.log("in")

    if (all_node_choose.current.map(
      (item)=>{
        return item.Name
      }
    ).indexOf(name)!=-1){
alert("删除成功")
    }else{
    all_node_tmp.current.forEach(
      (item)=>{
        if (item.Name==name){
          all_node_choose.current.push(item)
        }
      }
    )
    alert("添加成功")
    }
  }

  if (name == "节点设置"){
   node_setopen(true)
  }
  if(name=="人设设置"){
    character_setopen(true)
  }
  if(name=="节点人设配置"){
    node_character_setopen(true)

  }
  if(name=="多盒协作"){
    text_id.current++
    appendMsg({
      type: 'text',
      content: { text: "开始多盒协作  测试问题:讨论一下ai会不会是新的工业革命" },
      position: 'right',
      _id:text_id.current
    });
    var example="讨论一下ai是不是新的工业革命,并且注意尽可能的回答简短"
    async function mutil_agent(){
      var next=""
    //   var local_url="http://385366.proxy.nscc-gz.cn:8888/v1/chat/completions"
    //  await axios({
    //     url:local_url,
    //     headers:{
    //         'Content-Type': 'application/json'
    //     } ,
    //     data:{
    //       "model": "gs-llm",
    //     "messages":[{"role":"user","content":example}],
    //       "max_tokens": 2048,
    //       "temperature": 0
    //     },
    //     method:'post'
    //   }).then((res)=>{
    //     next=res.data["choices"][0]["message"]['content']
    //     text_id.current++
    //     appendMsg({
    //       user:{
    //           "name": 'local'
    //       },
    //       type: 'text',
    //       content: { text: next },
    //       _id:text_id.current

    //     })
    //   })
   await  node_infer(JSON.stringify(
      {
        "session":[
          {
            "role":"user",
            "content":`你是一个支持者，你认为ai是新的工业革命，这是你要讨论的问题:${example} 你要给出支持的理由`
          }
        ],
        "stream":false
      }
    )).then((res)=>{
      next=res.data.data.content
      text_id.current++
      appendMsg(
        {
          user:{
              "name": "local"
          },
          type: 'text',
          content: { text: next },
          _id:text_id.current

        }


      )
    })
      all_node.forEach(async (item)=>{
        console.log(item.Url)
        node_infer(JSON.stringify(
          {
            "session":[
              {
                "role":"user",
                "content":`你是一个反对者，你认为ai不是新的工业革命，这是你要讨论的问题:${example} 这是上一个人讨论的结果 ${next}  请接着继续讨论`
              }
            ],
            "node_id":item.Id,
            "stream":false
          }
        )).then((res)=>{
          console.log(res)
          next=res.data.data.content
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
  <CharacterConfig open={character_open}  setOpen={character_setopen} all_character={all_character} setAllCharacter={setAllCharacter}></CharacterConfig>
  <NodeCharacter open={node_character_open}  setOpen={node_character_setopen} all_node={all_node} all_character={all_character} character_node={character_node} ></NodeCharacter>
  </>
);
  }