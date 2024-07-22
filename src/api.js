import axios from "axios"
export const baseURL = "/api";
axios.defaults.baseURL=baseURL

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
export const  node_infer=(data)=>{
    return axios({
        method:'post',
        url:"/v1/interact/node_infer",
        data:data,
        headers:{
            "Content-Type":"application/json"
        }
    })
}

export const get_history=(history_id)=>{
    return axios({
        url:'/v1/history/get',
        method:'post',
        data:history_id,
        headers:{
            "Content-Type":"application/json"
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

export const set_history=(data)=>{
    return axios({
        url:"/v1/history/set",
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        data:data
    })

}

export const character_create=(data)=>{
    return axios({
        url:"/v1/character/add",
        method:'post',
        headers:{
            "Content-Type":'application/json'
        },
        data:data
    })
}

export const character_get_all=()=>{
    return axios({
        url:"/v1/character/get",
        method:'post'
    })
}