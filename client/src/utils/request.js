import {getToken} from './auth'

export const request = async (method, path, data ) => {
  try {
    console.log("asdasd")
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
    const response = await fetch(`http://localhost:3000${path}`, options)
    console.log("resp")
    if(response.status >= 500) new Error("Internal Server Error")
    const json = await response.json()
    console.log("JSON : " ,json)
    if(!json.success) new Error(json.message)
    return json
  }
  catch (e) {
    new Error('Server error')
  }
}