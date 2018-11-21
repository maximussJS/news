const required = value => value ? undefined : 'This is field must be required'

const simpleMemoize = fn => {
  let lastArg
  let lastResult
  return arg => {
    if (arg !== lastArg) {
      lastArg = arg
      lastResult = fn(arg)
    }
    return lastResult
  }
}

const email = simpleMemoize( async value => {
  if(!value) return 'Email is required'
  if(value.length < 8) return 'Email length is too small'
  if(value.length > 20) return 'Email length is too big'
  if(!value.includes('@gmail.com')) return 'Invalid email'
})

const password = simpleMemoize( async value => {
  if(!value) return 'Password is required'
  if(value.length < 8) return 'Password length is too small'
  if(value.length > 20) return 'Password length is too big'
})

module.exports = {
  required,
  email,
  password
}