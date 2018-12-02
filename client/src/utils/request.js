import {getToken} from './auth'

export const request = (method, path, data ) => new Promise( (resolve,reject) => {
  const headers = {
    'Content-Type': 'application/json',
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
  fetch(`http://localhost:3000${path}`, options)
    .then(response => response.json().then(json => resolve(json)))
    .catch(e => reject(e))
})