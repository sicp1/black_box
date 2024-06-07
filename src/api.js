import axios from "axios"
axios.defaults.baseURL="http://193.163.19.81:35883"

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