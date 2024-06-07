import { Modal } from 'rsuite';
import React,{ useState,useRef, useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import {SettingOutlined} from "@ant-design/icons"
import { Menu} from "antd"
import {Empty} from "@chatui/core"
import {
  Button,
  Form,
  Input,

} from 'antd'


function NodeForm(){
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
              <Input />
            </Form.Item>
          <Form.Item
            label="节点IP"
            
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="节点端口"

            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
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
function NodeHtmlAllocate({key_,items,itemsConfig,setItems,setKey}){
  const flag=useRef(true)
  console.log(key_)
  if (key_===-1){
    flag.current=true
    return NodeNone()
  }
  let label=itemsConfig.current[key_]
  
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

    return NodeForm()
  }
  // if (items[key_].label==="新建节点"){
  //   setItems(items.push({
  //     key:items.length.toString(),
  //     icon:<SettingOutlined />,
  //     label:'新节点'
  //   }))
    return NodeNone()
  }
export default function NodeConfig({open,setOpen}){
  const [items,setItems]=useState([
    {
        key:'0',
        icon:<SettingOutlined />,
        label:'新建节点'
      }
  ])
  const itemsConfig=useRef(["setting"])
  const [tmpkey,setTmpkey]=useState(-1)
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
        
      <NodeHtmlAllocate itemsConfig={itemsConfig} key_={tmpkey} items={items} setItems={setItems} setKey={setTmpkey}></NodeHtmlAllocate>
        
        </div>
    </Modal.Body>
    <Modal.Footer>
    </Modal.Footer>
    </Modal>
   )
}