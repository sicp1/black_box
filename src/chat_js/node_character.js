import { Modal } from 'rsuite';
import { Menu,Select} from "antd"
import {SettingOutlined} from "@ant-design/icons"
import { useState,useRef,useEffect } from 'react';
import {Empty} from "@chatui/core"
import {
  Button,
  Form,
  Input,

} from 'antd'
import { Descriptions } from 'antd';
function NodeCharacterForm({key_,all_node,all_character,character_node}){
  console.log("all_character_all_character:",all_character)
  const defaultValue=useRef(null)
  const tmpValue=useRef(null)
    const [items,setItems]=useState([
        {
            key:"1",
            label:"name",
            children:""
        },
        {
            key:"2",
            label:"description",
            children:""
        },
        {
            key:"3",
            label:"feature",
            children:""
        }
    ])
    if (all_node[key_].Id in character_node){
      all_character.forEach((item,index)=>{
        if (character_node[all_node[key_].Id]['id']==item.id){
          defaultValue.current=index
        }
      })
    }
    useEffect(()=>{
if (all_node[key_].Id in character_node){
      all_character.forEach((item,index)=>{
if (character_node[all_node[key_].Id]['id']==item.id){
setItems([
  {
      key:"1",
      label:"name",
      children:all_character[index].name
  },
  {
      key:"2",
      label:"description",
      children:all_character[index].description
  },
  {
      key:"3",
      label:"feature",
      children:all_character[index].feature
  }
])
}

      })



    }


    },[key_])
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
console.log("return_default_value:",defaultValue.current)
    return (
        <div 
        style={{
            display: "flex",
            flexFlow: "column",
            flexWrap: "wrap"
        }}>
          <Select
          size="large"
          style={{
            marginTop:"10%",
            marginLeft:'20%',
            width: 120,
          }}
          defaultValue={defaultValue.current}
          onChange={(value)=>{
            tmpValue.current=value
            console.log(character_node)
            setItems([
                {
                    key:"1",
                    label:"name",
                    children:all_character[value].name
                },
                {
                    key:"2",
                    label:"description",
                    children:all_character[value].description
                },
                {
                    key:"3",
                    label:"feature",
                    children:all_character[value].feature
                }
            ])
          }}
          options={
            all_character.map(
                (item,index)=>{
                    return {
                        value:index,
                        label:item.name
                    }
                }
            )
          }

        />
        <Descriptions 
        style={{
            marginLeft:'20%',
            marginTop:"10%"
        }}
        title="人设" items={items} layout="vertical" />
        <Button type="primary" htmlType="submit"
        style={{
            marginLeft:'20%',
            marginTop:"10%"
        }}
        onClick={()=>{
          character_node[all_node[key_].Id]={
            "name":all_character[tmpValue.current].name,
            "description":all_character[tmpValue.current].description,
            "feature":all_character[tmpValue.current].feature,
            "id":all_character[tmpValue.current].id       
          }

        }}
        >
          Submit
        </Button>
        </div>
    )
}
function NodeCharacterNone(){
    return(
        <Empty style={{marginLeft:'20px',width:'60%'
        }}></Empty>
    )
}
function NodeCharacterHtmlAllocate({key_,all_node,all_character,character_node}){
  console.log("NodeCharacterHtmlAllocate:",key_)
    if (key_==-1){
        return NodeCharacterNone
    }else{
      console.log("NodeCharacterHtmlAllocate:",key_)
        return <NodeCharacterForm
        key_={key_}
        all_node={all_node}
        all_character={all_character}
        character_node={character_node}
        ></NodeCharacterForm>
    }
    
}
export function NodeCharacter({open,setOpen,all_node,all_character,character_node}){
    const [key,setKey]=useState(-1)

    return(
        <Modal size="lg" style={{
            }} open={open}
            onClose={
                ()=>{
                    setOpen(false)
                }
            }
            >
        <Modal.Header>
              <Modal.Title>人设节点配置</Modal.Title>
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
                items={all_node.map(
                    (item,index)=>{
                        return {
                          key:index.toString(),
                          icon:<SettingOutlined />,
                          label:item.Name
                        }
                    }
                )}
                onClick={
                  (
                              (res)=>{
                  console.log(res.key)
                  setKey(res.key)

                              }
                            )
                }
                >
                </Menu>
                <NodeCharacterHtmlAllocate
                key_={key}
                all_node={all_node}
                all_character={all_character}
                character_node={character_node}
                >

                </NodeCharacterHtmlAllocate>
                </div>

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            </Modal>
    )
}