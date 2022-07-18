import axios from 'axios';
import {variables} from "$lib/variables";
import {goto} from "$app/navigation";
import {connect} from "$lib/connect";
import {modal} from "$lib/modal";

axios.defaults.baseURL = variables.basePath;//서버 기본 도메인, 포트번호, 프로토콜 설정
export const _axios = axios.create({
    baseURL: variables.basePath,
    timeout: 10000
});

//getmapping
export async function get(url, callback){
    let promise = _axios.get(url);

    if(callback){
        promise.then(response => callback(response.data))
        .catch(()=> connect.loading.end());
    }

    return promise;
}

//예외처리
function processErr(e, callback){
    console.log("error: "+e);

    /*
    ResponseEntity  : (T body, header = null,HttpStatus status) 로  보낼 예정

     */

    if(e.response.status  === 500){
        const data = e.response.data;
        if(data && data.code && data.code === '9999' && data.message){
            modal.alert(data.message);
        }
    }

    connect.loading.end();
    callback({code:'9999'});
}


//post mapping
export async function post(url, data, callback){
    connect.loading.start();

    return _axios.post(url,data)
    .then(response =>{
        connect.loading.end();
        callback(response.data)
    })
    .catch((e)=> processErr(e,callback));
}


//put mapping
export async function put(url, data, callback){
    connect.loading.start();

    return _axios.put(url,data)
    .then(response =>{
        connect.loading.end();
        callback(response.data)
    })
    .catch((e)=> processErr(e,callback));

}

//delete mapping
export async function del(url, data, callback){
    connect.loading.start();

    return _axios.delete(url,{data})
    .then(response =>{
        connect.loading.end();
        callback(response.data)
    })
    .catch((e)=> processErr(e,callback));

}