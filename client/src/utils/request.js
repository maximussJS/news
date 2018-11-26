import {getToken} from './auth'

export const request = async (method, path, data ) => {
  try {
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
    if(response.status >= 500) new Error("Internal Server Error")
    const json = await response.json()
    if(!json.success) new Error(json.message)
    console.log("from api: ", json)
    return json
  }
  catch (e) {
    new Error('Server error')
  }
}