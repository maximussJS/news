import {getToken} from './auth'

export const request = (method, path, data ) => new Promise( (resolve,reject) => {
    const headers = {
        'Content-Type': 'application/json , multipart/form-data',
        'Authorization': `${getToken()}`
    }
    const options = data ? {
        method: method,
        body: JSON.stringify(data),
        headers: headers
    } : {
        method: method,
        headers: headers
    }
    fetch(`http://127.0.0.1:5000${path}`, options)
        .then(response => response.json().then(json => resolve(json)))
        .catch(e => reject(e))
})

export const requestWithFile = (method, path, obj, file) => new Promise( (resolve,reject) => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${getToken()}`
    }
    const data = JSON.stringify(obj)
    const blob = new Blob([data], {
        type : 'application/json'
    })
    let formdata = new FormData()
    formdata.append('document',blob)
    formdata.append('file', file)
    const options =  {
        method: 'POST',
        data : JSON.stringify(formdata),
        headers: headers
    }
    fetch(`http://127.0.0.1:5000${path}`, options)
        .then(response => response.json().then(json => resolve(json)))
        .catch(e => reject(e))
})