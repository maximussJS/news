import {getToken} from './auth'

export const request = async ( method, path, data ) => {
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
  const response = await fetch(`https://localhost:3000/${path}`, options)
  if(response.status >= 500) throw new Error("Internal Server Error")
  const json = await response.json()
  if(!json.success) throw new Error(json.message)
  return json
}