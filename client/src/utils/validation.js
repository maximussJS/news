export const required = value => value ? undefined : 'This is field must be required'

export const email = async value => {
  if(!value) return 'Email is required'
  if(value.length < 8) return 'Email length is too small'
  if(value.length > 20) return 'Email length is too big'
  if(!value.includes('@gmail.com')) return 'Invalid email'
}

export const password = async value => {
  if(!value) return 'Password is required'
  if(value.length < 8) return 'Password length is too small'
  if(value.length > 20) return 'Password length is too big'
}
