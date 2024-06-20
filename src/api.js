import axios from "axios"
axios.defaults.baseURL="http://127.0.0.1:35883"

export const chat=(data)=>{
    return axios({
     url:"/v1/chat_ping",
     data:data,
     method:'post',
     headers:{
         'Content-Type': 'application/json'
     }   
    })
}

export const get_history=(session_id)=>{
    return  axios({
        url:"/v1/session/get",
        data:session_id,
        method:"post",
        headers:{
            'Content-Type': 'application/json'
        }  
    })
}

export const node_create=(data)=>{
    return axios({
        url:"/v1/node/add",
        headers:{
            'Content-Type': 'application/json'
        }  ,
        method:'post',
        data:data
    })

}

export const node_get_all=()=>{
    return axios({
        url:"/v1/node/get",
        method:"post"
    })
}