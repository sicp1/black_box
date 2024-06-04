import { Modal } from 'rsuite';
import React from 'react';
import 'rsuite/dist/rsuite.min.css';
import {SettingOutlined} from "@ant-design/icons"
import { Menu} from "antd"
import {
  Button,
  Form,
  Input,

} from 'antd'

function Nodeform(){
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
            marginLeft:"15%"
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
export default function NodeConfig({open,setOpen}){
    const items=[
      {
          key:'1',
          icon:<SettingOutlined />,
          label:'新建节点'
        }
    ]

   return (
    <Modal size="lg" open={open}
    onClose={
        ()=>{
            setOpen(false)
        }
    }
    >
<Modal.Header>
      <Modal.Title>节点设置</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div style={{display:'flex'}}>
        <Menu
        style={{
          width: '20%',
        }}
        mode="inline"
        items={items}
        >

        </Menu>
      
        <Nodeform ></Nodeform>
        </div>
    </Modal.Body>
    <Modal.Footer>
    </Modal.Footer>
    </Modal>
   )
}