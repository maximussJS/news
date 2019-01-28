import decode from 'jwt-decode'

export const authenticate = token => localStorage.setItem('token', token)

export const deauthenticate = () => localStorage.removeItem('token')

export const getToken = () => localStorage.getItem('token')

export const isAuthenticated = () => localStorage.getItem('token') !== null

export const getUser = () => decode(getToken()).user

export const getPassword = () => decode(getToken()).password