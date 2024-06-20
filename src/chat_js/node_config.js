import { Modal } from 'rsuite';
import React,{ useState,useRef, useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import {SettingOutlined} from "@ant-design/icons"
import { Menu} from "antd"
import {Empty} from "@chatui/core"
import {node_create} from "../api"
import {node_get_all} from "../api"
import {
  Button,
  Form,
  Input,

} from 'antd'


function NodeForm({node_name,setNodeName,key_,setItems,items,node_url,setNodeUrl}){
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 6,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 14,
        },
      },
    };
    return(<Form
          {...formItemLayout}
          variant="filled"
          style={{
            position:"fixed",
            top:"30%",
            marginLeft:"25%",
            width:'50%',
            height:'300px'
            
          }}
        >
            <Form.Item
              label="节点名"

              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Input
              value={node_name}
              onChange={
                (event)=>{
                  setNodeName(event.target.value)
                }
              }/>
            </Form.Item>
          <Form.Item
            label="节点Url"

            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input
            value={node_url}
            onChange={
              (event)=>{
                setNodeUrl(event.target.value)
              }
            }
            />
          </Form.Item>
        
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit"
            onClick={()=>{
              node_create({
                "name":node_name,
                "url":node_url
              }).then(()=>{
                var tmp=items.map(
                  (item)=>{
                    if (item.key==key_){
                      return {
                        key:key_,
                        icon:<SettingOutlined />,
                        label:node_name
                      }
                    }
                    return item
                  }
                )
                setItems(tmp)

              })

            }}
            >
              Submit
            </Button>
          </Form.Item>
    </Form>)
}
function NodeNone(){
  return (
    <Empty style={{marginLeft:'20px',width:'60%'
    }}></Empty>
  )
}
function NodeHtmlAllocate({key_,items,itemsConfig,setItems,setKey,all_node}){
  const [node_name,setNodeName]=useState("")
  const [node_url,setNodeUrl]=useState("")
  useEffect(()=>{
    console.log("all_node:",all_node.length)
    if(key_!=-1 && all_node.length!=0){
      if(all_node[key_-1]==undefined){
        setNodeName("")
        setNodeUrl("")
        return 
      }
      console.log("ssssss")
      setNodeName(all_node[key_-1].Name)
      setNodeUrl(all_node[key_-1].Url)
    }

  },[key_])
  const flag=useRef(true)
  console.log(key_)
  if (key_===-1){
    flag.current=true
    return NodeNone()
  }
  let label=itemsConfig.current[key_]
  console.log("itemsConfig:",itemsConfig)
  console.log("label_itemsConfig:",label)
  
  if (label==="setting"&&flag.current){

    setItems([
      ...items,
      {
        key:items.length.toString(),
            icon:<SettingOutlined />,
            label:'新节点'
      }
    ])
    itemsConfig.current=[
      ...itemsConfig.current,
      "node"
    ]
    setKey(-1)
    flag.current=false

  }
  if (label==="node"){
   
    flag.current=true
return <NodeForm
key_={key_}
items={items}
setItems={setItems}
node_name={node_name}
setNodeName={setNodeName}
node_url={node_url}
setNodeUrl={setNodeUrl}
>

</NodeForm>
    // return NodeForm(
    //   items={items}
    //   setItems={setItems}
    //   node_name={node_name}
    //   ,node_ip
    //   ,node_port
    //   ,setNodeName
    //   ,setNodeIp,
    //    setNodePort)
  }
  // if (items[key_].label==="新建节点"){
  //   setItems(items.push({
  //     key:items.length.toString(),
  //     icon:<SettingOutlined />,
  //     label:'新节点'
  //   }))
    return NodeNone()
  }

export default function NodeConfig({open,setOpen,all_node,setAllNode}){
  const [items,setItems]=useState([
    {
        key:'0',
        icon:<SettingOutlined />,
        label:'新建节点'
      }
  ])
  const itemsConfig=useRef(["setting"])
  const [tmpkey,setTmpkey]=useState(-1)
  useEffect(()=>{
    async function getall(){
var tmp
      await node_get_all().then((res)=>{
        tmp=res.data.data
        console.log("tmptttt:",tmp)
      })
      var index=0
      setAllNode(tmp)
      tmp=tmp.map((item)=>{
        itemsConfig.current.push("node")
        index++

        return {
          key:index,
          icon:<SettingOutlined />,
          label:item.Name
        }

      })

      setItems([
        items[0]
        ,
        ...tmp])
      console.log("temppppppp:",tmp)
    }
    getall()
  },[open])

  console.log("tmp_key:",tmpkey)
   return (
    <Modal size="lg" style={{
    }} open={open}
    onClose={
        ()=>{
            setOpen(false)
            setItems([
              {
                  key:'0',
                  icon:<SettingOutlined />,
                  label:'新建节点'
                }
            ])
            itemsConfig.current=['setting']
            setTmpkey(-1)
        }
    }
    >
<Modal.Header>
      <Modal.Title>节点设置</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div style={{display:'flex',
        position: 'relative',
        height:'600px',
        width:'700px'
        }}>
        <Menu
        style={{
          maxHeight:'600px',
          width: '20%',
        }}
        mode="inline"
        items={items}
        onClick={
          (
                      (res)=>{
          console.log(res.key)
          setTmpkey(res.key)
          
                      }
                    )
        }
        >

        </Menu>
        
      <NodeHtmlAllocate all_node={all_node} itemsConfig={itemsConfig} key_={tmpkey} items={items} setItems={setItems} setKey={setTmpkey}></NodeHtmlAllocate>
        
        </div>
    </Modal.Body>
    <Modal.Footer>
    </Modal.Footer>
    </Modal>
   )
}