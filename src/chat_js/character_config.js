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
import { character_create,character_get_all } from '../api';
function CharacterForm({character_name,character_description,character_feature,setCharacterName,setCharacterDescription,setCharacterFeature}){
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
    return(
<Form
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
          label="人设名"

          rules={[
            {
              required: true,
              message: 'Please input!',
            },
          ]}
        >
          <Input
          value={character_name}
          onChange={
            (event)=>{
              setCharacterName(event.target.value)
            }
          }/>
        </Form.Item>
      <Form.Item
        label="人设feature"

        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input
        value={character_feature}
        onChange={
          (event)=>{
            setCharacterFeature(event.target.value)
          }
        }
        />
      </Form.Item>
     <Form.Item
       label="人设description"

       rules={[
         {
           required: true,
           message: 'Please input!',
         },
       ]}
     >
       <Input
       value={character_description}
       onChange={
         (event)=>{
           setCharacterDescription(event.target.value)
         }
       }/>
     </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit"
        onClick={()=>{
            character_create(JSON.stringify(
                {
                    "name":character_name,
                    "feature":character_feature,
                    "description":character_description
                }
            )).then((res)=>{
                console.log(res)
            })
        }}
        >
          Submit
        </Button>
      </Form.Item>
</Form>


    )

}
function CharacterNone(){
    return(
        <Empty style={{marginLeft:'20px',width:'60%'
        }}></Empty>
    )
}
function CharacterHtmlAllocate({key_,setKey,items,setItems,all_character}){
    const [character_name,setCharacterName]=useState("")
    const [character_description,setCharacterDescription]=useState("")
    const [character_feature,setCharacterFeature]=useState("")
    
    useEffect(()=>{
        if(key_!=-1 && all_character.length!=0){
            if(all_character[key_-1]==undefined){
                setCharacterName("")
                setCharacterDescription("")
                setCharacterFeature("")
              return 
            }
            setCharacterDescription(all_character[key_-1].description)
            setCharacterFeature(all_character[key_-1].feature)
            setCharacterName(all_character[key_-1].name)

        }   
    },[key_])


    console.log("key_current:",key_)
    if (key_=="-1"){
        return <CharacterNone></CharacterNone>
    }else if (key_=="0"){
console.log("key_current")
        var tmp=[
            ...items,
            {
                key:items.length.toString(),
                icon:<SettingOutlined />,
                label:`人设${items.length.toString()}`
            }
        ]
        setItems(tmp)
        setKey(-1)
    }else{
        return <CharacterForm
        character_name={character_name}
        character_feature={character_feature}
        character_description={character_description}
        setCharacterDescription={setCharacterDescription}
        setCharacterFeature={setCharacterFeature}
        setCharacterName={setCharacterName}
        >
        </CharacterForm>
    }


}

export default function CharacterConfig({open,setOpen,all_character,setAllCharacter}){
    const [items,setItems]=useState([
      {
          key:'0',
          icon:<SettingOutlined />,
          label:'新建人设'
        }
    ])
    const [key,setKey]=useState(-1)
  
    useEffect(()=>{
        async function get_all(){
await character_get_all().then((res)=>{
    var len=0
    console.log(res.data.data)
    setAllCharacter(res.data.data)
    setItems([
        {
          key:'0',
          icon:<SettingOutlined />,
          label:'新建人设'
        },
        ...res.data.data.map((item)=>{
            len+=1
            return {
                key:len.toString(),
                icon:<SettingOutlined />,
                label:item.name
            }
        })
    ])
    
})


        }
get_all()

    },[open])


    return (
        <Modal size="lg" style={{
            }} open={open}
            onClose={
                ()=>{
                    setKey(-1)
                    setOpen(false)
                    setItems([
                      {
                          key:'0',
                          icon:<SettingOutlined />,
                          label:'新建人设'
                        }
                    ])

                }
            }
            >
        <Modal.Header>
              <Modal.Title>人设设置</Modal.Title>
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
                onClick={(res)=>{
                    console.log(res.key)
                    setKey(res.key)
                }}
                >

                </Menu>
<CharacterHtmlAllocate key_={key} setKey={setKey} items={items} setItems={setItems} all_character={all_character}></CharacterHtmlAllocate>
                </div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            </Modal>
    )
}