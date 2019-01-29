import {getToken} from './auth'


export const request = (method,path,data) => new Promise((resolve,reject) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Access-Control-Allow-Origin', '*')
    headers.append('Authorization',`${getToken()}`)
    const options = data ? {
        method: method,
        body: JSON.stringify(data),
        headers: headers,
    } : {
        method: method,
        headers: headers,
    }
    fetch(`http://127.0.0.1:8080${path}`, options)
        .then(response => response.json().then(json => resolve(json)))
        .catch(e => reject(e))
})


export const requestFile = (method,path,file) => new Promise((resolve,reject) => {
    const headers = new Headers()
    headers.append('Content-Type','image/jpeg')
    headers.append('Authorization',`${getToken()}`)
    let formdata = new FormData()
    formdata.append('file', file)
    const options =  {
        method: method,
        body : formdata,
        headers: headers
    }
    fetch(`http://127.0.0.1:5000${path}`, options)
        .then(response => response.json().then(json => resolve(json)))
        .catch(e => reject(e))
})